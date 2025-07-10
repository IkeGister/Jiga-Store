# Custom Agent Creation System Design - Variant Model

## Overview

Users can create personalized variants of any of the 13 system agents. These "owned" variants inherit all capabilities from their parent agent but offer customization options and economic benefits.

## Core Concept: Agent Variants

### What is a Variant?
A variant is a user-owned copy of a system agent with:
- Custom name and avatar
- Selected voice from available options
- All features/tools of the parent agent
- Lower operational costs (DOF consumption)
- Ability to be published to marketplace

### Variant vs System Agent

| Aspect | System Agent | User Variant |
|--------|--------------|--------------|
| Initial Cost | Base DOF package price | 2-3x base price |
| DOF Consumption | Standard rate | 70% of standard |
| Customizable | No | Name, avatar, voice |
| Publishable | No | Yes |
| Experience Tracking | Personal only | Personal + marketable |
| Ownership | Platform | User |

## Creation Process

### Step 1: Select Base Agent

```
Choose Your Base Agent:

[Scout - Bronze]          [Nova - Gold]           [Ace - Platinum]
Observer Assistant        Team Coordinator        Elite Mentor
3,000 DOF/hr             8,000 DOF/hr           15,000 DOF/hr
Create for: 30,000 DOF   Create for: 150,000    Create for: 300,000

[View All 13 Agents →]
```

### Step 2: Customize Variant

```
Personalizing: Nova (Gold Team Coordinator)

Name Your Agent: [_________________]
                 e.g., "Storm Commander", "Echo Leader"

Choose Avatar: [Upload Custom] or [Select Default]
              Recommended: 512x512px PNG

Select Voice: ○ UK Female (Original)
             ○ US Female 
             ○ Australian Female
             ○ [Preview Voices]

Review Features:
✓ Voice Chat with Memory
✓ Team Messaging
✓ Turel Sound Detection
✓ Gold Rank Processing Speed
```

### Step 3: Confirm Creation

```
Creating Your Variant:

Base Agent: Nova (Gold Team Coordinator)
Your Name: Storm Commander
Voice: US Female
Avatar: Custom uploaded

Cost Breakdown:
- Base Agent Value: 50,000 DOF
- Variant Premium (3x): 150,000 DOF
- Total Cost: 150,000 DOF

Benefits:
✓ 30% lower DOF consumption (5,600 DOF/hr vs 8,000)
✓ Publishable to marketplace
✓ Custom identity
✓ Experience accumulation

[Create Variant] [Cancel]
```

## Variant Pricing Model

### Creation Cost Formula

```typescript
interface VariantPricing {
  Bronze: {
    systemRate: 3000,      // DOF/hour
    variantRate: 2100,     // 70% of system
    creationMultiplier: 3, // 3x base cost
    exampleCost: 30000     // 10K base × 3
  },
  Silver: {
    systemRate: 5000,
    variantRate: 3500,
    creationMultiplier: 3,
    exampleCost: 75000     // 25K base × 3
  },
  Gold: {
    systemRate: 9000,
    variantRate: 6300,
    creationMultiplier: 3,
    exampleCost: 150000    // 50K base × 3
  },
  Platinum: {
    systemRate: 18000,
    variantRate: 12600,
    creationMultiplier: 3,
    exampleCost: 300000    // 100K base × 3
  }
}
```

### ROI Calculation

Break-even point = Creation Premium / Hourly Savings

Example for Gold variant:
- Premium paid: 100,000 DOF (150K - 50K)
- Hourly savings: 2,700 DOF (9,000 - 6,300)
- Break-even: ~37 hours of use

## API Design

### Create Variant Endpoint

```typescript
POST /api/v1/agents/create-variant

Request:
{
  "baseAgentId": "nova-coordinator",  // System agent to copy
  "customization": {
    "name": "Storm Commander",
    "avatarUrl": "https://...",      // Uploaded separately
    "voiceId": "us_female"           // From allowed voices
  }
}

Response: 201 Created
{
  "variant": {
    "id": "storm-commander-nova-variant-001",
    "ownerId": "user123",
    "baseAgentId": "nova-coordinator",
    "baseAgentName": "Nova",
    "name": "Storm Commander",
    "avatarUrl": "https://...",
    "rank": "Gold",
    "type": "Assistant",
    "hasVoiceChat": true,
    "hasCommentator": false,
    "hasMemory": true,
    "toolkit": ["team_messaging", "voice_instruction", "general_gaming", "turel"],
    "voiceId": "us_female",
    "configuration": {
      // Inherited from Nova
    },
    "pricing": {
      "baseRate": 6300,              // 70% of Nova's 9000
      "creationCost": 150000,
      "savings": "30%"
    },
    "marketplaceStatus": {
      "canPublish": true,
      "isPublished": false
    },
    "isVariant": true,
    "variantOf": "nova-coordinator"
  },
  "transaction": {
    "id": "txn_123456",
    "amount": 150000,
    "type": "variant_creation"
  }
}
```

### List Available Voices

```typescript
GET /api/v1/agents/{baseAgentId}/available-voices

Response: 200 OK
{
  "baseVoice": {
    "id": "uk_female",
    "name": "British Female",
    "isOriginal": true
  },
  "alternativeVoices": [
    {
      "id": "us_female",
      "name": "American Female",
      "provider": "gemini"
    },
    {
      "id": "australian_female",
      "name": "Australian Female",
      "provider": "gemini"
    }
  ]
}
```

## Variant Rules

### 1. Inheritance Rules
- Variants inherit ALL features from base agent
- Cannot modify tools, rank, or capabilities
- Cannot downgrade features

### 2. Voice Selection Rules
- Must stay within same provider (Gemini, Google, OpenAI)
- Gender flexibility allowed
- Voice must be compatible with agent type

### 3. Naming Rules
- 3-50 characters
- Must be unique across user's agents
- Cannot use system agent names
- Subject to content moderation

### 4. Avatar Rules
- Custom upload supported
- Recommended: 512x512 PNG
- Max file size: 2MB
- Subject to content moderation

### 5. Mentor Variant Special Rules
- Maintains learning capability
- Experience tracked separately from base
- Can evolve to Specialist independently
- Marketplace opt-in available

## Marketplace Publishing

### Variant Advantages
1. **Unique Identity**: Custom name/avatar stands out
2. **Price Competition**: Can price differently than system agents
3. **Reviews**: Build independent reputation
4. **Specialization**: Market to specific audiences

### Publishing Process

```typescript
POST /api/v1/variants/{variantId}/publish

Request:
{
  "listing": {
    "title": "Storm Commander - Elite Team Coordinator",
    "description": "Custom variant of Nova specialized for competitive teams",
    "tags": ["team-play", "competitive", "custom"],
    "pricing": {
      "baseRate": 6300,  // Cannot exceed variant rate
      "minimumAllocation": 50000
    }
  }
}
```

## Economic Model

### For Users
- **Higher upfront cost**: 3x base agent price
- **Lower operating cost**: 30% savings on DOF consumption
- **Marketplace revenue**: 70% of hire fees
- **Break-even**: Typically 30-50 hours of use

### For Platform
- **Creation revenue**: Premium pricing on variants
- **Marketplace fees**: 25% of variant hire transactions
- **Reduced load**: Variants consume fewer resources
- **Ecosystem growth**: More agents in marketplace

## Variant Examples

### Example 1: Competitive Player Creates "Phantom Ace"
- Base: Ace (Platinum Elite Mentor)
- Customization: Dark avatar, American male voice
- Use case: Personal training + marketplace rental
- Creation cost: 300,000 DOF
- Operational: 12,600 DOF/hr (vs 18,000)

### Example 2: Streamer Creates "Neon Zeus"
- Base: Zeus (Platinum Commentator)
- Customization: Bright avatar, energetic voice
- Use case: Stream commentary
- Creation cost: 300,000 DOF
- Operational: 14,000 DOF/hr (vs 20,000)

### Example 3: Team Leader Creates "Alpha Coach"
- Base: Coach (Silver Voice Mentor)
- Customization: Team logo avatar, authoritative voice
- Use case: Team training sessions
- Creation cost: 75,000 DOF
- Operational: 3,500 DOF/hr (vs 5,000)

## Implementation Phases

### Phase 1: Basic Variants (Month 1)
- Variant creation for Assistants
- Name and avatar customization
- Basic marketplace publishing

### Phase 2: Voice Selection (Month 2)
- Voice alternatives per provider
- Voice preview system
- Voice compatibility matrix

### Phase 3: Mentor Variants (Month 3)
- Learning system inheritance
- Experience tracking
- Progression handling

### Phase 4: Advanced Features (Month 4+)
- Bulk variant creation
- Variant templates
- Transfer/gifting system
- Limited edition variants

## Benefits of Variant Model

### For Users
1. **Personalization**: Make agents truly yours
2. **Economics**: Save DOFs long-term
3. **Revenue**: Earn from marketplace
4. **Branding**: Build reputation

### For Platform
1. **Simplicity**: No complex validation
2. **Quality**: Based on proven agents
3. **Revenue**: Premium pricing
4. **Scalability**: Easy to implement

### For Marketplace
1. **Variety**: Multiple versions of popular agents
2. **Competition**: Price/brand competition
3. **Discovery**: Users find preferred variants
4. **Trust**: Based on known capabilities

## Comparison: Variant Model vs From-Scratch Model

| Aspect | Variant Model | From-Scratch Model |
|--------|---------------|-------------------|
| Implementation | Simple | Complex |
| Quality Control | Automatic | Requires validation |
| User Experience | Straightforward | Overwhelming |
| Time to Create | Minutes | 30+ minutes |
| Support Burden | Low | High |
| Customization | Limited but sufficient | Extensive |
| Market Success | Higher (proven base) | Variable |

## Success Metrics

1. **Adoption**: % of users creating variants
2. **Usage**: Variant hours vs system hours
3. **ROI**: Users reaching break-even
4. **Marketplace**: Variants published and hired
5. **Satisfaction**: User ratings of variant system 