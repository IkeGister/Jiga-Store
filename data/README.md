# JIGA Store Core Data

This directory contains the pre-configured data for the 13 core JIGA agents that will be available at launch.

## 📁 Files

- **`core-agents.json`** - Complete agent configurations for all 13 agents
- **`marketplace-listings.json`** - Marketplace listing data for each agent

## 🤖 Agent Overview

### By Provider
- **Gemini (4 agents)**: Scout, Nova, Ace, Zeus
- **Google (3 agents)**: Coach, Ghost, truWakandan
- **OpenAI (6 agents)**: Blaze, Echo, Fable, Onyx, Hype, Shimmer

### By Type
- **Assistants (9)**: Single-session helpers
- **Mentors (3)**: Learning-enabled companions
- **Specialists (1)**: Expert agents with proven experience

### By Rank
- **Bronze (1)**: Scout - Entry-level pricing
- **Silver (5)**: Coach, Ghost, Echo, Hype - Mid-tier options
- **Gold (4)**: Nova, Blaze, Fable, Shimmer - Premium features
- **Platinum (3)**: Ace, truWakandan, Onyx, Zeus - Elite performance

## 💰 Pricing Summary

Agents use a DOF consumption model - when DOFs are exhausted, the agent contract expires.

| Agent | Type | Rank | Base Rate (DOFs/hour equivalent) |
|-------|------|------|----------------------------------|
| Scout | Assistant | Bronze | 3,000 |
| Hype | Assistant | Silver | 4,500 |
| Ghost | Assistant | Silver | 5,000 |
| Echo | Assistant | Silver | 5,500 |
| Coach | Mentor | Silver | 6,000 |
| Nova | Assistant | Gold | 8,000 |
| Blaze | Assistant | Gold | 9,000 |
| Fable | Mentor | Gold | 10,000 |
| Shimmer | Mentor | Gold | 11,000 |
| Zeus | Assistant | Platinum | 12,000 |
| Ace | Mentor | Platinum | 15,000 |
| Onyx | Assistant | Platinum | 18,000 |
| truWakandan | Specialist | Platinum | 20,000 |

## 🚀 Database Seeding

### Prerequisites

1. Set up your Firebase project
2. Install dependencies:
   ```bash
   npm install firebase-admin
   ```

### Environment Variables

Create a `.env` file with:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
```

### Running the Seed Script

```bash
# For production Firebase
npm run seed-database

# For local emulator
FIRESTORE_EMULATOR_HOST=localhost:8080 npm run seed-database
```

### What Gets Created

1. **System User** - Owner of all core agents
2. **13 Agents** - Full agent documents with configurations
3. **13 Marketplace Listings** - Public-facing marketplace entries
4. **1 Badge Definition** - Call of Duty Expert badge
5. **4 DOF Packages** - Bronze, Silver, Gold, Platinum

## 📋 Agent Features

### Voice Capabilities
- **Voice Chat (8)**: Two-way interactive communication
- **Commentator (4)**: One-way game narration
- **Silent (1)**: Ghost - text only

### Learning & Memory
- **With Memory (7)**: Can remember user preferences
- **With Learning (3)**: Mentors that grow over time
- **Stateless (6)**: Fresh start each session

### Special Features
- **Turel Sound Detection (11)**: Advanced audio awareness
- **Team Messaging (7)**: Coordinate with teammates
- **Specialist Detection (4)**: Identify in-game specialists

## 🔧 Customization

To modify agents before seeding:

1. Edit `core-agents.json` with your changes
2. Update corresponding entries in `marketplace-listings.json`
3. Run the seed script

### Adding New Agents

1. Follow the existing agent schema
2. Ensure unique IDs (format: `name-type-###`)
3. Set `ownerId: "system"` for platform-owned agents
4. Configure all required fields
5. Create matching marketplace listing

## 📝 Schema Reference

See the following documents for complete schema definitions:
- [Agent Schema](../Docs/JigaStoreImplementationPlan.md#data-models)
- [Marketplace Schema](../Docs/JigaStoreImplementationPlan.md#data-models)
- [Configuration Options](../Docs/ProductDesign.md#configuration-categories)

## ⚠️ Important Notes

1. **IDs are permanent** - Once seeded, agent IDs should not change
2. **System user required** - The script creates a system user that owns all core agents
3. **Timestamps** - The script converts date strings to Firestore timestamps
4. **Emulator testing** - Test with local emulator before production seeding

## 🔄 Updates

To update existing agents:
1. Modify the JSON files
2. Run an update script (not the seed script)
3. Consider versioning for production updates

---

**Version**: 1.0.0  
**Last Updated**: January 2024 