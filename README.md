# AutoFlow Agency OS 🚀

**The Ultimate Operating System for Modern Automation Agencies.**

AutoFlow Agency OS is a comprehensive, AI-powered platform designed to help automation agencies scale faster. It replaces scattered spreadsheets and disconnected tools with a single, unified command center for managing leads, clients, projects, and payments.

![Status](https://img.shields.io/badge/status-production-green.svg)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20Supabase%20%7C%20Razorpay%20%7C%20Gemini%20AI-indigo.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 💡 Why AutoFlow?

Running an agency is hard. You have leads in emails, client data in spreadsheets, and payments all over the place. **AutoFlow solves this chaos.**

It acts as the "Brain" of your agency, allowing you to:
*   **Close More Deals:** Use AI to generate personalized outreach messages that convert.
*   **Get Paid Faster:** Integrated Razorpay payments for seamless client billing.
*   **Automate Everything:** Trigger Make.com workflows directly from your dashboard.
*   **Scale With Confidence:** A robust CRM that grows with your client base.

---

## 💎 Key Features

### 🤖 AI-Powered Prospecting (Google Gemini)
Stop wasting time writing cold emails. Our built-in AI assistant analyzes your prospects and generates hyper-personalized outreach messages in seconds, tailored to their specific industry and needs.

### 💰 Seamless Payments (Razorpay)
Integrated directly with **Razorpay**, allowing you to send invoices and collect payments from clients without leaving the platform. Track revenue, manage subscriptions, and handle billing effortlessly.

### 📊 Smart CRM & Lead Management
A visual Kanban-style pipeline to track every lead from "New" to "Closed Won".
*   **Automatic Enrichment:** Get detailed insights about your leads.
*   **Status Tracking:** Never let a potential client fall through the cracks.

### ⚡ Automation Hub (Make.com Integration)
Launch complex automation workflows with a single click. Connect your agency's tools (Slack, Airtable, Gmail, etc.) and monitor their performance directly from the AutoFlow dashboard.

### 📈 Real-Time Analytics
Visualize your agency's health with a beautiful dashboard. Track:
*   Total Pipeline Value
*   Conversion Rates
*   Monthly Recurring Revenue (MRR)
*   Client Retention

---

## 🛠️ Tech Stack

*   **Frontend:** React, TypeScript, Vite, Tailwind CSS
*   **Backend/Database:** Supabase (PostgreSQL, Auth, Realtime)
*   **AI Engine:** Google Gemini Pro
*   **Payments:** Razorpay
*   **Automation:** Make.com (Webhooks)

---

## 🚀 Getting Started

Follow these steps to set up your own instance of AutoFlow Agency OS.

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/SypherKx/AutoFlow-Agency-.git
    cd AutoFlow-Agency-
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    *   Rename `.env.example` to `.env`.
    *   Add your API keys (Supabase, Razorpay, Gemini).

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

---

## ⚙️ Configuration Guide

To unlock the full power of AutoFlow, configure the following in the **Settings** tab:

1.  **Google Gemini API:** Required for AI prospecting features. Get it from [Google AI Studio](https://aistudio.google.com/).
2.  **Razorpay Key ID:** Required for processing payments. Get it from your [Razorpay Dashboard](https://dashboard.razorpay.com/).
3.  **Make.com Webhook URL:** Required for triggering external automations.

---

## 📄 License

MIT License. Built with ❤️ for the Automation Community.