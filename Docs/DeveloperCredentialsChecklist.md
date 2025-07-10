# JIGA Store Developer Credentials Checklist

## Overview

This document lists all API keys, service accounts, and credentials needed to implement the JIGA Store system. Each section explains what the service is for, why it's needed, and how to obtain the credentials.

## 🔥 Firebase / Google Cloud Platform

### 1. Firebase Project & Service Account

**What For:** Core database (Firestore), authentication, cloud functions, hosting
**Why Needed:** Primary backend infrastructure for the entire platform

**How to Get:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or select existing GCP project
3. Enable Firestore Database (Native mode)
4. Enable Authentication
5. Go to Project Settings → Service Accounts
6. Click "Generate new private key"
7. Save the JSON file securely

**Required Services to Enable:**
- Firestore Database
- Firebase Authentication
- Cloud Functions
- Cloud Storage
- Firebase Hosting (optional)

```bash
# Environment variables needed:
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxx@project.iam.gserviceaccount.com"
```

### 2. Google Cloud Storage Bucket

**What For:** Storing agent avatars, user uploads
**Why Needed:** Variants allow custom avatar uploads

**How to Get:**
1. In Firebase Console → Storage → Get Started
2. Choose storage location (same as Firestore region)
3. Set up security rules
4. Note your bucket name: `gs://your-project.appspot.com`

```javascript
// Storage rules for avatars
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId
        && request.resource.size < 2 * 1024 * 1024  // 2MB limit
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```

## 🛍️ Shopify Integration

### 3. Shopify Partner Account & App Credentials

**What For:** DOF package sales, payment processing, order management
**Why Needed:** Handles all e-commerce transactions for DOF purchases

**How to Get:**
1. Create [Shopify Partner Account](https://partners.shopify.com/signup)
2. Create a development store for testing
3. Create a Custom App:
   - Partner Dashboard → Apps → Create App
   - Choose "Custom App" type
4. Configure API scopes needed:
   - `read_products, write_products` (DOF packages)
   - `read_orders, write_orders` (order processing)
   - `read_customers` (user linking)
   - `read_inventory, write_inventory` (DOF tracking)

```bash
# Environment variables:
SHOPIFY_SHOP_DOMAIN="your-store.myshopify.com"
SHOPIFY_ADMIN_API_TOKEN="shpat_xxxxxxxxxx"
SHOPIFY_STOREFRONT_API_TOKEN="xxxxxxxxxx"
SHOPIFY_WEBHOOK_SECRET="xxxxxxxxxx"
```

**Webhook Setup:**
```javascript
// Required webhooks to register:
- orders/create -> Process DOF purchase
- orders/paid -> Credit user account
- orders/cancelled -> Handle refunds
- app/uninstalled -> Cleanup
```

## 🤖 AI Provider Credentials

### 4. OpenAI API Key

**What For:** OpenAI-based agents (Blaze, Echo, Fable, Onyx, Hype, Shimmer)
**Why Needed:** Powers AI conversations and TTS for OpenAI provider agents

**How to Get:**
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or login
3. Navigate to API Keys section
4. Create new secret key
5. Set up billing and usage limits

```bash
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
OPENAI_ORG_ID="org-xxxxxxxxxxxxxxxx"  # Optional
```

### 5. Google AI / Gemini API Key

**What For:** Gemini-based agents (Scout, Nova, Ace, Zeus)
**Why Needed:** Powers AI conversations for Gemini provider agents

**How to Get:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API key"
3. Create new API key or use existing
4. Enable necessary APIs in Google Cloud Console:
   - Generative Language API
   - Vertex AI API (if using Vertex)

```bash
GOOGLE_AI_API_KEY="AIzaSyxxxxxxxxxxxxxxxxxx"
# OR for Vertex AI:
VERTEX_AI_PROJECT_ID="your-gcp-project"
VERTEX_AI_LOCATION="us-central1"
```

### 6. Google Cloud Text-to-Speech

**What For:** Voice synthesis for Google/Gemini agents
**Why Needed:** Provides voice output for agents with voice chat/commentary

**How to Get:**
1. Enable Text-to-Speech API in [Google Cloud Console](https://console.cloud.google.com)
2. Create service account with Text-to-Speech permissions
3. Download JSON key file

```bash
GOOGLE_TTS_CREDENTIALS_PATH="./credentials/tts-service-account.json"
# Or use Application Default Credentials if running on GCP
```

## 🔍 Search & Discovery

### 7. Algolia Search API

**What For:** Marketplace search, agent discovery, filtering
**Why Needed:** Fast, relevant search results for marketplace listings

**How to Get:**
1. Sign up at [Algolia](https://www.algolia.com)
2. Create new application
3. Create indices: `agents`, `variants`, `marketplace_listings`
4. Get API keys from Dashboard → API Keys

```bash
ALGOLIA_APP_ID="XXXXXXXXXX"
ALGOLIA_ADMIN_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxx"  # Server-side only
ALGOLIA_SEARCH_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxx"  # Client-side safe
ALGOLIA_INDEX_PREFIX="prod_"  # or "dev_"
```

**Index Configuration:**
```javascript
// Agent search index settings
{
  searchableAttributes: ['name', 'description', 'tags'],
  attributesForFaceting: ['rank', 'type', 'provider', 'hasVoiceChat'],
  customRanking: ['desc(popularity)', 'desc(rating)']
}
```

## 💳 Payment Processing

### 8. Stripe API Keys (Alternative to Shopify Payments)

**What For:** Direct payment processing, subscription management
**Why Needed:** Handle payments if not using Shopify exclusively

**How to Get:**
1. Sign up at [Stripe](https://stripe.com)
2. Complete business verification
3. Get keys from Dashboard → Developers → API keys

```bash
STRIPE_PUBLISHABLE_KEY="pk_live_xxxxxxxxxx"
STRIPE_SECRET_KEY="sk_live_xxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxx"
```

## 📦 Caching & Performance

### 9. Redis/Upstash Credentials

**What For:** Session management, real-time data caching, rate limiting
**Why Needed:** Improve performance and reduce database calls

**How to Get:**
1. Option A: [Upstash](https://upstash.com) (Serverless Redis)
   - Create new Redis database
   - Copy endpoint and password
2. Option B: Redis Cloud or self-hosted

```bash
REDIS_URL="redis://default:password@endpoint:port"
# Or for Upstash:
UPSTASH_REDIS_REST_URL="https://xxxxxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="xxxxxxxxxx"
```

## 📨 Communication Services

### 10. SendGrid/Email Service

**What For:** Transactional emails, notifications, receipts
**Why Needed:** User communications and order confirmations

**How to Get:**
1. Sign up at [SendGrid](https://sendgrid.com)
2. Verify sender domain/email
3. Create API key with mail send permissions

```bash
SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxx"
SENDGRID_FROM_EMAIL="noreply@jiga.store"
SENDGRID_FROM_NAME="JIGA Store"
```

### 11. Twilio (Optional - for SMS)

**What For:** SMS notifications, two-factor authentication
**Why Needed:** Enhanced security and urgent notifications

**How to Get:**
1. Sign up at [Twilio](https://www.twilio.com)
2. Get phone number
3. Note Account SID and Auth Token

```bash
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="xxxxxxxxxxxxxxxxxx"
TWILIO_PHONE_NUMBER="+1234567890"
```

## 🛡️ Security & Moderation

### 12. Google Cloud Vision API (Image Moderation)

**What For:** Moderating user-uploaded avatars
**Why Needed:** Prevent inappropriate content in variant avatars

**How to Get:**
1. Enable Cloud Vision API in Google Cloud Console
2. Use existing Firebase service account or create new one
3. Add Cloud Vision API permissions

```javascript
// Moderation check example
const vision = new ImageAnnotatorClient();
const [result] = await vision.safeSearchDetection(imageUri);
const detections = result.safeSearchAnnotation;
```

### 13. Perspective API (Text Moderation)

**What For:** Moderating agent names, descriptions
**Why Needed:** Ensure appropriate content in marketplace

**How to Get:**
1. Request access at [Perspective API](https://perspectiveapi.com)
2. Create Google Cloud project
3. Enable Perspective API
4. Create API key

```bash
PERSPECTIVE_API_KEY="AIzaSyxxxxxxxxxxxxxxxxxx"
```

## 📊 Analytics & Monitoring

### 14. Google Analytics 4

**What For:** User behavior tracking, conversion analysis
**Why Needed:** Understand user patterns and optimize

**How to Get:**
1. Create property in [Google Analytics](https://analytics.google.com)
2. Set up data streams (Web + API)
3. Get Measurement ID

```bash
GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

### 15. Sentry (Error Tracking)

**What For:** Error monitoring, performance tracking
**Why Needed:** Catch and fix issues quickly

**How to Get:**
1. Sign up at [Sentry](https://sentry.io)
2. Create new project
3. Get DSN from project settings

```bash
SENTRY_DSN="https://xxxxx@xxxxx.ingest.sentry.io/xxxxx"
SENTRY_ENVIRONMENT="production"
```

## 🌐 Infrastructure

### 16. Cloudflare (CDN & Protection)

**What For:** CDN, DDoS protection, edge functions
**Why Needed:** Performance and security

**How to Get:**
1. Add site to [Cloudflare](https://cloudflare.com)
2. Update nameservers
3. Get API token: My Profile → API Tokens → Create Token

```bash
CLOUDFLARE_API_TOKEN="xxxxxxxxxxxxxxxxxx"
CLOUDFLARE_ZONE_ID="xxxxxxxxxxxxxxxxxx"
```

### 17. Google Cloud Pub/Sub

**What For:** Event-driven architecture, service communication
**Why Needed:** Asynchronous processing of marketplace events

**How to Get:**
1. Enable Pub/Sub API in Google Cloud Console
2. Create topics: `agent-hired`, `variant-created`, `dof-purchased`
3. Use Firebase service account or create specific one

```javascript
// Topics to create:
- agent-hired -> Process hire transaction
- variant-created -> Update search index
- dof-purchased -> Credit user account
- marketplace-published -> Moderate listing
```

## 🔧 Development Tools

### 18. GitHub OAuth (Optional)

**What For:** Developer login, CI/CD integration
**Why Needed:** Streamline developer access

**How to Get:**
1. GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set callback URL: `https://api.jiga.store/auth/github/callback`

```bash
GITHUB_CLIENT_ID="xxxxxxxxxxxxxxxxxx"
GITHUB_CLIENT_SECRET="xxxxxxxxxxxxxxxxxx"
```

## 📋 Complete Environment File Template

```bash
# Firebase/GCP
FIREBASE_PROJECT_ID=""
FIREBASE_PRIVATE_KEY=""
FIREBASE_CLIENT_EMAIL=""
GOOGLE_CLOUD_PROJECT=""
STORAGE_BUCKET=""

# Shopify
SHOPIFY_SHOP_DOMAIN=""
SHOPIFY_ADMIN_API_TOKEN=""
SHOPIFY_STOREFRONT_API_TOKEN=""
SHOPIFY_WEBHOOK_SECRET=""

# AI Providers
OPENAI_API_KEY=""
GOOGLE_AI_API_KEY=""
GOOGLE_TTS_CREDENTIALS_PATH=""

# Search
ALGOLIA_APP_ID=""
ALGOLIA_ADMIN_API_KEY=""
ALGOLIA_SEARCH_API_KEY=""

# Caching
REDIS_URL=""

# Email
SENDGRID_API_KEY=""
SENDGRID_FROM_EMAIL=""

# Moderation
PERSPECTIVE_API_KEY=""

# Analytics
GA_MEASUREMENT_ID=""
SENTRY_DSN=""

# CDN
CLOUDFLARE_API_TOKEN=""
CLOUDFLARE_ZONE_ID=""

# Environment
NODE_ENV="production"
API_URL="https://api.jiga.store"
APP_URL="https://app.jiga.store"
```

## 🚀 Setup Order

1. **Firebase/GCP** - Set up project and enable services
2. **Shopify** - Create store and products for DOF packages
3. **AI Providers** - Get API keys for agent providers
4. **Database** - Initialize Firestore with schemas
5. **Search** - Set up Algolia indices
6. **Storage** - Configure avatar upload bucket
7. **Caching** - Set up Redis
8. **Email** - Configure transactional emails
9. **Monitoring** - Set up error tracking
10. **CDN** - Configure Cloudflare

## 🔐 Security Best Practices

1. **Never commit credentials** - Use environment variables
2. **Use Secret Manager** - Google Secret Manager or similar
3. **Rotate keys regularly** - Especially for production
4. **Limit API permissions** - Only what's needed
5. **Use service accounts** - Not personal credentials
6. **Enable API quotas** - Prevent unexpected costs
7. **Monitor usage** - Set up billing alerts

## 📝 Testing Credentials

Create separate credentials for development:
- Shopify development store
- Firebase development project  
- Stripe test mode keys
- Algolia development indices

Prefix all development environment variables with `DEV_` to avoid confusion.

This checklist ensures you have all necessary credentials before starting implementation. Each service plays a crucial role in the JIGA Store ecosystem. 