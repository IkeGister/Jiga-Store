# Variant Model Implementation Plan

## Quick Start Guide

The Variant Model allows users to create personalized versions of system agents with these simple rules:
- **Base**: Any of the 13 system agents
- **Customize**: Name, Avatar, Voice only
- **Cost**: 3x the base agent's package price
- **Benefit**: 30% lower DOF consumption + marketplace publishing

## Phase 1: Core Variant System (Week 1-2)

### Database Schema

```sql
-- Variants table
CREATE TABLE agent_variants (
  id VARCHAR PRIMARY KEY,
  owner_id VARCHAR NOT NULL,
  base_agent_id VARCHAR NOT NULL,
  name VARCHAR(50) NOT NULL,
  avatar_url VARCHAR,
  voice_id VARCHAR NOT NULL,
  base_rate INTEGER NOT NULL,      -- 70% of parent rate
  creation_cost INTEGER NOT NULL,  -- 3x base package
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(owner_id, name)
);

-- Variant statistics
CREATE TABLE variant_stats (
  variant_id VARCHAR PRIMARY KEY,
  hours_used DECIMAL DEFAULT 0,
  dofs_consumed INTEGER DEFAULT 0,
  dofs_saved INTEGER DEFAULT 0,
  sessions_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP
);
```

### API Endpoints

```typescript
// 1. Get available base agents
GET /api/v1/agents/system

// 2. Get variant pricing info
GET /api/v1/agents/{agentId}/variant-info

// 3. Create variant
POST /api/v1/agents/create-variant
Body: {
  baseAgentId: string,
  customization: {
    name: string,
    avatarUrl?: string,
    voiceId: string
  }
}

// 4. List user's variants
GET /api/v1/users/{userId}/variants

// 5. Update variant
PATCH /api/v1/variants/{variantId}
```

### Pricing Logic

```typescript
function calculateVariantPricing(baseAgent: Agent) {
  const basePackages = {
    Bronze: { cost: 10000, rate: 3000 },
    Silver: { cost: 25000, rate: 5000 },
    Gold: { cost: 50000, rate: 9000 },
    Platinum: { cost: 100000, rate: 18000 }
  };
  
  const base = basePackages[baseAgent.rank];
  
  return {
    creationCost: base.cost * 3,        // 3x multiplier
    operationalRate: base.rate * 0.7,   // 30% savings
    systemRate: base.rate,
    monthlySavings: base.rate * 0.3 * 240  // 8hrs/day
  };
}
```

## Phase 2: Marketplace Integration (Week 3-4)

### Publishing System

```typescript
POST /api/v1/variants/{variantId}/publish
Body: {
  listing: {
    title: string,
    description: string,
    tags: string[],
    pricing: {
      baseRate: number,      // Cannot exceed variant rate
      minimumAllocation: number
    }
  }
}
```

### Revenue Distribution

```typescript
function distributeHireRevenue(hireAmount: number) {
  return {
    owner: hireAmount * 0.70,      // 70% to variant owner
    platform: hireAmount * 0.25,   // 25% to platform
    creator: hireAmount * 0.05     // 5% to original creator
  };
}
```

### Marketplace Listing Schema

```sql
CREATE TABLE marketplace_listings (
  id VARCHAR PRIMARY KEY,
  variant_id VARCHAR NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  tags TEXT[],
  base_rate INTEGER NOT NULL,
  minimum_allocation INTEGER DEFAULT 10000,
  status VARCHAR DEFAULT 'active',
  total_hires INTEGER DEFAULT 0,
  total_revenue INTEGER DEFAULT 0,
  average_rating DECIMAL,
  published_at TIMESTAMP,
  FOREIGN KEY (variant_id) REFERENCES agent_variants(id)
);
```

## Phase 3: Analytics & Optimization (Week 5-6)

### Analytics Endpoints

```typescript
GET /api/v1/variants/{variantId}/analytics
Response: {
  usage: {
    totalHours: number,
    dofsConsumed: number,
    dofsSaved: number
  },
  roi: {
    breakEvenHours: number,
    currentProgress: number,
    projectedMonthlyReturn: number
  },
  marketplace: {
    totalHires: number,
    totalEarnings: number,
    averageRating: number
  }
}
```

### ROI Dashboard

```typescript
interface VariantDashboard {
  variant: {
    name: string,
    baseAgent: string,
    created: Date
  },
  economics: {
    invested: number,          // Creation cost
    saved: number,            // DOFs saved so far
    earned: number,           // Marketplace revenue
    netReturn: number,        // Saved + Earned - Invested
    breakEvenStatus: string   // "In Progress" | "Achieved"
  },
  projections: {
    monthlyUsage: number,     // Based on history
    monthlySavings: number,
    monthlyEarnings: number,
    timeToBreakEven: string   // "2 weeks" | "Already achieved"
  }
}
```

## UI/UX Implementation

### Variant Creation Flow

```
Step 1: Agent Selection
┌─────────────────────────────────────────┐
│ Choose Your Base Agent                  │
│                                         │
│ [Scout]  [Nova]  [Ace]  [Zeus]         │
│ Bronze   Gold    Plat   Plat           │
│ 3K/hr    8K/hr   18K/hr 20K/hr        │
│                                         │
│ ▼ Show All 13 Agents                   │
└─────────────────────────────────────────┘

Step 2: Customization
┌─────────────────────────────────────────┐
│ Personalize Your Nova Variant           │
│                                         │
│ Name: [Storm Commander___________]      │
│                                         │
│ Avatar: [📷 Upload] [🎨 Default]       │
│                                         │
│ Voice: ○ British Female (Original)      │
│        ● American Female                │
│        ○ Australian Female              │
│        [▶️ Preview Voices]              │
└─────────────────────────────────────────┘

Step 3: Confirmation
┌─────────────────────────────────────────┐
│ Create Your Variant                     │
│                                         │
│ Base: Nova (Gold Coordinator)           │
│ Name: Storm Commander                   │
│ Voice: American Female                  │
│                                         │
│ Investment: 150,000 DOF                 │
│ Your Rate: 5,600 DOF/hr (-30%)         │
│ Break-even: ~62 hours of use           │
│                                         │
│ [Create Variant] [Cancel]               │
└─────────────────────────────────────────┘
```

## Testing Requirements

### Unit Tests
- Variant creation with valid/invalid inputs
- Pricing calculations
- Voice compatibility checks
- Name uniqueness validation

### Integration Tests
- Full creation flow
- Payment processing
- Marketplace publishing
- Revenue distribution

### Load Tests
- 1000 concurrent variant creations
- Marketplace browsing performance
- Analytics calculation efficiency

## Success Metrics

### Launch Metrics (Month 1)
- Variants created: Target 500+
- Creation success rate: >95%
- Average time to create: <3 minutes
- User satisfaction: 4.5+ stars

### Growth Metrics (Month 3)
- Active variants: 2,000+
- Published to marketplace: 30%
- Average ROI achievement: 60%
- Marketplace transactions: 5,000+

### Long-term Success (Month 6)
- Variant adoption: 40% of active users
- Marketplace revenue: 25% of platform revenue
- User retention: 85% of variant creators active
- Support tickets: <5% related to variants

## Risk Mitigation

### Technical Risks
1. **Voice Compatibility**
   - Solution: Strict provider-based voice lists
   - Fallback: Default to original voice

2. **Name Collisions**
   - Solution: Unique per user, not global
   - UI: Real-time availability check

3. **Avatar Upload Abuse**
   - Solution: Image moderation API
   - Size limits: 2MB max
   - Format: PNG/JPG only

### Business Risks
1. **High Entry Cost Resistance**
   - Solution: Clear ROI calculator
   - Marketing: Success stories
   - Option: Payment plans

2. **Market Saturation**
   - Solution: Discovery algorithms
   - Featured variants
   - Category filters

## Launch Checklist

### Week 1-2
- [ ] Database schema deployed
- [ ] Core APIs implemented
- [ ] Pricing engine tested
- [ ] Basic UI complete

### Week 3-4
- [ ] Marketplace integration
- [ ] Revenue distribution
- [ ] Publishing flow
- [ ] Search/discovery

### Week 5-6
- [ ] Analytics dashboard
- [ ] ROI tracking
- [ ] Performance optimization
- [ ] Documentation complete

### Launch Day
- [ ] Marketing materials ready
- [ ] Support team trained
- [ ] Monitoring in place
- [ ] Rollback plan prepared

## Post-Launch Roadmap

### Month 2
- Voice preview system
- Bulk variant creation
- Transfer/gift variants

### Month 3
- Limited edition variants
- Seasonal customizations
- Achievement badges

### Month 6
- Cross-variant features
- Team variants
- Advanced analytics

This implementation plan focuses on delivering a simple, valuable feature that users will understand and love, while setting the foundation for a thriving marketplace ecosystem. 