# Custom Agent Variant API Specification

## Overview

This document details the API endpoints for creating user-owned variants of system agents in the JIGA Store.

## Core Concepts

### Variant Model
- Users create personalized copies of existing system agents
- Variants inherit ALL capabilities from parent agent
- Customizable: Name, Avatar, Voice (within provider)
- Economic benefit: 30% lower DOF consumption
- Publishable to marketplace

## Data Structures

### Variant Creation Request

```typescript
interface VariantCreationRequest {
  baseAgentId: string;              // ID of system agent to copy
  customization: {
    name: string;                   // 3-50 characters
    avatarUrl?: string;             // Optional custom avatar
    voiceId: string;                // Must be from same provider
  };
}
```

### Variant Response

```typescript
interface AgentVariant {
  id: string;
  ownerId: string;
  baseAgentId: string;
  baseAgentName: string;
  name: string;
  avatarUrl: string;
  rank: AgentRank;
  type: AgentType;
  provider: AIProvider;
  nationality: string;
  language: string;
  voiceId: string;
  hasVoiceChat: boolean;
  hasCommentator: boolean;
  hasMemory: boolean;
  toolkit: string[];
  configuration: AgentConfiguration;
  pricing: {
    baseRate: number;               // 70% of parent rate
    systemRate: number;             // Parent's rate for comparison
    creationCost: number;
    savings: string;                // e.g., "30%"
  };
  marketplaceStatus: {
    canPublish: boolean;            // Always true for variants
    isPublished: boolean;
    publishedAt?: string;
    listingId?: string;
  };
  statistics: {
    hoursUsed: number;
    dofsConsumed: number;
    dofsSaved: number;
    breakEvenProgress: number;      // Percentage to ROI
  };
  isVariant: boolean;               // Always true
  variantOf: string;                // Parent agent ID
  createdAt: string;
  updatedAt: string;
}
```

### Available Voices

```typescript
interface VoiceOption {
  id: string;
  name: string;
  provider: string;
  gender: string;
  accent: string;
  isOriginal: boolean;              // Voice of the base agent
  previewUrl?: string;
}
```

## API Endpoints

### 1. List System Agents

```typescript
GET /api/v1/agents/system

Query Parameters:
- rank?: "Bronze" | "Silver" | "Gold" | "Platinum"
- type?: "Assistant" | "Mentor" | "Specialist"
- hasVoiceChat?: boolean
- provider?: "gemini" | "google" | "openai"

Response: 200 OK
{
  "agents": [
    {
      "id": "scout-observer",
      "name": "Scout",
      "rank": "Bronze",
      "type": "Assistant",
      "provider": "gemini",
      "baseRate": 3000,
      "variantCost": 30000,         // 3x creation cost
      "variantRate": 2100,          // 70% operational rate
      "description": "Basic observer assistant",
      "features": ["observation", "event_detection"],
      "canCreateVariant": true
    },
    // ... other system agents
  ],
  "total": 13
}
```

### 2. Get Agent Details with Variant Info

```typescript
GET /api/v1/agents/{agentId}/variant-info

Response: 200 OK
{
  "agent": {
    "id": "nova-coordinator",
    "name": "Nova",
    "rank": "Gold",
    "baseRate": 8000,
    "features": [...],
    // ... full agent details
  },
  "variantInfo": {
    "creationCost": 150000,
    "operationalRate": 5600,
    "monthlySavings": 172800,       // Based on 8hr/day usage
    "breakEvenHours": 37,
    "roiPercentage": 30
  },
  "availableVoices": [
    {
      "id": "uk_female",
      "name": "British Female",
      "isOriginal": true
    },
    {
      "id": "us_female",
      "name": "American Female",
      "isOriginal": false
    }
  ],
  "existingVariants": {
    "userOwns": 0,
    "marketplaceTotal": 47
  }
}
```

### 3. Create Variant

```typescript
POST /api/v1/agents/create-variant

Headers:
- Authorization: Bearer {token}
- Content-Type: application/json

Request:
{
  "baseAgentId": "nova-coordinator",
  "customization": {
    "name": "Storm Commander",
    "avatarUrl": "https://storage.jiga.ai/avatars/storm-commander.png",
    "voiceId": "us_female"
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
    "avatarUrl": "https://storage.jiga.ai/avatars/storm-commander.png",
    "rank": "Gold",
    "type": "Assistant",
    "provider": "gemini",
    "voiceId": "us_female",
    "hasVoiceChat": true,
    "hasCommentator": false,
    "hasMemory": true,
    "toolkit": ["team_messaging", "voice_instruction", "general_gaming", "turel"],
    "pricing": {
      "baseRate": 5600,
      "systemRate": 8000,
      "creationCost": 150000,
      "savings": "30%"
    },
    "marketplaceStatus": {
      "canPublish": true,
      "isPublished": false
    },
    "statistics": {
      "hoursUsed": 0,
      "dofsConsumed": 0,
      "dofsSaved": 0,
      "breakEvenProgress": 0
    },
    "isVariant": true,
    "variantOf": "nova-coordinator"
  },
  "transaction": {
    "id": "txn_create_variant_123456",
    "type": "variant_creation",
    "amount": 150000,
    "status": "completed",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "userBalance": {
    "before": 500000,
    "after": 350000
  }
}

Errors:
400 - Invalid customization (name taken, invalid voice)
402 - Insufficient DOFs
404 - Base agent not found
409 - Variant name already exists
```

### 4. Update Variant

```typescript
PATCH /api/v1/variants/{variantId}

Request:
{
  "name": "Thunder Commander",      // Optional
  "avatarUrl": "https://...",      // Optional
  "voiceId": "australian_female"    // Optional, same provider only
}

Response: 200 OK
{
  "variant": {
    // Updated variant data
  },
  "changes": {
    "name": {
      "previous": "Storm Commander",
      "new": "Thunder Commander"
    },
    "voice": {
      "previous": "us_female",
      "new": "australian_female"
    }
  }
}
```

### 5. List User's Variants

```typescript
GET /api/v1/users/{userId}/variants

Query Parameters:
- status?: "all" | "published" | "unpublished"
- rank?: AgentRank
- sortBy?: "created" | "usage" | "savings" | "name"

Response: 200 OK
{
  "variants": [
    {
      "id": "storm-commander-nova-variant-001",
      "name": "Storm Commander",
      "baseAgentName": "Nova",
      "rank": "Gold",
      "created": "2024-01-15T10:30:00Z",
      "statistics": {
        "hoursUsed": 45,
        "dofsSaved": 121500,
        "breakEvenProgress": 121      // 121% = past break-even
      },
      "marketplaceStatus": {
        "isPublished": true,
        "totalHires": 12,
        "earnings": 67200
      }
    }
  ],
  "summary": {
    "totalVariants": 3,
    "totalDofsSaved": 450000,
    "totalMarketplaceEarnings": 125000,
    "averageBreakEven": 35         // hours
  }
}
```

### 6. Publish Variant to Marketplace

```typescript
POST /api/v1/variants/{variantId}/publish

Request:
{
  "listing": {
    "title": "Storm Commander - Elite Gold Coordinator",
    "description": "Personalized variant of Nova with American accent...",
    "tags": ["team-play", "gold-rank", "custom-voice"],
    "category": "Team Coordination",
    "pricing": {
      "baseRate": 5600,             // Cannot exceed variant's rate
      "minimumAllocation": 50000,
      "discounts": {
        "bulk": {
          "100000": 5,              // 5% off for 100k+ DOFs
          "500000": 10              // 10% off for 500k+ DOFs
        }
      }
    },
    "availability": {
      "timezone": "UTC",
      "schedule": "always"          // or specific hours
    }
  }
}

Response: 200 OK
{
  "listing": {
    "id": "mkt-storm-commander-001",
    "variantId": "storm-commander-nova-variant-001",
    "status": "active",
    "publishedAt": "2024-01-15T11:00:00Z",
    "views": 0,
    "hires": 0,
    "url": "https://jiga.store/marketplace/storm-commander-001"
  }
}
```

### 7. Get Variant Performance Analytics

```typescript
GET /api/v1/variants/{variantId}/analytics

Query Parameters:
- period?: "day" | "week" | "month" | "all"

Response: 200 OK
{
  "usage": {
    "totalHours": 145,
    "totalSessions": 89,
    "averageSessionLength": 1.6,
    "dofsConsumed": 812000,
    "dofsIfSystemAgent": 1160000,
    "totalSaved": 348000
  },
  "marketplace": {
    "isPublished": true,
    "totalHires": 23,
    "uniqueHirers": 18,
    "totalEarnings": 184000,
    "averageRating": 4.7,
    "repeatHireRate": 0.28
  },
  "roi": {
    "creationCost": 150000,
    "breakEvenHours": 37,
    "currentHours": 145,
    "profitability": 348000,       // DOFs saved + earnings - cost
    "roiPercentage": 232
  }
}
```

### 8. Clone Variant Settings

```typescript
POST /api/v1/variants/{variantId}/clone

Request:
{
  "newName": "Storm Commander II",
  "targetBaseAgent": "nova-coordinator"  // Same or different base
}

Response: 201 Created
{
  "variant": {
    // New variant with same customizations
  },
  "clonedFrom": "storm-commander-nova-variant-001"
}
```

## WebSocket Events

### Variant Creation Progress

```typescript
// Creation started
{
  "type": "variant.creation.started",
  "data": {
    "tempId": "temp_123",
    "baseAgent": "nova-coordinator",
    "estimatedTime": 5
  }
}

// Avatar uploaded
{
  "type": "variant.avatar.uploaded",
  "data": {
    "tempId": "temp_123",
    "avatarUrl": "https://..."
  }
}

// Creation completed
{
  "type": "variant.creation.completed",
  "data": {
    "variant": { ... },
    "transaction": { ... }
  }
}
```

### Variant Performance Updates

```typescript
// Milestone reached
{
  "type": "variant.milestone.reached",
  "data": {
    "variantId": "storm-commander-001",
    "milestone": "break_even",
    "details": {
      "hoursToBreakEven": 37,
      "totalSaved": 150000
    }
  }
}

// Marketplace hire
{
  "type": "variant.marketplace.hired",
  "data": {
    "variantId": "storm-commander-001",
    "hireDetails": {
      "duration": 24,
      "earnings": 8064,             // 70% of hire fee
      "hirer": "anonymous"
    }
  }
}
```

## Error Handling

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INSUFFICIENT_DOFS` | Not enough DOFs for creation | 402 |
| `INVALID_NAME` | Name validation failed | 400 |
| `NAME_EXISTS` | Variant name already taken | 409 |
| `INVALID_VOICE` | Voice not available for provider | 400 |
| `INVALID_AVATAR` | Avatar validation failed | 400 |
| `AGENT_NOT_FOUND` | Base agent doesn't exist | 404 |
| `VARIANT_LIMIT` | User variant limit reached | 403 |
| `MARKETPLACE_RESTRICTED` | Cannot publish due to violations | 403 |

## SDK Examples

### JavaScript/TypeScript

```typescript
// Create a variant
const variant = await jigaStore.createVariant({
  baseAgentId: 'nova-coordinator',
  customization: {
    name: 'Storm Commander',
    avatarUrl: avatarBlob,
    voiceId: 'us_female'
  }
});

// Check ROI progress
const analytics = await jigaStore.getVariantAnalytics(variant.id);
console.log(`Break-even progress: ${analytics.roi.roiPercentage}%`);

// Publish to marketplace
if (analytics.roi.currentHours > 10) {  // Some usage first
  await jigaStore.publishVariant(variant.id, {
    title: `${variant.name} - Proven Team Coordinator`,
    description: 'Battle-tested variant with excellent coordination',
    pricing: {
      baseRate: variant.pricing.baseRate,
      minimumAllocation: 50000
    }
  });
}
```

### Variant Selection Helper

```typescript
class VariantAdvisor {
  static recommendBaseAgent(userProfile: UserProfile): AgentRecommendation {
    if (userProfile.playstyle === 'casual') {
      return { agent: 'scout-observer', reason: 'Low cost, quick ROI' };
    }
    if (userProfile.playstyle === 'competitive') {
      return { agent: 'ace-elite', reason: 'Maximum performance' };
    }
    if (userProfile.focus === 'streaming') {
      return { agent: 'zeus-commentator', reason: 'Engaging commentary' };
    }
    return { agent: 'nova-coordinator', reason: 'Balanced all-rounder' };
  }
  
  static calculateROI(baseAgent: Agent, hoursPerWeek: number): ROIProjection {
    const weeklyUsage = hoursPerWeek;
    const weeklySavings = weeklyUsage * (baseAgent.baseRate * 0.3);
    const weeksToBreakEven = baseAgent.variantCost / weeklySavings;
    
    return {
      breakEvenWeeks: Math.ceil(weeksToBreakEven),
      monthlySavings: weeklySavings * 4.33,
      yearlyReturn: (weeklySavings * 52) - baseAgent.variantCost
    };
  }
}
```

## Rate Limiting

```
/agents/create-variant: 5 per hour per user
/variants/{id}: 100 per hour per user
/variants/{id}/publish: 2 per hour per user
/variants/{id}/analytics: 30 per hour per user
``` 