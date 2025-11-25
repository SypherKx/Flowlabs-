import { supabase } from './supabaseService';
import toast from 'react-hot-toast';

export interface PricingTier {
    id: string;
    name: string;
    price: number;
    interval: 'month' | 'year';
    features: string[];
    recommended?: boolean;
}

export const pricingTiers: PricingTier[] = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        interval: 'month',
        features: [
            '10 leads per month',
            'Basic AI prospecting',
            '1 client',
            'Community support',
            'Basic analytics'
        ]
    },
    {
        id: 'starter',
        name: 'Starter',
        price: 29,
        interval: 'month',
        features: [
            '100 leads per month',
            'AI prospecting with Gemini',
            '5 clients',
            'Email support',
            'Advanced analytics',
            'Airtable integration',
            'Make.com webhooks'
        ],
        recommended: true
    },
    {
        id: 'professional',
        name: 'Professional',
        price: 79,
        interval: 'month',
        features: [
            '1,000 leads per month',
            'Priority AI processing',
            'Unlimited clients',
            'Priority support',
            'Custom integrations',
            'Advanced automation',
            'API access',
            'Team collaboration'
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 199,
        interval: 'month',
        features: [
            'Unlimited leads',
            'Dedicated AI resources',
            'Unlimited everything',
            '24/7 phone support',
            'White-label option',
            'Custom development',
            'SLA guarantee',
            'Dedicated account manager'
        ]
    }
];

// Razorpay payment options
interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id?: string;
    handler: (response: any) => void;
    prefill: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: any;
    theme: {
        color: string;
    };
    modal?: {
        ondismiss?: () => void;
    };
}

// Declare Razorpay type for TypeScript
declare global {
    interface Window {
        Razorpay: any;
    }
}

/**
 * Initialize Razorpay payment
 * @param planName - Name of the subscription plan
 * @param amount - Amount in rupees (will be converted to paise)
 * @param userEmail - User's email address
 * @param userId - User's ID for updating subscription
 */
export const initializePayment = async (
    planName: string,
    amount: number,
    userEmail: string,
    userId: string
) => {
    try {
        // Check if Razorpay is loaded
        if (!window.Razorpay) {
            throw new Error('Razorpay SDK not loaded. Please refresh the page.');
        }

        const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

        if (!razorpayKeyId) {
            throw new Error('Razorpay key not configured');
        }

        // Convert rupees to paise (Razorpay requires amount in smallest currency unit)
        const amountInPaise = amount * 100;

        const options: RazorpayOptions = {
            key: razorpayKeyId,
            amount: amountInPaise,
            currency: 'USD',
            name: 'FlowLabs',
            description: `${planName} Plan Subscription`,
            image: '/logo.png', // Add your logo here
            handler: async function (response: any) {
                // Payment successful
                console.log('Payment successful:', response);

                try {
                    // Update user's subscription tier in Supabase
                    const tierMap: { [key: string]: string } = {
                        'Starter': 'starter',
                        'Professional': 'professional',
                        'Enterprise': 'enterprise'
                    };

                    const subscriptionTier = tierMap[planName] || 'free';

                    // Update user_settings table with new subscription
                    const { error } = await supabase
                        .from('user_settings')
                        .upsert({
                            user_id: userId,
                            subscription_tier: subscriptionTier,
                            stripe_customer_id: response.razorpay_payment_id, // Store payment ID
                            stripe_subscription_id: response.razorpay_order_id || null,
                            updated_at: new Date().toISOString()
                        });

                    if (error) {
                        console.error('Error updating subscription:', error);
                        toast.error('Payment successful but failed to update subscription. Please contact support.');
                    } else {
                        toast.success(`Successfully upgraded to ${planName} plan! 🎉`);

                        // Reload page to reflect new subscription
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    }
                } catch (error) {
                    console.error('Error processing payment:', error);
                    toast.error('Payment successful but failed to update subscription. Please contact support.');
                }
            },
            prefill: {
                email: userEmail,
            },
            notes: {
                plan: planName,
                user_id: userId
            },
            theme: {
                color: '#6366f1' // Indigo color to match FlowLabs theme
            },
            modal: {
                ondismiss: function () {
                    toast.error('Payment cancelled');
                }
            }
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();

    } catch (error: any) {
        console.error('Payment initialization error:', error);
        toast.error(error.message || 'Failed to initialize payment');
        throw error;
    }
};

/**
 * Get user's current subscription tier
 * @param userId - User's ID
 * @returns Current subscription tier
 */
export const getCurrentSubscription = async (userId: string): Promise<string> => {
    try {
        const { data, error } = await supabase
            .from('user_settings')
            .select('subscription_tier')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('Error fetching subscription:', error);
            return 'free';
        }

        return data?.subscription_tier || 'free';
    } catch (error) {
        console.error('Error getting subscription:', error);
        return 'free';
    }
};

/*
BACKEND IMPLEMENTATION NOTES:

For production, you should:

1. Create a backend endpoint to generate Razorpay orders:
   POST /api/razorpay/create-order
   - Validates user authentication
   - Creates order using Razorpay Orders API
   - Returns order_id to frontend

2. Set up webhook endpoint:
   POST /api/razorpay/webhook
   - Verifies webhook signature
   - Handles payment.captured event
   - Updates user subscription in database
   - Sends confirmation email

3. Payment verification:
   - After payment, verify the payment signature on backend
   - Use razorpay.payments.fetch() to verify payment status
   - Only then update subscription

Example backend code (Node.js/Express):

const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
app.post('/api/razorpay/create-order', async (req, res) => {
  const { amount, currency } = req.body;
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: currency || 'USD',
    receipt: `receipt_${Date.now()}`
  });
  res.json({ order_id: order.id });
});

// Webhook
app.post('/api/razorpay/webhook', (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  
  // Verify signature
  const isValid = razorpay.webhooks.validateSignature(
    JSON.stringify(req.body),
    signature,
    secret
  );
  
  if (isValid) {
    // Process payment
    const event = req.body.event;
    if (event === 'payment.captured') {
      // Update subscription
    }
  }
  
  res.json({ status: 'ok' });
});
*/
