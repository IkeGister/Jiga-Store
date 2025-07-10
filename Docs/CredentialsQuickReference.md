# JIGA Store Credentials Quick Reference

## 🚀 Essential Services (Required)

| Service | Purpose | Quick Setup |
|---------|---------|-------------|
| **Firebase** | Database, Auth, Storage | [console.firebase.google.com](https://console.firebase.google.com) → Create Project |
| **Shopify** | DOF Sales, Payments | [partners.shopify.com](https://partners.shopify.com) → Create App |
| **OpenAI** | AI Agents (6 agents) | [platform.openai.com](https://platform.openai.com) → API Keys |
| **Google AI** | AI Agents (4 agents) | [makersuite.google.com](https://makersuite.google.com) → Get API Key |
| **Algolia** | Search & Discovery | [algolia.com](https://www.algolia.com) → Create App |
| **SendGrid** | Email Notifications | [sendgrid.com](https://sendgrid.com) → API Keys |

## 📦 Recommended Services (Enhance Performance)

| Service | Purpose | Quick Setup |
|---------|---------|-------------|
| **Redis** | Caching, Sessions | [upstash.com](https://upstash.com) → Create Database |
| **Cloudflare** | CDN, Protection | [cloudflare.com](https://cloudflare.com) → Add Site |
| **Google TTS** | Voice Synthesis | GCP Console → Enable Text-to-Speech API |
| **Vision API** | Avatar Moderation | GCP Console → Enable Cloud Vision API |

## 📊 Optional Services (Nice to Have)

| Service | Purpose | Quick Setup |
|---------|---------|-------------|
| **Stripe** | Alternative Payments | [stripe.com](https://stripe.com) → Get Keys |
| **GA4** | Analytics | [analytics.google.com](https://analytics.google.com) → Create Property |
| **Sentry** | Error Tracking | [sentry.io](https://sentry.io) → Create Project |
| **Twilio** | SMS Notifications | [twilio.com](https://twilio.com) → Get Number |

## 🔑 Environment Variables Template

```bash
# Copy this to .env and fill in your values

# === REQUIRED ===
# Firebase
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@..."

# Shopify
SHOPIFY_SHOP_DOMAIN="your-store.myshopify.com"
SHOPIFY_ADMIN_API_TOKEN="shpat_..."

# AI Providers
OPENAI_API_KEY="sk-..."
GOOGLE_AI_API_KEY="AIzaSy..."

# Search
ALGOLIA_APP_ID="..."
ALGOLIA_ADMIN_API_KEY="..."

# Email
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@jiga.store"

# === OPTIONAL ===
# Add as needed...
```

## ✅ Verification Commands

```bash
# 1. Install dependencies
npm install

# 2. Check environment variables
node scripts/verify-credentials.js

# 3. Test connections
node scripts/verify-credentials.js --test

# 4. Seed database (after credentials verified)
node scripts/seed-database.js
```

## 🎯 Setup Priority Order

1. **Firebase First** - Your main backend
2. **Shopify Second** - Set up DOF products
3. **AI Keys Third** - Enable agent functionality
4. **Search Fourth** - Set up Algolia indices
5. **Everything Else** - Add as you build features

## 💡 Pro Tips

1. **Use Development Projects** - Separate dev/prod credentials
2. **Set Quotas** - Limit API usage to prevent surprises
3. **Enable Billing Alerts** - Monitor costs early
4. **Use Secret Manager** - Don't store keys in code
5. **Document Everything** - Keep a secure record of setup

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Firebase permission denied | Check service account has correct roles |
| Shopify 401 error | Verify API scopes and token |
| OpenAI rate limits | Set up usage limits in dashboard |
| Algolia index not found | Create indices before using |
| Email not sending | Verify sender domain/email |

## 📞 Support Resources

- **Firebase**: [firebase.google.com/support](https://firebase.google.com/support)
- **Shopify**: [help.shopify.com/api](https://help.shopify.com/api)
- **OpenAI**: [help.openai.com](https://help.openai.com)
- **Algolia**: [algolia.com/doc](https://www.algolia.com/doc)

---

**Remember**: Never commit credentials to version control. Use environment variables! 