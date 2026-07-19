# Converso - AI Companion LMS SaaS

Converso is a next-generation Learning Management System (LMS) that integrates interactive AI companions to create personalized, engaging, and dynamic learning experiences. 

## 🚀 Features

- **AI-Powered Companions**: Engage with intelligent voice and text companions powered by Vapi AI.
- **Companion Library**: Browse, search, and filter a wide variety of AI companions tailored to specific subjects and topics.
- **Personalized Journey**: Bookmark your favorite companions and track your session history.
- **Premium Subscriptions**: Unlock advanced features and exclusive companions through our integrated Stripe billing (via Clerk).
- **Modern UI/UX**: A beautiful, fully responsive interface featuring glassmorphism, micro-animations, and a sleek dark mode.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **AI Integration**: [Vapi AI](https://vapi.ai/)
- **Observability**: [Sentry](https://sentry.io/)

## 🏃‍♂️ Getting Started

### Prerequisites
Make sure you have Node.js (v20+) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbdelrhamanWael/LMS-SaaS-App.git
   cd LMS-SaaS-App/app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add your keys for Clerk, Supabase, Sentry, and Vapi:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/AbdelrhamanWael/LMS-SaaS-App/issues).

## 📄 License
This project is licensed under the MIT License.
