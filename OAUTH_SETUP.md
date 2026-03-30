# Google & GitHub OAuth Setup Guide

This guide explains how to set up Google and GitHub OAuth for your Resume AI Analyzer application.

## Overview

The application now supports OAuth login with:
- **Google**: Sign in with your Google account
- **GitHub**: Sign in with your GitHub account

## Prerequisites

- The backend and frontend servers running locally
- Google Console and GitHub Developer account access

---

## 1. Google OAuth Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter project name: `Resume AI Analyzer`
5. Click "CREATE"

### Step 2: Enable OAuth 2.0 API

1. In the Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click on it and select **ENABLE**
4. Also search for and enable "Google OAuth2 API"

### Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
3. If prompted, configure the OAuth consent screen first:
   - Select **External** as User Type
   - Fill in the app name: `Resume AI Analyzer`
   - Add your email as support email
   - Click SAVE
4. Choose **Web application** as the application type
5. Under "Authorized redirect URIs", add:
   ```
   http://localhost:5000/api/auth/google/callback
   ```
6. Click **CREATE**
7. Copy the **Client ID** and **Client Secret**

### Step 4: Add Credentials to .env

In your backend `.env` file, add:
```env
GOOGLE_CLIENT_ID=your_copied_client_id
GOOGLE_CLIENT_SECRET=your_copied_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

---

## 2. GitHub OAuth Setup

### Step 1: Register a New OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** > **New OAuth App**
3. Fill in the form:
   - **Application name**: `Resume AI Analyzer`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:5000/api/auth/github/callback`
4. Click **Register application**

### Step 2: Get Your Credentials

1. You'll see your **Client ID** on the app page
2. Click **Generate a new client secret**
3. Copy both the **Client ID** and **Client Secret**

### Step 3: Add Credentials to .env

In your backend `.env` file, add:
```env
GITHUB_CLIENT_ID=your_copied_client_id
GITHUB_CLIENT_SECRET=your_copied_client_secret
GITHUB_REDIRECT_URI=http://localhost:5000/api/auth/github/callback
```

---

## 3. Environment Variables Summary

Your `.env` file should include:

```env
# Database and JWT
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
FRONTEND_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=xxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_CLIENT_SECRET=gho_xxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_REDIRECT_URI=http://localhost:5000/api/auth/github/callback
```

---

## 4. Testing OAuth Login

1. **Restart your backend server** after adding environment variables:
   ```bash
   npm start
   ```

2. Go to `http://localhost:3000/login`

3. You should now see:
   - Google button with Google icon
   - GitHub button with GitHub icon

4. Click either button to:
   - Redirect to Google/GitHub login
   - Authenticate with your account
   - Get redirected back to your app
   - Automatically logged in and profile created

---

## 5. How It Works

### User Flow:

1. User clicks "Google" or "GitHub" button on login page
2. User is redirected to OAuth provider's login screen
3. User authorizes the app to access their profile
4. OAuth provider redirects back to `/api/auth/google/callback` or `/api/auth/github/callback`
5. Backend:
   - Exchanges OAuth code for access token
   - Fetches user info (name, email)
   - Creates user in database if new
   - Generates JWT token
   - Redirects to frontend with token in URL
6. Frontend:
   - Extracts token from URL
   - Saves to localStorage
   - Redirects to profile page
   - User is authenticated

---

## 6. Security Notes

- ✅ Passwords are optional for OAuth users
- ✅ Tokens expire in 7 days
- ✅ Email addresses are used as unique identifiers
- ✅ OAuth users can still set a password if they want traditional login
- ⚠️ **Never commit your `.env` file with real credentials**
- ⚠️ Keep your client secrets private

---

## 7. Troubleshooting

### "OAuth not configured" Error

**Cause**: Missing environment variables
**Fix**: Ensure `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` are set in `.env`

### Redirect URI Mismatch

**Cause**: The redirect URI in OAuth app settings doesn't match the backend
**Fix**: Make sure both have exactly: `http://localhost:5000/api/auth/google/callback` (or github)

### "No access token" Error

**Cause**: OAuth provider rejected the authentication
**Fix**: 
- Check your credentials are correct
- Verify the redirect URI in OAuth settings
- Try again with a different browser or incognito mode

### User not created or logged in

**Cause**: MongoDB connection issue or database error
**Fix**: 
- Verify MongoDB is running
- Check `MONGODB_URI` is correct in `.env`
- Check backend logs for database errors

---

## 8. Production Deployment

When deploying to production:

1. Update redirect URIs to your production domain:
   ```
   https://yourdomain.com/api/auth/google/callback
   https://yourdomain.com/api/auth/github/callback
   ```

2. Update `.env` variables:
   ```env
   FRONTEND_URL=https://yourdomain.com
   GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback
   GITHUB_REDIRECT_URI=https://yourdomain.com/api/auth/github/callback
   ```

3. Keep credentials secure in your deployment platform's secrets manager

---

## Support

For OAuth issues:
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
