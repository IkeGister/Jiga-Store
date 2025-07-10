# Operations Design Document

## Overview

This document defines the minimal operational data required for users to interact with their agents. It separates what's already in the Product configuration from what needs to be handled server-side.

---

## 🧑 Minimal User Model

```typescript
interface User {
  // Identity (required for agent ownership)
  userId: string;
  email: string;
  
  // Agent Ownership
  ownedAgents: {
    agentInstanceId: string;     // Unique instance ID
    agentProductId: string;      // References product catalog
    purchasedAt: Date;
    currentDOFs: number;
    customName?: string;         // User's nickname for agent
  }[];
  
  // Active Session Reference
  activeSessionId?: string;
}
```

---

## 🎮 Session Configuration

What needs to be configured per session (not in product):

```typescript
interface SessionConfig {
  sessionId: string;
  userId: string;
  agentInstanceId: string;
  
  // Runtime Context
  startedAt: Date;
  gameContext?: {
    platform: "pc" | "console" | "mobile";
    gameId?: string;             // Current game being played
    streamUrl?: string;          // If streaming
  };
  
  // DOF Tracking
  startingDOFs: number;
  consumedDOFs: number;
  
  // Connection Info
  websocketId?: string;
  clientIp?: string;
  clientRegion?: string;
}
```

---

## ⚙️ Server-Side Configuration

What can't be in the product config and must be server-side:

```typescript
interface ServerConfig {
  // API Credentials (platform-owned, server-side only, never exposed to client)
  // Note: User-provided API keys not supported in current architecture
  providers: {
    gemini: {
      apiKey: string;
      endpoint: string;
    };
    google: {
      apiKey: string;
      projectId: string;
    };
    openai: {
      apiKey: string;
      organizationId: string;
    };
  };
  
  // Infrastructure Endpoints
  endpoints: {
    websocketUrl: string;
    apiBaseUrl: string;
    streamCaptureUrl?: string;
  };
  
  // Runtime Limits
  limits: {
    maxSessionsPerUser: number;   // Default: 1
    sessionTimeoutMinutes: number; // Default: 240 (4 hours)
    maxDOFsPerSession: number;     // Prevent runaway consumption
  };
  
  // Model Routing (which actual model to use per provider)
  modelRouting: {
    gemini: {
      vision: "gemini-1.5-flash",
      chat: "gemini-1.5-flash",
      embedding: "models/multimodalembedding@001"
    };
    google: {
      vision: "gemini-2.0-flash",
      chat: "gemini-2.0-flash",
      tts: "en-US-Wavenet-C"
    };
    openai: {
      vision: "gpt-4o-mini",
      chat: "gpt-4o-mini",
      tts: "tts-1"
    };
  };
}
```

---

## 📡 Request Flow

When a user makes a request:

```typescript
interface AgentRequest {
  // From User
  userId: string;
  agentInstanceId: string;
  sessionId?: string;              // New or existing session
  
  // Action
  action: "startSession" | "processFrame" | "endSession";
  
  // Payload
  data: {
    frameData?: string;            // Base64 video frame
    audioData?: string;            // Base64 audio
    instruction?: string;          // Voice instruction text
  };
}

interface ServerProcessing {
  // 1. Validate user owns agent
  // 2. Check/create session
  // 3. Check DOF balance
  // 4. Apply product config from agent
  // 5. Apply server config (API keys, limits)
  // 6. Process request
  // 7. Update DOF consumption
  // 8. Return response
}
```

---

## 🔑 Key Separation

### Already in Product Config:
- Agent capabilities (tools, features)
- Processing modes (vision modes, speed tiers)
- Voice personalities and providers
- DOF consumption rates
- Rank/tier definitions

### Needed Server-Side:
- User identity and agent ownership
- Active session management
- Actual API credentials
- Infrastructure endpoints
- Runtime limits and safety controls
- DOF balance tracking

### Not in Scope (Handled Elsewhere):
- Marketplace functionality
- Detailed analytics
- Payment processing
- Social features
- Achievement systems

---

This minimal design focuses only on what's needed to:
1. Authenticate the user
2. Verify agent ownership
3. Manage the session
4. Track DOF consumption
5. Route to correct APIs

---

## 🚀 JIGA Session Management Architecture

### Recommended File Structure

```
api/
├── jiga/                            # JIGA-specific modules
│   ├── __init__.py
│   ├── session/
│   │   ├── __init__.py
│   │   ├── session_manager.py      # Core session management
│   │   ├── session_models.py       # Pydantic models
│   │   └── firebase_client.py      # Firebase integration
│   ├── config/
│   │   ├── __init__.py
│   │   ├── agent_unwrapper.py      # Product → Session config
│   │   └── dof_tracker.py          # DOF consumption logic
│   └── coordinator/
│       ├── __init__.py
│       └── jiga_coordinator.py     # Main JIGA coordinator
```

### Core Session Manager Design

```python
# api/jiga/session/session_manager.py
from typing import Dict, Optional
from datetime import datetime, timezone
import asyncio
from firebase_admin import firestore
from .session_models import Session, SessionConfig, UserAgent
from ..config.agent_unwrapper import unwrap_agent_to_config

class JigaSessionManager:
    """Centralized session management for JIGA agents"""
    
    def __init__(self):
        self._sessions: Dict[str, Session] = {}
        self._locks: Dict[str, asyncio.Lock] = {}
        self.db = firestore.client()
    
    async def create_session(self, user_id: str, agent_instance_id: str) -> Session:
        """Create a new session after validating ownership"""
        
        # 1. Validate user owns agent
        user_agent = await self._validate_ownership(user_id, agent_instance_id)
        
        # 2. Check DOF balance
        if user_agent.current_dofs <= 0:
            raise ValueError("Insufficient DOFs. Please renew agent contract.")
        
        # 3. Fetch agent product configuration from Firebase
        agent_product = await self._fetch_agent_product(user_agent.agent_product_id)
        
        # 4. Unwrap product config to session config
        session_config = unwrap_agent_to_config(agent_product, self._get_server_config())
        
        # 5. Create session
        session = Session(
            session_id=self._generate_session_id(),
            user_id=user_id,
            agent_instance_id=agent_instance_id,
            agent_product_id=user_agent.agent_product_id,
            config=session_config,
            started_at=datetime.now(timezone.utc),
            starting_dofs=user_agent.current_dofs,
            consumed_dofs=0
        )
        
        # 6. Store session
        async with self._get_lock(session.session_id):
            self._sessions[session.session_id] = session
            
        return session
    
    async def get_session(self, session_id: str) -> Optional[Session]:
        """Get active session"""
        return self._sessions.get(session_id)
    
    async def update_dof_consumption(self, session_id: str, dofs_consumed: int):
        """Track DOF consumption in real-time"""
        async with self._get_lock(session_id):
            session = self._sessions.get(session_id)
            if not session:
                return
                
            session.consumed_dofs += dofs_consumed
            
            # Update Firebase if significant consumption
            if session.consumed_dofs % 1000 == 0:  # Every 1000 DOFs
                await self._update_user_dof_balance(
                    session.user_id, 
                    session.agent_instance_id,
                    session.consumed_dofs
                )
    
    async def end_session(self, session_id: str):
        """Finalize session and update DOF balance"""
        async with self._get_lock(session_id):
            session = self._sessions.pop(session_id, None)
            if not session:
                return
                
            # Final DOF update in Firebase
            await self._update_user_dof_balance(
                session.user_id,
                session.agent_instance_id, 
                session.consumed_dofs
            )
    
    # Firebase integration methods
    async def _validate_ownership(self, user_id: str, agent_instance_id: str) -> UserAgent:
        """Check Firebase that user owns this agent instance"""
        user_doc = self.db.collection('users').document(user_id).get()
        if not user_doc.exists:
            raise ValueError("User not found")
            
        owned_agents = user_doc.to_dict().get('ownedAgents', [])
        for agent in owned_agents:
            if agent['agentInstanceId'] == agent_instance_id:
                return UserAgent(**agent)
                
        raise ValueError("Agent not owned by user")
    
    async def _fetch_agent_product(self, agent_product_id: str):
        """Fetch agent product configuration from Firebase"""
        product_doc = self.db.collection('products').document(agent_product_id).get()
        if not product_doc.exists:
            raise ValueError(f"Agent product {agent_product_id} not found")
            
        return product_doc.to_dict()
```

### Session Models

```python
# api/jiga/session/session_models.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any

class UserAgent(BaseModel):
    """User's owned agent instance"""
    agent_instance_id: str
    agent_product_id: str
    purchased_at: datetime
    current_dofs: int
    custom_name: Optional[str] = None

class SessionConfig(BaseModel):
    """Runtime configuration for session"""
    # From product unwrapping
    provider: str
    voice_id: str
    high_speed_vision: bool
    high_speed_mode: Optional[str]
    toolkit: list[str]
    
    # Server-side additions
    api_key: str  # Selected based on provider
    endpoints: Dict[str, str]
    model_routing: Dict[str, str]

class Session(BaseModel):
    """Active session state"""
    session_id: str
    user_id: str
    agent_instance_id: str
    agent_product_id: str
    
    config: SessionConfig
    started_at: datetime
    
    # DOF tracking
    starting_dofs: int
    consumed_dofs: int
    
    # Runtime state
    websocket_id: Optional[str] = None
    game_context: Optional[Dict[str, Any]] = None
```

### Request Flow

```python
# api/main.py - JIGA endpoints
from jiga.session.session_manager import JigaSessionManager
from jiga.coordinator.jiga_coordinator import JigaCoordinator

session_manager = JigaSessionManager()

@app.post("/api/jiga/session/start")
async def start_jiga_session(request: StartSessionRequest):
    """
    Flow:
    1. Request → Validate user/agent
    2. Configuration → Pull from Firebase + unwrap
    3. Connection → Create session + return config
    """
    try:
        # Create session
        session = await session_manager.create_session(
            user_id=request.user_id,
            agent_instance_id=request.agent_instance_id
        )
        
        # Initialize coordinator with session config
        coordinator = JigaCoordinator(session)
        
        return {
            "session_id": session.session_id,
            "websocket_url": f"/ws/jiga/{session.session_id}",
            "config": session.config.dict(),
            "remaining_dofs": session.starting_dofs
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.websocket("/ws/jiga/{session_id}")
async def jiga_websocket(websocket: WebSocket, session_id: str):
    """WebSocket connection for real-time interaction"""
    session = await session_manager.get_session(session_id)
    if not session:
        await websocket.close(code=4004, reason="Session not found")
        return
        
    coordinator = JigaCoordinator(session)
    await coordinator.handle_websocket(websocket, session_manager)
```

### Agent Unwrapper

```python
# api/jiga/config/agent_unwrapper.py
def unwrap_agent_to_config(agent_product: dict, server_config: dict) -> dict:
    """Convert product definition to runtime session config"""
    
    provider = agent_product['provider']
    rank_config = RANK_DEFINITIONS[agent_product['rank']]
    
    return {
        # From product
        'provider': provider,
        'voice_id': agent_product['voiceId'],
        'high_speed_vision': rank_config['systemConfig']['high_speed_vision'],
        'high_speed_mode': rank_config['systemConfig'].get('high_speed_mode'),
        'toolkit': agent_product['toolkit'],
        
        # Voice/audio config
        'voice_enabled': agent_product['hasVoiceChat'] or agent_product['hasCommentator'],
        'interactive_voice_mode': agent_product['hasVoiceChat'],
        'commentary_mode': agent_product['hasCommentator'],
        'has_memory': agent_product['hasMemory'],
        
        # From server config
        'api_key': server_config['providers'][provider]['apiKey'],
        'endpoints': server_config['endpoints'],
        'model_routing': server_config['modelRouting'][provider],
        
        # Specialist config if applicable
        **(agent_product.get('specialization') or {})
    }
```

### Why This Architecture?

1. **Centralized Session Management**: Single source of truth for all active sessions
2. **Firebase Integration**: Clean separation between Firebase operations and session logic
3. **Scalable**: Can easily add Redis for distributed session storage later
4. **Type Safety**: Pydantic models ensure data consistency
5. **DOF Tracking**: Real-time consumption tracking with periodic Firebase updates
6. **Provider Agnostic**: Easy to switch between Gemini/Google/OpenAI based on product config

### Session Flow Diagram

```
User Request
    ↓
Validate Ownership (Firebase)
    ↓
Check DOF Balance
    ↓
Fetch Agent Product (Firebase)
    ↓
Unwrap Configuration
    ↓
Create Session
    ↓
Return WebSocket URL
    ↓
Real-time Interaction (WebSocket)
    ↓
Track DOF Consumption
    ↓
End Session & Update Firebase
```

This architecture keeps JIGA clean and separate from the prototype code while maintaining the flexibility to scale.
