# NexShop | AI-Powered E-commerce (Frontend)

NexShop is a modern, enterprise-grade AI-powered Full Stack E-commerce platform. It features an advanced suite of AI tools including an AI Shopping Assistant and an AI Product Description Generator. This repository contains the Next.js frontend application.

## 🚀 Project Link

### Live URL Frontend: https://nexshop-frontend-three.vercel.app

### GitHub Repository Frontend: https://github.com/sajib-rahman90/nexshop-frontend

### GitHub Repository Backend: https://github.com/sajib-rahman90/nexshop-backend

## 🚀 Project Overview

NexShop provides a seamless shopping experience mimicking a real-world SaaS/E-commerce product. It boasts a dynamic design system with a premium dark mode, responsive layouts, and fluid Framer Motion animations. Everything from the product catalog, filtering, cart management, wishlist, to AI integration is fully functional and connected to the backend API.

## 💻 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS v4, HeroUI
- **Animations:** Framer Motion, Lenis Smooth Scroll
- **State Management:** Zustand (Auth & Cart), Context API
- **Data Fetching:** TanStack Query, Axios
- **Forms:** React Hook Form
- **Icons:** Lucide React, React Icons
- **Notifications:** React Hot Toast
- **Authentication:** Firebase Auth (Email/Password & Google)

## 🤖 AI Features

NexShop integrates Google's Gemini AI to provide cutting-edge features:

1. **AI Shopping Assistant (Nex AI):** A context-aware chatbot that helps users discover products, answers shopping queries, and maintains memory of previous messages during the session. It provides tailored product recommendations from the store's inventory.
2. **AI Product Description Generator (Admin):** Integrated into the admin dashboard, this tool automatically generates SEO-optimized, highly engaging product descriptions based on simple product names and keywords.

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### 1. Installation

Clone the repository and navigate to the frontend directory:

```bash
cd frontend
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root of the `frontend` directory with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Running Locally

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

_Note: Ensure your Express backend is also running concurrently (usually on port 5000) for API requests to succeed._

## 🔑 Demo Credentials

To test the role-based dashboard and features without signing up, you can use the following credentials:

**Admin Account:**

- **Email:** `admin@nexshop.ai`
- **Password:** `Admin@123456`

**User Account (or simply sign up):**

- **Email:** `demo@nexshop.ai`
- **Password:** `Demo@123456`

_(Note: If the demo user does not exist, you can easily register a new user via the Firebase auth flow on the Register page)._

## 📁 Project Structure

```
src/
├── app/            # Next.js App Router pages and layouts
├── components/     # Reusable UI components (layout, ui, home, products)
├── hooks/          # Custom React hooks
├── lib/            # Utilities (axios setup, firebase config)
├── store/          # Zustand state stores (auth, cart)
├── providers.jsx   # Global providers (React Query, Theme, Firebase)
```
