# 🚢 YellowLight Hub Deployment Guide

This guide outlines the recommended strategy for making YellowLight Hub live and production-ready.

---

## 🏛️ Recommended Architecture

To achieve maximum performance and stability, we recommend the following decoupled hosting strategy:

| Component | Platform | Why? |
| :--- | :--- | :--- |
| **Frontend** | [Vercel](https://vercel.com) | Best-in-class support for Next.js, Edge functions, and Image Optimization. |
| **Backend** | [Railway](https://railway.app) | Ideal for long-running Express.js processes. Easy PostgreSQL/Redis integration. |
| **Database** | [Supabase](https://supabase.com) | Real-time, scalable PostgreSQL with built-in Auth and Storage. |

---

## 🖥️ Frontend Deployment (Vercel)

1. **Root Directory**: Set this to `frontend`.
2. **Framework Preset**: Select `Next.js`.
3. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g., `https://api.yellowlighthub.com`).
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key.

---

## ⚙️ Backend Deployment (Railway / Render)

### Option A: Railway (Highly Recommended)
We have included a `railway.json` configuration file in the `backend` directory.
1. Connect your GitHub repository.
2. Railway will automatically detect the `backend` folder and deploy the service.
3. Ensure the **Root Directory** is set to `backend`.

### Option B: Render
1. Create a new **Web Service**.
2. Set the **Root Directory** to `backend`.
3. Build Command: `npm install`.
4. Start Command: `npm start`.

---

## 💡 Important: "Can I use Vercel for both?"

**Short Answer**: Yes, but with caveats.

While Vercel *can* host Express apps using Serverless Functions, they are subject to "cold starts" and execution limits. For a transactional e-commerce backend, a dedicated instance (Railway/Render) provides:
- **Persistent Connectivity**: No cold starts for your API.
- **Better Task Management**: Long-running processes like email dispatching or large file uploads won't time out.
- **Predictable Performance**: Consistent response times for your mobile and web users.

---

## 🔐 Final Production Checklist
1. [ ] **SSL/HTTPS**: Ensure all endpoints are served over HTTPS.
2. [ ] **CORS Settings**: Update `backend/src/index.js` to only allow requests from your production frontend domain.
3. [ ] **Environment Security**: Never commit `.env` files to GitHub.
4. [ ] **Supabase Policies**: Verify RLS (Row Level Security) is enabled on all tables.

---
*Questions? Contact the deployment lead for assistance.*
