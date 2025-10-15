# Clerk Authentication Setup Guide

## Step 1: Create a Clerk Account

1. Go to [https://dashboard.clerk.com/sign-up](https://dashboard.clerk.com/sign-up)
2. Sign up for a free Clerk account
3. Create a new application

## Step 2: Enable Authentication Methods

In your Clerk Dashboard:

1. Navigate to **User & Authentication** → **Email, Phone, Username**
2. Enable **Email** authentication
3. Navigate to **User & Authentication** → **Social Connections**
4. Enable **Google** authentication
5. Click on Google and configure:
   - You can use Clerk's development keys for testing
   - For production, add your own Google OAuth credentials

## Step 3: Get Your API Keys

1. In the Clerk Dashboard, go to **API Keys**
2. Copy your **Publishable key** (starts with `pk_`)
3. Copy your **Secret key** (starts with `sk_`)

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the project root (you can copy from `.env.local.example`)
2. Add your Clerk keys:

```bash
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Clerk Routes (these are already configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Step 5: Configure Clerk URLs

In your Clerk Dashboard:

1. Go to **Paths**
2. Set the following URLs:
   - Sign in URL: `/sign-in`
   - Sign up URL: `/sign-up`
   - After sign in URL: `/dashboard`
   - After sign up URL: `/dashboard`

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Get Started" or "Sign Up"
4. Try signing up with:
   - Email and password
   - Google account

## Features Enabled

- ✅ Email/Password authentication
- ✅ Google OAuth authentication
- ✅ Automatic user session management
- ✅ Protected routes (dashboard, institution pages)
- ✅ User profile with sign out
- ✅ Beautiful Clerk UI components

## Protected Routes

The following routes require authentication:
- `/dashboard` - Learner dashboard
- `/institution` - Institution upload page
- `/verify/[id]` - Credential verification page

Public routes:
- `/` - Landing page
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

## Customization

You can customize the Clerk appearance in the component files:
- `app/sign-in/[[...sign-in]]/page.tsx`
- `app/sign-up/[[...sign-up]]/page.tsx`
- `components/site/header.tsx`

## Support

For more information, visit:
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Guide](https://clerk.com/docs/quickstarts/nextjs)
