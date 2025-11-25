# FlowLabs Setup Guide

## 🚀 Quick Start

Follow these steps to get FlowLabs up and running with a complete backend.

---

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **"New Project"**
3. Fill in:
   - **Name:** FlowLabs
   - **Database Password:** (save this - you'll need it later)
   - **Region:** Choose closest to your users
4. Click **"Create new project"** (takes ~2 minutes)

---

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Copy the entire contents of `supabase-schema.sql` from your project folder
4. Paste it into the SQL editor
5. Click **"Run"** (bottom right)
6. You should see "Success. No rows returned" - this means it worked!

---

## Step 3: Get Your API Keys

1. In Supabase dashboard, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** under Project Settings
3. You'll see two important values:

### Project URL
- Example: `https://abcdefghijk.supabase.co`
- Copy this

### anon/public key
- Starts with `eyJ...`
- Copy this (it's long!)

---

## Step 4: Configure FlowLabs

### Option A: Use Environment Variables (Recommended for Production)

1. In your project folder, copy `.env.example` to `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Open `.env.local` and fill in your values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Important:** Never commit `.env.local` to Git (it's already in `.gitignore`)

### Option B: Hardcode for Testing (Not recommended for production)

1. Open `services/supabaseService.ts`
2. Replace these lines:
   ```typescript
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
   ```
   
   With your actual values:
   ```typescript
   const supabaseUrl = 'https://your-project-id.supabase.co';
   const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```

---

## Step 5: Test Your Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`

3. You should see the FlowLabs login page

4. Click **"Sign up"** and create a test account

5. Check your email for verification (Supabase sends this automatically)

6. Log in with your credentials

7. **Success!** You should now see the FlowLabs dashboard

---

## Step 6: Optional - Set Up Email Templates

By default, Supabase sends plain emails. To customize them:

1. In Supabase dashboard, go to **"Authentication"** → **"Email Templates"**
2. Customize the **"Confirm signup"** and **"Reset password"** templates
3. Add your  branding, logo, and custom messaging

---

## Step 7: Optional - Configure Stripe (for payments)

1. Create an account at [stripe.com](https://stripe.com)
2. Get your **Publishable Key** from the Stripe dashboard
3. Add it to `.env.local`:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

---

## Troubleshooting

### "Invalid API key" error
- Make sure you copied the **anon/public** key, not the service_role key
- Check for extra spaces or missing characters

### "Failed to fetch" error
- Verify your Project URL is correct
- Make sure you're using `https://` not `http://`

### Emails not sending
- Check your spam folder
- For production, configure a custom SMTP in Supabase settings

### Database errors
- Make sure you ran the entire `supabase-schema.sql` script
- Check the SQL Editor for error messages

---

## Next Steps

✅ **Authentication is working! Now you can:**

1. **Connect Airtable** - Go to Settings → Enter Airtable credentials
2. **Connect Make.com** - Add webhook URL in Settings
3. **Get Gemini API Key** - From [Google AI Studio](https://aistudio.google.com/)
4. **Start using FlowLabs!**

---

## Security Best Practices

⚠️ **Important:**
- Never commit `.env.local` to version control
- Use environment variables for production deployment
- Keep your `service_role` key secret (never expose it in frontend code)
- Enable Email confirmation in Supabase Auth settings for production

---

## Need Help?

- Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Review the `supabase-schema.sql` file to understand the database structure
- Ensure Row-Level Security (RLS) is enabled (it's automatic with our schema)
