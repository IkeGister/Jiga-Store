# JIGA Store Quick Reference Guide

## 🚀 Project Overview

**JIGA Store** is a marketplace service for Joint Intelligence Gaming Assistants (JIGA Agents), featuring:
- Agent creation and management
- DOF (Degrees of Freedom) economy
- Marketplace for hiring specialists
- Real-time session management
- Multi-platform SDK support

## 📁 Key Documents

1. **[Implementation Plan](./JigaStoreImplementationPlan.md)** - Project roadmap and phases
2. **[Technical Architecture](./JigaStoreTechnicalArchitecture.md)** - System design details
3. **[Service Interfaces](./JigaStoreServiceInterfaces.md)** - API contracts and SDKs
4. **[Product Design](./ProductDesign.md)** - Business logic and agent catalog

## 🏗️ Architecture Summary

### Tech Stack
- **Backend**: Node.js/Express or Python/FastAPI
- **Database**: Firebase Firestore + Realtime DB
- **Cache**: Redis
- **Search**: Algolia
- **Payments**: Shopify + Stripe Connect
- **Infrastructure**: Google Cloud Platform + Kubernetes

### Core Services
1. **Agent Service** - Agent lifecycle management
2. **Marketplace Service** - Discovery and listings
3. **Transaction Service** - DOF economy and payments
4. **Session Service** - Real-time agent interactions
5. **User Service** - Authentication and profiles
6. **Analytics Service** - Metrics and insights

## 💰 DOF Economy

### Pricing Tiers
- **Bronze**: $4.99 = 150,000 DOFs
- **Silver**: $14.99 = 500,000 DOFs
- **Gold**: $39.99 = 1,500,000 DOFs
- **Platinum**: $99.99 = 5,000,000 DOFs

### Marketplace Revenue Split
- **70%** to agent owner
- **25%** to platform
- **5%** to original creator

## 🤖 Agent Types

### 1. Assistants
- Single-session helpers
- No memory/learning
- Voice chat OR commentary

### 2. Mentors
- Learning-enabled companions
- Build experience over time
- Can evolve into specialists

### 3. Specialists
- Expert agents with badges
- **Trained**: Platform-owned (e.g., truWakandan)
- **Experience**: User-developed from Mentors

## 🔑 Key API Endpoints

```
# Authentication
POST   /api/v1/auth/login
GET    /api/v1/auth/user

# Agents
GET    /api/v1/agents              # List owned agents
POST   /api/v1/agents              # Create agent
POST   /api/v1/agents/:id/publish  # Publish to marketplace

# Marketplace
GET    /api/v1/marketplace/search  # Search listings
POST   /api/v1/marketplace/:id/hire # Hire agent

# Sessions
POST   /api/v1/sessions            # Start session
DELETE /api/v1/sessions/:id        # End session

# Transactions
POST   /api/v1/transactions/purchase # Buy DOFs
POST   /api/v1/transactions/transfer # Transfer DOFs
```

## 📦 SDK Usage

### JavaScript/TypeScript
```typescript
import { JIGAStore } from '@jiga/store-sdk';

const store = new JIGAStore({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Create agent
const agent = await store.agents.create({
  name: 'My Assistant',
  rank: 'Silver',
  type: 'Assistant',
  // ... configuration
});

// Search marketplace
const results = await store.marketplace.search({
  game: 'Call of Duty',
  rank: ['Gold', 'Platinum'],
  hasVoiceChat: true
});

// Start session
const session = await store.sessions.create({
  agentId: agent.id,
  type: 'owned'
});
```

## 🚦 Development Phases

### Phase 1: Foundation (Weeks 1-4)
- Firebase setup
- Authentication system
- Basic data models

### Phase 2: Agent Management (Weeks 5-8)
- CRUD operations
- Configuration system
- Badge tracking

### Phase 3: Marketplace (Weeks 9-12)
- Search and discovery
- Review system
- Listing management

### Phase 4: Transactions (Weeks 13-16)
- DOF wallet
- Shopify integration
- Revenue distribution

### Phase 5: Real-time (Weeks 17-20)
- WebSocket infrastructure
- Session management
- Live notifications

### Phase 6: Advanced (Weeks 21-24)
- Analytics dashboard
- Recommendation engine
- Admin tools

### Phase 7: Testing (Weeks 25-28)
- Load testing
- Security audit
- Bug fixes

### Phase 8: Launch (Weeks 29-32)
- Beta testing
- Documentation
- Go-live

## 🔒 Security Checklist

- [ ] Firebase Auth integration
- [ ] JWT token validation
- [ ] Rate limiting (1000 req/min authenticated)
- [ ] Input validation (Joi schemas)
- [ ] SQL injection protection
- [ ] XSS prevention (Helmet.js)
- [ ] CORS configuration
- [ ] API key management
- [ ] Data encryption (AES-256)
- [ ] GDPR compliance

## 📊 Success Metrics

### Technical
- 99.9% uptime
- < 200ms API response time (p95)
- 10,000+ concurrent users
- < 1% error rate

### Business
- 1,000+ agents listed
- 10,000+ active users
- $100k+ monthly volume
- 4.5+ average rating

## 🛠️ Development Commands

```bash
# Local development
docker-compose up                    # Start all services
npm run dev                         # Start dev server
npm test                           # Run tests
npm run lint                       # Lint code

# Deployment
gcloud builds submit               # Build containers
kubectl apply -f k8s/             # Deploy to K8s
terraform apply                   # Update infrastructure

# Monitoring
kubectl logs -f deployment/api    # View logs
kubectl top pods                  # Resource usage
```

## 📞 Support Contacts

- **Technical Lead**: [TBD]
- **Product Owner**: [TBD]
- **DevOps**: [TBD]
- **Security**: [TBD]

## 🔗 Important Links

- Firebase Console: https://console.firebase.google.com
- GCP Console: https://console.cloud.google.com
- Shopify Partners: https://partners.shopify.com
- API Documentation: https://docs.jigastore.com
- Status Page: https://status.jigastore.com

---

**Version**: 1.0  
**Last Updated**: [Current Date]  
**Next Review**: [Date + 2 weeks] 