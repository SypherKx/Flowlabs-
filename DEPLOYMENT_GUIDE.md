# FlowLabs Deployment Guide

## Deploying to Vercel (Recommended)

Vercel offers the best deployment experience for React apps with automatic HTTPS, CDN, and CI/CD.

### Step 1: Prerequisites

1. Create a free account at [vercel.com](https://vercel.com)
2. Install Vercel CLI (optional but recommended):
   ```bash
   npm install -g vercel
   ```

---

### Step 2: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - FlowLabs v1.0"
   git branch -M main
   ```

2. **Create GitHub repository:**
   - Go to [github.com/new](https://github.com/new)
   - Name it `flowlabs`
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/flowlabs.git
   git push -u origin main
   ```

4. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your `flowlabs` repository
   - Configure project:
     - **Framework Preset:** Vite
     - **Root Directory:** `./`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

5. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbG...your-key
   VITE_STRIPE_PUBLISHABLE_KEY = pk_live_...your-stripe-key
   ```

6. **Deploy:**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your app will be live at `https://flowlabs-xxx.vercel.app`

---

### Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project → **Settings** → **Domains**
2. Add your custom domain (e.g., `app.flowlabs.com`)
3. Update DNS records as instructed by Vercel
4. SSL certificate is automatic!

---

### Step 4: Set Up Automatic Deployments

Already done! Every push to `main` branch automatically deploys.

**Preview Deployments:**
- Every pull request gets its own preview URL
- Perfect for testing before merging

---

## Alternative: Deploy via Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your personal account
# - Link to existing project? No
# - Project name? flowlabs
# - Directory? ./
# - Override settings? No
```

---

## Alternative: Deploy to Netlify

If you prefer Netlify over Vercel:

1. **Create netlify.toml:**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy:**
   - Push to GitHub
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Add environment variables
   - Click "Deploy"

---

## Post-Deployment Checklist

### Security
- [ ] Environment variables are set correctly
- [ ] `.env.local` is NOT in your GitHub repository
- [ ] Supabase RLS policies are enabled
- [ ] Email confirmation is enabled in Supabase Auth

### Functionality
- [ ] Test signup flow in production
- [ ] Test login flow
- [ ] Test password reset
- [ ] Verify data is saving to Supabase
- [ ] Test dark/light mode toggle
- [ ] Check all API integrations (Airtable, Make.com, Gemini)

### Performance
- [ ] Run Lighthouse audit (should score 90+)
- [ ] Test on mobile devices
- [ ] Check page load times (<3 seconds)

### SEO & Social
- [ ] Update OG meta tags in `index.html`
- [ ] Add favicon (currently missing!)
- [ ] Test social media previews

---

## Monitoring & Analytics

### Add Error Tracking (Recommended)

1. Create account at [sen try.io](https://sentry.io)
2. Install Sentry:
   ```bash
   npm install --save @sentry/react
   ```
3. Initialize in `index.tsx`:
   ```typescript
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "YOUR_SENTRY_DSN",
     environment: import.meta.env.MODE,
   });
   ```

### Add Analytics (Optional)

**Option 1: PostHog (Recommended)**
```bash
npm install posthog-js
```

**Option 2: Google Analytics**
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## Updating Your Deployment

### Automatic (Recommended)
Just push to GitHub:
```bash
git add .
git commit -m "Add new feature"
git push
```
Vercel automatically redeploys!

### Manual
```bash
vercel --prod
```

---

## Rollback to Previous Version

1. Go to Vercel dashboard → **Deployments**
2. Find the previous working deployment
3. Click "..." → **Promote to Production**

---

## Troubleshooting

### Build fails with "Module not found"
- Make sure all dependencies are in `package.json`
- Delete `node_modules` and `package-lock.json`, then `npm install`

### Environment variables not working
- Make sure they start with `VITE_`
- Redeploy after adding new variables
- Check they're set in Vercel dashboard

### App loads but shows blank page
- Check browser console for errors
- Verify Supabase URL is correct
- Check if API keys are valid

### Images/assets not loading
- Make sure paths are relative
- Check if files are in the `public` folder

---

## Production Environment Variables

Make sure these are set in Vercel:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_GEMINI_API_KEY=AI... (optional, can be set in UI)
```

**Never use `pk_test_` Stripe keys in production!**

---

## Cost Breakdown

### Free Tier Limits:
- **Vercel:** Unlimited personal projects, 100GB bandwidth
- **Supabase:** 500MB database, 2GB file storage, 50,000 monthly active users
- **Stripe:** No monthly fee, just 2.9% + $0.30 per transaction

### When to Upgrade:
- **Vercel:** Need more than 100GB bandwidth/month
- **Supabase:** Database > 500MB or need daily backups
- **Stripe:** Want lower fees (contact Stripe for custom pricing)

---

## Next Steps

✅ **Your app is live! Now:**

1. **Share it:** Give the URL to beta testers
2. **Monitor:** Watch error logs and user feedback
3. **Iterate:** Add features based on user needs
4. **Market:** Post on Product Hunt, Twitter, LinkedIn
5. **Earn:** Start charging customers via Stripe!

---

## Support

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **FlowLabs Issues:** Check `SETUP_GUIDE.md` for troubleshooting steps
