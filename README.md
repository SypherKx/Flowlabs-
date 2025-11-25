# FlowLabs 🚀

**The All-In-One Operating System for Automation Agencies.**

FlowLabs is a powerful React-based platform designed to manage automation agencies. It provides a unified dashboard for lead management, client fulfillment, and workflow automation - powered by Google Gemini AI and seamlessly integrated with Airtable and Make.com.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-production-green.svg)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20TypeScript%20%7C%20Supabase%20%7C%20Stripe-indigo.svg)

## 💎 Key Features

- **AI-Powered Prospecting:** Generate personalized outreach messages using Google Gemini AI
- **Smart Lead Management:** Track, score, and manage prospects with automated enrichment
- **Client Fulfillment Portal:** Monitor automation uptime, project status, and client health
- **One-Click Campaign Triggers:** Launch Make.com workflows directly from the dashboard
- **Real-Time Analytics:** Track KPIs, conversion rates, and agency performance
- **AI Co-Pilot Assistant:** Built-in chat to help debug workflows and analyze metrics
- **Secure Multi-Tenancy:** Each user's data is isolated and protected


## 🛠️ Installation

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    npm run preview
    ```

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SypherKx/AutoFlow-Agency-.git
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    *   Rename `.env.example` to `.env`
    *   Add your Supabase and Razorpay keys

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 🚀 Configuration

FlowLabs requires API keys for full functionality. Navigate to the **Settings** tab in the app to configure:

1.  **Gemini API Key:** Get your key from [Google AI Studio](https://aistudio.google.com/)
2.  **Airtable Integration:**
    *   **Personal Access Token:** Generate in Airtable Developer Hub
    *   **Base ID:** Found in your Airtable URL (starts with `app...`)
3.  **Make.com Webhook:**
    *   Create a Webhook trigger in Make.com
    *   Paste the URL in Settings

## 📄 License

MIT License. Built for the No-Code Automation Community.