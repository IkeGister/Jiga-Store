# JIGA Store Service Interfaces

## 📡 API Contract Specifications

### Agent Service API

#### Create Agent
```typescript
POST /api/v1/agents

Request:
{
  "name": string,                    // Required, 3-50 chars
  "rank": "Bronze" | "Silver" | "Gold" | "Platinum",
  "type": "Assistant" | "Mentor" | "Specialist",
  "provider": "gemini" | "google" | "openai",
  "nationality": string,
  "language": string,               // ISO 639-1 code
  "voiceId": string,
  "features": {
    "hasVoiceChat": boolean,
    "hasCommentator": boolean,
    "hasMemory": boolean
  },
  "toolkit": string[],              // Array of tool IDs
  "specialization"?: {              // Required for Specialists
    "games": string[],
    "focus": string,
    "specialistType": "Trained" | "Experience"
  }
}

Response: 201 Created
{
  "id": string,
  "ownerId": string,
  "name": string,
  "rank": string,
  "type": string,
  "imageUrl": string,
  "configuration": {
    // Full configuration object
  },
  "marketplaceStatus": {
    "isPublished": false,
    "isHirable": false
  },
  "createdAt": string,              // ISO 8601
  "updatedAt": string
}

Errors:
400 - Invalid input data
401 - Unauthorized
402 - Insufficient DOFs for agent creation
409 - Agent name already exists for user
```

#### Update Agent Configuration
```typescript
PUT /api/v1/agents/{agentId}/config

Request:
{
  "configuration": {
    "high_speed_vision": boolean,
    "high_speed_mode"?: "ultra_fast" | "balanced" | "quality_focused",
    "target_fps"?: number,           // 1.0-10.0
    "analysis_interval"?: number,    // 0.1-2.0
    "max_concurrent_analyses"?: number, // 1-20
    "voice_enabled"?: boolean,
    "selected_voice_name"?: string,
    "team_messaging"?: {
      "enabled": boolean,
      "propagation_mode": "real_time" | "broadcast" | "targeted"
    },
    // ... other configuration options
  }
}

Response: 200 OK
{
  "agentId": string,
  "configuration": {
    // Updated configuration
  },
  "validationWarnings": string[],   // Non-blocking issues
  "updatedAt": string
}

Errors:
400 - Invalid configuration
401 - Unauthorized
403 - Not agent owner
404 - Agent not found
422 - Configuration validation failed
```

#### Publish to Marketplace
```typescript
POST /api/v1/agents/{agentId}/publish

Request:
{
  "listing": {
    "title": string,                // Max 100 chars
    "description": string,          // Max 1000 chars
    "tags": string[],               // Max 10 tags
    "category": string[],           // From allowed categories
    "pricing": {
      "hourly": number,             // In DOFs
      "daily": number,              // In DOFs
      "weekly": number              // In DOFs
    },
    "availability": {
      "schedule": "always" | "scheduled",
      "hours"?: {                   // If scheduled
        "monday": { "start": string, "end": string },
        // ... other days
      },
      "timezone": string            // IANA timezone
    }
  }
}

Response: 200 OK
{
  "agentId": string,
  "listingId": string,
  "marketplaceUrl": string,
  "status": "active" | "pending_review",
  "publishedAt": string
}

Errors:
400 - Invalid listing data
401 - Unauthorized
403 - Agent not eligible for marketplace
404 - Agent not found
422 - Pricing validation failed
```

### Marketplace Service API

#### Search Marketplace
```typescript
GET /api/v1/marketplace/search

Query Parameters:
- q: string                         // Search query
- game: string[]                    // Filter by games
- rank: string[]                    // Filter by ranks
- type: string[]                    // Filter by types
- minPrice: number                  // Min DOF price
- maxPrice: number                  // Max DOF price
- hasVoiceChat: boolean
- hasCommentator: boolean
- specialization: string[]
- minRating: number                 // 1-5
- sortBy: "relevance" | "price_asc" | "price_desc" | "rating" | "popular"
- page: number                      // Default 1
- limit: number                     // Default 20, max 100

Response: 200 OK
{
  "results": [{
    "listingId": string,
    "agentId": string,
    "agent": {
      "name": string,
      "imageUrl": string,
      "rank": string,
      "type": string,
      "nationality": string
    },
    "title": string,
    "description": string,
    "pricing": {
      "hourly": number,
      "daily": number,
      "weekly": number
    },
    "stats": {
      "rating": number,
      "totalHires": number,
      "successRate": number
    },
    "badges": [{
      "name": string,
      "imageUrl": string,
      "specializations": string[]
    }],
    "availability": {
      "isAvailable": boolean,
      "nextAvailable": string       // ISO 8601
    }
  }],
  "pagination": {
    "page": number,
    "limit": number,
    "total": number,
    "hasMore": boolean
  },
  "facets": {
    "games": { [key: string]: number },
    "ranks": { [key: string]: number },
    "priceRanges": { [key: string]: number }
  }
}
```

#### Hire Agent
```typescript
POST /api/v1/marketplace/{listingId}/hire

Request:
{
  "dofAllocation": number,          // DOFs to allocate for this contract
  "startTime": string,              // ISO 8601, optional (default: now)
  "configuration"?: {               // Session-specific overrides
    "high_speed_vision"?: boolean,
    "voice_enabled"?: boolean
    // Limited configuration options
  },
  "message"?: string                // Message to agent owner
}

Response: 201 Created
{
  "sessionId": string,
  "agentId": string,
  "contract": {
    "dofAllocated": number,
    "estimatedHours": number,       // Based on agent's base rate
    "baseRate": number,             // Agent's DOF consumption rate
    "startedAt": string
  },
  "transaction": {
    "id": string,
    "status": "completed",
    "dofAmount": number,
    "distribution": {
      "owner": number,              // 70% of DOFs
      "platform": number,           // 25% of DOFs  
      "creator": number             // 5% of DOFs
    }
  },
  "accessToken": string,            // For session connection
  "sessionUrl": string
}

Errors:
400 - Invalid hire request
401 - Unauthorized
402 - Insufficient DOFs
403 - Agent not available
404 - Listing not found
409 - Scheduling conflict
```

### Transaction Service API

#### Purchase DOFs
```typescript
POST /api/v1/transactions/purchase

Request:
{
  "package": "bronze" | "silver" | "gold" | "platinum" | "custom",
  "amount"?: number,                // For custom packages
  "paymentMethod": "shopify" | "stripe",
  "returnUrl": string               // Redirect after payment
}

Response: 200 OK
{
  "transactionId": string,
  "checkoutUrl": string,            // Redirect user here
  "amount": number,
  "currency": "USD",
  "dofAmount": number,
  "expiresAt": string               // Checkout expiration
}
```

#### Transfer DOFs
```typescript
POST /api/v1/transactions/transfer

Request:
{
  "toUserId": string,               // Recipient user ID
  "amount": number,                 // DOFs to transfer
  "note"?: string                   // Optional message
}

Response: 200 OK
{
  "transactionId": string,
  "from": {
    "userId": string,
    "previousBalance": number,
    "newBalance": number
  },
  "to": {
    "userId": string,
    "previousBalance": number,
    "newBalance": number
  },
  "fee": number,                    // Platform fee (10%)
  "completedAt": string
}

Errors:
400 - Invalid transfer amount
401 - Unauthorized
402 - Insufficient DOFs
404 - Recipient not found
422 - Cannot transfer to self
```

### Session Service API

#### Start Session
```typescript
POST /api/v1/sessions

Request:
{
  "agentId": string,
  "type": "owned" | "hired" | "trial",
  "hireSessionId"?: string,         // If type is "hired"
  "configuration"?: {
    // Session-specific configuration
  }
}

Response: 201 Created
{
  "sessionId": string,
  "agentId": string,
  "type": string,
  "status": "active",
  "connection": {
    "websocketUrl": string,
    "token": string,
    "protocols": ["ws", "wss"]
  },
  "dof": {
    "allocated": number,
    "consumed": 0,
    "remaining": number
  },
  "expiresAt": string
}
```

#### Session WebSocket Protocol
```typescript
// Connection
const ws = new WebSocket('wss://ws.jigastore.com/session/{sessionId}', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Client -> Server Messages
interface ClientMessage {
  type: "voice_input" | "text_input" | "config_update" | "end_session";
  data: any;
  timestamp: string;
}

// Server -> Client Messages
interface ServerMessage {
  type: "agent_response" | "dof_update" | "event_detected" | "error" | "session_ended";
  data: any;
  timestamp: string;
}

// Message Examples

// Voice Input
{
  "type": "voice_input",
  "data": {
    "audio": "base64_encoded_audio",
    "format": "webm",
    "duration": 2.5
  },
  "timestamp": "2024-01-15T10:30:00Z"
}

// Agent Response
{
  "type": "agent_response",
  "data": {
    "text": "I see you're in a tough spot. Try flanking from the left.",
    "audio": "base64_encoded_response",
    "emotion": "encouraging",
    "dofConsumed": 150
  },
  "timestamp": "2024-01-15T10:30:02Z"
}

// DOF Update
{
  "type": "dof_update",
  "data": {
    "consumed": 1250,
    "remaining": 148750,
    "rate": 250, // DOFs per minute
    "estimatedTimeRemaining": 595 // minutes
  },
  "timestamp": "2024-01-15T10:35:00Z"
}
```

## 🔧 SDK Integration Examples

### JavaScript/TypeScript SDK

```typescript
import { JIGAStore } from '@jiga/store-sdk';

// Initialize client
const store = new JIGAStore({
  apiKey: process.env.JIGA_API_KEY,
  environment: 'production'
});

// Agent Management
class AgentManager {
  async createAgent(config: AgentConfig): Promise<Agent> {
    try {
      const agent = await store.agents.create({
        name: config.name,
        rank: 'Silver',
        type: 'Mentor',
        provider: 'gemini',
        nationality: 'American',
        language: 'en-US',
        voiceId: 'us_male_algenib',
        features: {
          hasVoiceChat: true,
          hasCommentator: false,
          hasMemory: true
        },
        toolkit: ['learn', 'observation', 'voice_instruction']
      });
      
      console.log(`Agent created: ${agent.id}`);
      return agent;
    } catch (error) {
      if (error.code === 'INSUFFICIENT_DOFS') {
        throw new Error('Not enough DOFs to create agent');
      }
      throw error;
    }
  }
  
  async publishToMarketplace(agentId: string): Promise<MarketplaceListing> {
    const listing = await store.agents.publish(agentId, {
      title: 'Expert FPS Coach - Silver Mentor',
      description: 'Personalized coaching for FPS games...',
      tags: ['fps', 'coaching', 'tactical', 'voice-enabled'],
      category: ['Gaming', 'Mentors'],
      pricing: {
        hourly: 5000,    // DOFs
        daily: 100000,   // 20% discount
        weekly: 500000   // 30% discount
      }
    });
    
    return listing;
  }
}

// Marketplace Integration
class MarketplaceClient {
  async searchAgents(query: SearchQuery): Promise<SearchResults> {
    const results = await store.marketplace.search({
      q: query.searchTerm,
      game: ['Call of Duty'],
      rank: ['Gold', 'Platinum'],
      hasVoiceChat: true,
      minRating: 4.0,
      sortBy: 'rating',
      limit: 20
    });
    
    return results;
  }
  
  async hireAgent(listingId: string, dofAmount: number): Promise<Session> {
    const session = await store.marketplace.hire(listingId, {
      dofAllocation: dofAmount,      // e.g., 100000 DOFs
      configuration: {
        high_speed_vision: true,
        voice_enabled: true
      }
    });
    
    // Connect to session
    await this.connectToSession(session);
    
    return session;
  }
  
  private async connectToSession(session: Session): Promise<void> {
    const connection = store.sessions.connect(session.id, {
      onMessage: (message) => {
        console.log('Agent:', message.data.text);
      },
      onDofUpdate: (update) => {
        console.log(`DOFs remaining: ${update.remaining}`);
      },
      onError: (error) => {
        console.error('Session error:', error);
      }
    });
    
    // Send voice input
    await connection.sendVoice(audioBuffer);
    
    // Send text input
    await connection.sendText('What should I do next?');
  }
}

// Transaction Management
class TransactionManager {
  async purchaseDOFs(packageType: string): Promise<void> {
    const checkout = await store.transactions.purchase({
      package: packageType,
      returnUrl: window.location.href
    });
    
    // Redirect to payment
    window.location.href = checkout.checkoutUrl;
  }
  
  async checkBalance(): Promise<WalletBalance> {
    const wallet = await store.user.getWallet();
    console.log(`Current balance: ${wallet.balance} DOFs`);
    return wallet;
  }
  
  async transferDOFs(recipientId: string, amount: number): Promise<void> {
    try {
      const result = await store.transactions.transfer({
        toUserId: recipientId,
        amount: amount,
        note: 'Gift for team member'
      });
      
      console.log(`Transferred ${amount} DOFs. New balance: ${result.from.newBalance}`);
    } catch (error) {
      if (error.code === 'INSUFFICIENT_DOFS') {
        throw new Error('Not enough DOFs for transfer');
      }
      throw error;
    }
  }
}
```

### Python SDK

```python
from jiga_store import JIGAStore
from jiga_store.exceptions import InsufficientDOFsError
import asyncio

# Initialize client
store = JIGAStore(
    api_key=os.environ['JIGA_API_KEY'],
    environment='production'
)

class AgentManager:
    async def create_mentor(self, name: str) -> Agent:
        """Create a new mentor agent"""
        try:
            agent = await store.agents.create({
                'name': name,
                'rank': 'Silver',
                'type': 'Mentor',
                'provider': 'google',
                'nationality': 'British',
                'language': 'en-GB',
                'voiceId': 'uk_male',
                'features': {
                    'hasVoiceChat': True,
                    'hasCommentator': False,
                    'hasMemory': True
                },
                'toolkit': ['learn', 'general_gaming', 'voice_instruction']
            })
            
            print(f"Created agent: {agent.id}")
            return agent
            
        except InsufficientDOFsError:
            print("Not enough DOFs to create agent")
            raise

    async def monitor_progression(self, agent_id: str):
        """Monitor agent progression and achievements"""
        async for event in store.agents.stream_events(agent_id):
            if event.type == 'achievement_earned':
                achievement = event.data
                print(f"Achievement earned: {achievement.name}")
                
                # Check if eligible for marketplace
                if achievement.type == 'Experience Specialist':
                    await self.prompt_marketplace_listing(agent_id)

class SessionManager:
    def __init__(self):
        self.active_sessions = {}
    
    async def start_session(self, agent_id: str) -> Session:
        """Start a new agent session"""
        session = await store.sessions.create({
            'agentId': agent_id,
            'type': 'owned',
            'configuration': {
                'high_speed_vision': True,
                'voice_enabled': True
            }
        })
        
        # Connect to session WebSocket
        connection = await store.sessions.connect(
            session.id,
            on_message=self.handle_message,
            on_dof_update=self.handle_dof_update,
            on_error=self.handle_error
        )
        
        self.active_sessions[session.id] = connection
        return session
    
    async def handle_message(self, session_id: str, message: dict):
        """Handle agent messages"""
        if message['type'] == 'agent_response':
            print(f"Agent: {message['data']['text']}")
            
            # Play audio response if available
            if 'audio' in message['data']:
                await self.play_audio(message['data']['audio'])
    
    async def handle_dof_update(self, session_id: str, update: dict):
        """Handle DOF consumption updates"""
        remaining = update['remaining']
        rate = update['rate']
        
        print(f"DOFs remaining: {remaining} (consuming {rate}/min)")
        
        # Alert if running low
        if remaining < 10000:
            print("WARNING: DOF balance running low!")
```

### Unity SDK

```csharp
using JIGAStore;
using UnityEngine;
using System.Threading.Tasks;

public class JIGAStoreManager : MonoBehaviour
{
    private JIGAStoreClient client;
    private Session currentSession;
    
    async void Start()
    {
        // Initialize client
        client = new JIGAStoreClient(
            apiKey: PlayerPrefs.GetString("JIGA_API_KEY"),
            environment: Environment.Production
        );
        
        // Authenticate user
        await AuthenticateUser();
    }
    
    private async Task AuthenticateUser()
    {
        try
        {
            var user = await client.Auth.LoginWithFirebase(firebaseToken);
            Debug.Log($"Logged in as: {user.DisplayName}");
            
            // Check DOF balance
            var wallet = await client.User.GetWallet();
            UpdateDOFDisplay(wallet.Balance);
        }
        catch (Exception e)
        {
            Debug.LogError($"Authentication failed: {e.Message}");
        }
    }
    
    public async Task<Agent> CreateGameAssistant(string name, AgentRank rank)
    {
        var agent = await client.Agents.Create(new CreateAgentRequest
        {
            Name = name,
            Rank = rank,
            Type = AgentType.Assistant,
            Provider = "openai",
            Nationality = "American",
            Language = "en-US",
            VoiceId = "nova",
            Features = new AgentFeatures
            {
                HasVoiceChat = true,
                HasCommentator = false,
                HasMemory = false
            },
            Toolkit = new[] { "observation", "event_detection", "voice_instruction" }
        });
        
        Debug.Log($"Created agent: {agent.Name} ({agent.Id})");
        return agent;
    }
    
    public async Task StartAgentSession(string agentId)
    {
        try
        {
            // Start session
            currentSession = await client.Sessions.Create(new CreateSessionRequest
            {
                AgentId = agentId,
                Type = SessionType.Owned,
                Configuration = new SessionConfig
                {
                    HighSpeedVision = true,
                    VoiceEnabled = true,
                    TargetFPS = 5.0f
                }
            });
            
            // Connect WebSocket
            var connection = await client.Sessions.Connect(currentSession.Id);
            
            // Set up event handlers
            connection.OnAgentResponse += HandleAgentResponse;
            connection.OnDofUpdate += HandleDofUpdate;
            connection.OnEventDetected += HandleGameEvent;
            
            Debug.Log($"Session started: {currentSession.Id}");
        }
        catch (InsufficientDOFsException)
        {
            ShowPurchaseDialog();
        }
    }
    
    private void HandleAgentResponse(AgentResponse response)
    {
        // Display text
        ShowAgentText(response.Text);
        
        // Play audio
        if (response.Audio != null)
        {
            PlayAgentAudio(response.Audio);
        }
    }
    
    private void HandleGameEvent(GameEvent gameEvent)
    {
        Debug.Log($"Event detected: {gameEvent.Type} at {gameEvent.Location}");
        
        switch (gameEvent.Type)
        {
            case "kill":
                ShowKillNotification(gameEvent.Data);
                break;
            case "objective":
                HighlightObjective(gameEvent.Data);
                break;
        }
    }
    
    public async Task<SearchResults> BrowseMarketplace(string game)
    {
        var results = await client.Marketplace.Search(new SearchQuery
        {
            Game = new[] { game },
            Rank = new[] { AgentRank.Gold, AgentRank.Platinum },
            HasVoiceChat = true,
            MinRating = 4.0f,
            SortBy = SortOrder.Rating,
            Limit = 20
        });
        
        foreach (var listing in results.Results)
        {
            Debug.Log($"{listing.Title} - {listing.Pricing.Hourly} DOFs/hour");
        }
        
        return results;
    }
}

// Voice Integration
public class VoiceManager : MonoBehaviour
{
    private Microphone microphone;
    private SessionConnection connection;
    
    public async Task SendVoiceInput(AudioClip clip)
    {
        // Convert to supported format
        var audioData = ConvertToWebM(clip);
        
        // Send to agent
        await connection.SendVoice(new VoiceInput
        {
            Audio = audioData,
            Format = AudioFormat.WebM,
            Duration = clip.length
        });
    }
    
    private void OnVoiceResponse(byte[] audioData)
    {
        // Convert and play
        var clip = ConvertFromBase64(audioData);
        audioSource.PlayOneShot(clip);
    }
}
```

## 🔌 Webhook Integration

### Shopify Webhooks

```typescript
// Webhook Handler Service
export class ShopifyWebhookHandler {
  private readonly logger = new Logger('ShopifyWebhook');
  
  // Webhook endpoint
  async handleWebhook(req: Request, res: Response) {
    const { topic, shop, apiVersion } = req.headers;
    const verified = this.verifyWebhook(req);
    
    if (!verified) {
      return res.status(401).send('Unauthorized');
    }
    
    try {
      switch (topic) {
        case 'orders/paid':
          await this.handleOrderPaid(req.body);
          break;
        case 'orders/cancelled':
          await this.handleOrderCancelled(req.body);
          break;
        case 'refunds/create':
          await this.handleRefundCreated(req.body);
          break;
        default:
          this.logger.warn(`Unhandled webhook topic: ${topic}`);
      }
      
      res.status(200).send('OK');
    } catch (error) {
      this.logger.error('Webhook processing failed', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  private async handleOrderPaid(order: ShopifyOrder) {
    // Extract DOF package from order
    const dofPackage = this.extractDOFPackage(order);
    if (!dofPackage) return;
    
    // Find user by email
    const user = await this.userService.findByEmail(order.email);
    if (!user) {
      // Create pending credit
      await this.createPendingCredit(order);
      return;
    }
    
    // Credit DOFs to user
    await this.transactionService.creditDOFs({
      userId: user.id,
      amount: dofPackage.dofAmount,
      source: 'shopify',
      externalReference: order.id,
      metadata: {
        orderNumber: order.order_number,
        packageType: dofPackage.type
      }
    });
    
    // Send confirmation
    await this.notificationService.sendDOFPurchaseConfirmation(user, dofPackage);
  }
  
  private verifyWebhook(req: Request): boolean {
    const hmac = req.get('X-Shopify-Hmac-Sha256');
    const body = req.rawBody;
    const hash = crypto
      .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
      .update(body, 'utf8')
      .digest('base64');
    
    return hash === hmac;
  }
}
```

### Event Stream Integration

```typescript
// Server-Sent Events for Real-time Updates
export class EventStreamService {
  private clients: Map<string, Response> = new Map();
  
  // SSE endpoint
  async streamEvents(req: Request, res: Response) {
    const userId = req.user.id;
    
    // Set SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });
    
    // Store client connection
    this.clients.set(userId, res);
    
    // Send initial connection event
    this.sendEvent(res, {
      type: 'connected',
      data: { userId, timestamp: new Date() }
    });
    
    // Handle client disconnect
    req.on('close', () => {
      this.clients.delete(userId);
    });
  }
  
  // Send event to specific user
  sendUserEvent(userId: string, event: any) {
    const client = this.clients.get(userId);
    if (client) {
      this.sendEvent(client, event);
    }
  }
  
  // Broadcast to all connected clients
  broadcast(event: any) {
    this.clients.forEach(client => {
      this.sendEvent(client, event);
    });
  }
  
  private sendEvent(res: Response, event: any) {
    res.write(`id: ${Date.now()}\n`);
    res.write(`event: ${event.type}\n`);
    res.write(`data: ${JSON.stringify(event.data)}\n\n`);
  }
}

// Client-side SSE consumption
const eventSource = new EventSource('/api/v1/events/stream');

eventSource.addEventListener('dof_update', (event) => {
  const data = JSON.parse(event.data);
  updateDOFDisplay(data.balance);
});

eventSource.addEventListener('agent_hired', (event) => {
  const data = JSON.parse(event.data);
  showNotification(`Your agent ${data.agentName} was hired!`);
});

eventSource.addEventListener('achievement_earned', (event) => {
  const data = JSON.parse(event.data);
  showAchievementPopup(data);
});
```

## 🧪 Testing Strategies

### API Testing

```typescript
// Integration Tests
describe('Agent Service API', () => {
  let apiClient: JIGAStoreClient;
  let testUser: TestUser;
  let testAgent: Agent;
  
  beforeAll(async () => {
    apiClient = new JIGAStoreClient({
      apiKey: process.env.TEST_API_KEY,
      environment: 'test'
    });
    
    testUser = await createTestUser();
    await apiClient.auth.login(testUser.credentials);
  });
  
  describe('POST /agents', () => {
    it('should create a new agent with valid data', async () => {
      const agentData = {
        name: 'Test Agent',
        rank: 'Bronze',
        type: 'Assistant',
        provider: 'gemini',
        nationality: 'American',
        language: 'en-US',
        voiceId: 'us_male',
        features: {
          hasVoiceChat: false,
          hasCommentator: false,
          hasMemory: false
        },
        toolkit: ['observation']
      };
      
      const response = await apiClient.agents.create(agentData);
      
      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        id: expect.any(String),
        name: agentData.name,
        rank: agentData.rank,
        type: agentData.type,
        ownerId: testUser.id
      });
      
      testAgent = response.data;
    });
    
    it('should reject invalid agent configuration', async () => {
      const invalidData = {
        name: 'Invalid',
        rank: 'Diamond', // Invalid rank
        type: 'Assistant'
      };
      
      await expect(apiClient.agents.create(invalidData))
        .rejects.toThrow('Invalid rank: Diamond');
    });
    
    it('should enforce DOF requirements', async () => {
      // Drain test user's DOFs
      await drainUserDOFs(testUser.id);
      
      await expect(apiClient.agents.create(validAgentData))
        .rejects.toThrow('Insufficient DOFs');
    });
  });
  
  describe('Marketplace Integration', () => {
    beforeAll(async () => {
      // Create and publish test agent
      testAgent = await createAndPublishTestAgent();
    });
    
    it('should search marketplace with filters', async () => {
      const results = await apiClient.marketplace.search({
        rank: ['Bronze'],
        type: ['Assistant'],
        hasVoiceChat: false
      });
      
      expect(results.results).toContainEqual(
        expect.objectContaining({
          agentId: testAgent.id
        })
      );
    });
    
    it('should hire agent and start session', async () => {
      const hire = await apiClient.marketplace.hire(testAgent.listingId, {
        duration: { type: 'hourly', value: 1 }
      });
      
      expect(hire.sessionId).toBeDefined();
      expect(hire.dofCost).toBe(5000); // 1 hour at base rate
      
      // Verify session is active
      const session = await apiClient.sessions.get(hire.sessionId);
      expect(session.status).toBe('active');
    });
  });
});
```

### Load Testing

```yaml
# k6 load test script
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 },   // Ramp up
    { duration: '10m', target: 100 },  // Stay at 100 users
    { duration: '5m', target: 500 },   // Spike to 500
    { duration: '10m', target: 500 },  // Maintain spike
    { duration: '5m', target: 0 },     // Ramp down
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% under 500ms
    'http_req_failed': ['rate<0.1'],    // Error rate under 10%
  },
};

const BASE_URL = 'https://api.jigastore.com/v1';

export default function () {
  // Search marketplace
  const searchRes = http.get(`${BASE_URL}/marketplace/search?rank=Gold&limit=10`);
  check(searchRes, {
    'search status is 200': (r) => r.status === 200,
    'search returns results': (r) => JSON.parse(r.body).results.length > 0,
  });
  
  sleep(1);
  
  // Get agent details
  const agents = JSON.parse(searchRes.body).results;
  if (agents.length > 0) {
    const agentRes = http.get(`${BASE_URL}/agents/${agents[0].agentId}`);
    check(agentRes, {
      'agent status is 200': (r) => r.status === 200,
    });
  }
  
  sleep(1);
}
```

## 📚 Error Handling

### Standard Error Responses

```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
    requestId: string;
  };
}

// Error Codes
enum ErrorCodes {
  // Authentication Errors (401)
  UNAUTHORIZED = 'UNAUTHORIZED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_API_KEY = 'INVALID_API_KEY',
  
  // Authorization Errors (403)
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  NOT_AGENT_OWNER = 'NOT_AGENT_OWNER',
  
  // Validation Errors (400)
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_CONFIGURATION = 'INVALID_CONFIGURATION',
  
  // Business Logic Errors (422)
  INSUFFICIENT_DOFS = 'INSUFFICIENT_DOFS',
  AGENT_NOT_ELIGIBLE = 'AGENT_NOT_ELIGIBLE',
  SCHEDULING_CONFLICT = 'SCHEDULING_CONFLICT',
  
  // Not Found Errors (404)
  AGENT_NOT_FOUND = 'AGENT_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  
  // Rate Limiting (429)
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Server Errors (500)
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

// Error Examples
{
  "error": {
    "code": "INSUFFICIENT_DOFS",
    "message": "Not enough DOFs to complete this action. Required: 5000, Available: 2500",
    "details": {
      "required": 5000,
      "available": 2500,
      "shortfall": 2500
    },
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Status**: Service Interface Specification 