# JIGA Store - Marketplace for AI Gaming Agents

JIGA Store is a comprehensive marketplace platform for Joint Intelligence Gaming Assistants (JIGA Agents). It enables users to purchase, customize, and hire AI-powered gaming companions using a DOF (Degrees of Freedom) token economy.

## 🎮 Overview

JIGA Store connects gamers with AI agents that enhance their gaming experience through:
- Real-time game observation and analysis
- Voice chat interaction and commentary
- Team coordination and messaging
- Learning and progression systems
- Custom agent variants

## 🏗️ Architecture

The platform is built on a microservices architecture with:
- **Firebase** for database and authentication
- **Shopify** for DOF package sales
- **AI Providers** (OpenAI, Google AI/Gemini) for agent intelligence
- **Algolia** for marketplace search
- **Redis** for caching and real-time features

## 📁 Project Structure

```
Jiga-Store/
├── Docs/                    # Comprehensive documentation
│   ├── JigaStoreImplementationPlan.md
│   ├── JigaStoreTechnicalArchitecture.md
│   ├── JigaStoreServiceInterfaces.md
│   ├── CustomAgentCreation.md
│   ├── VariantImplementationPlan.md
│   └── DeveloperCredentialsChecklist.md
├── data/                    # Data models and schemas
│   ├── core-agents.json     # 13 system agents
│   ├── marketplace-listings.json
│   ├── agent-schema.json
│   └── custom-agent-schema.json
└── scripts/                 # Utility scripts
    ├── seed-database.js     # Initialize Firebase
    └── verify-credentials.js # Check environment setup
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Firestore enabled
- Shopify Partner account
- API keys for OpenAI and Google AI
- Algolia account for search

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IkeGister/Jiga-Store.git
cd Jiga-Store
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Verify credentials:
```bash
node scripts/verify-credentials.js --test
```

5. Seed the database:
```bash
node scripts/seed-database.js
```

## 💎 Core Features

### 13 System Agents
- **Bronze**: Scout (Basic Observer)
- **Silver**: Coach, Ghost, Echo, Hype (Various specialties)
- **Gold**: Nova, Blaze, Fable, Shimmer (Advanced features)
- **Platinum**: Ace, Zeus, Onyx, truWakandan (Elite capabilities)

### DOF Economy
- **Packages**: $4.99 - $99.99 for 150K - 5M DOFs
- **Consumption**: Based on agent rank and features used
- **Earning**: Silver+ agents can earn DOFs through gameplay

### Variant System
- Create personalized versions of system agents
- 30% lower DOF consumption
- Publishable to marketplace
- Custom name, avatar, and voice

### Marketplace
- Browse and hire agent variants
- 70/25/5% revenue split (owner/platform/creator)
- Ratings and reviews
- Experience-based pricing

## 🛠️ Development

### API Endpoints

Key endpoints include:
- `POST /api/v1/agents/create-variant` - Create agent variant
- `GET /api/v1/marketplace/search` - Search marketplace
- `POST /api/v1/sessions/start` - Start agent session
- `POST /api/v1/dof/purchase` - Purchase DOF package

See [JigaStoreServiceInterfaces.md](Docs/JigaStoreServiceInterfaces.md) for complete API documentation.

### Running Locally

```bash
# Start all services
npm run dev

# Run specific service
npm run dev:api
npm run dev:marketplace
npm run dev:session
```

### Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

## 📊 Implementation Timeline

- **Phase 1** (Weeks 1-4): Core Infrastructure
- **Phase 2** (Weeks 5-8): Agent Management
- **Phase 3** (Weeks 9-12): Marketplace
- **Phase 4** (Weeks 13-16): Session Management
- **Phase 5** (Weeks 17-20): DOF Economy
- **Phase 6** (Weeks 21-24): Analytics & Search
- **Phase 7** (Weeks 25-28): Performance & Security
- **Phase 8** (Weeks 29-32): Launch Preparation

## 🔐 Security

- Firebase Authentication for user management
- API key rotation and rate limiting
- Content moderation for avatars and names
- Secure payment processing via Shopify
- Regular security audits

## 📄 Documentation

Comprehensive documentation is available in the `Docs/` directory:
- [Implementation Plan](Docs/JigaStoreImplementationPlan.md)
- [Technical Architecture](Docs/JigaStoreTechnicalArchitecture.md)
- [API Documentation](Docs/JigaStoreServiceInterfaces.md)
- [Custom Agent System](Docs/CustomAgentCreation.md)
- [Developer Setup](Docs/DeveloperCredentialsChecklist.md)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines (coming soon).

## 📜 License

This project is proprietary and confidential. All rights reserved.

## 🙏 Acknowledgments

- OpenAI for GPT models
- Google for Gemini AI
- Firebase team for excellent documentation
- The gaming community for inspiration

---

Built with ❤️ for gamers who want AI companions that truly understand their playstyle. 