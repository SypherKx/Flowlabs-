# Environment Setup Guide

This guide explains how to set up your environment variables for FlowLabs.

## Required Environment Variables

FlowLabs uses environment variables to securely store API keys and configuration. You'll need to create a `.env` file in the project root.

### Step 1: Create .env File

Copy the template file to create your environment file:

```bash
cp .env.template .env
```

Or on Windows:

```powershell
copy .env.template .env
```

### Step 2: Fill in Your API Keys

Open the `.env` file and replace the placeholder values with your actual credentials:

#### Supabase Configuration (Required)

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **Settings** → **API**
3. Copy the **Project URL** and **anon/public key**
4. Add them to your `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Gemini API Configuration (Required)

1. Get your API key from: https://makersuite.google.com/app/apikey
2. Add it to your `.env`:

```env
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

#### Optional Integrations

If you want to use Airtable or Make.com integrations, uncomment and fill these:

```env
# VITE_AIRTABLE_API_KEY=your_airtable_api_key
# VITE_AIRTABLE_BASE_ID=your_airtable_base_id
# VITE_MAKE_WEBHOOK_URL=your_make_webhook_url
```

### Step 3: Restart Development Server

After updating your `.env` file, restart the development server:

```bash
npm run dev
```

## Security Notes

- ✅ The `.env` file is git-ignored and will NOT be committed to version control
- ✅ Never share your `.env` file or commit it to Git
- ✅ Each developer needs their own `.env` file
- ✅ For production deployment, set environment variables in your hosting platform (Vercel, etc.)

## Troubleshooting

### "Gemini API Key not configured" error

Make sure:
1. You've created a `.env` file (not `.env.txt`)
2. The variable is named exactly `V ITE_GEMINI_API_KEY`
3. You've restarted the dev server after creating the file

### Environment variables are undefined

Vite only exposes environment variables with the `VITE_` prefix to the browser. Make sure all your variables start with `VITE_`.
