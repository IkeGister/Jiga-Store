# JIGA AI Product Configuration Architecture

## Overview
This document catalogs all toggleable configurations within the JIGA AI system to enable configuration-driven product development. These settings will be organized into product wrappers that define different market offerings through configuration packages.

## 🎯 Configuration Categories

### 1. **High-Speed Vision Configuration**
#### Core Performance Settings
- `high_speed_vision` (boolean) - Enable/disable high-speed vision processing
- `high_speed_mode` (enum) - Performance mode selection
  - `"ultra_fast"` - 5 FPS, 0.3s analysis, 15 max concurrent
  - `"balanced"` - 5 FPS, 0.5s analysis, 10 max concurrent  
  - `"quality_focused"` - 3 FPS, 1.0s analysis, 5 max concurrent

#### Advanced Performance Tuning
- `target_fps` (float) - Target frames per second (1.0-10.0)
- `analysis_interval` (float) - Seconds between analyses (0.1-2.0)
- `max_concurrent_analyses` (integer) - Maximum parallel processing (1-20)
- `compression_level` (enum) - Image compression strategy
  - `"none"` - No compression
  - `"light"` - Basic compression
  - `"aggressive"` - Maximum compression
  - `"maximum"` - Ultra compression for mobile
- `result_caching` (boolean) - Enable result caching for performance
- `batch_processing` (boolean) - Enable batch frame processing
- `target_resolution` (string) - Target frame resolution ("720p", "1080p", "4K")
- `jpeg_quality` (integer) - JPEG compression quality (1-100)

#### Session Behavior
- `immutable_after_creation` (boolean) - Lock configuration after session creation
- `session_locked` (boolean) - Current lock status

### 2. **Agent Core Configuration**
#### Identity & Permissions
- `user_id` (string) - User identifier
- `is_admin` (boolean) - Administrative privileges
- `permissions` (enum) - Permission level
  - `"read_only"` - View only access
  - `"configure"` - Configuration access
  - `"admin"` - Full administrative access

#### Agent Behavior
- `agent_name` (string) - Agent identifier ("jiga-ai", "dross", "shade")
- `enabled` (boolean) - Agent activation status
- `model_provider` (enum) - AI model provider
  - `"openai"` - OpenAI GPT models
  - `"gemini"` - Google Gemini models
  - `"google"` - Google AI models
  - `"mock"` - Mock models for testing
- `selected_voice_name` (string) - Voice synthesis selection
- `voice_enabled` (boolean) - Enable voice output

### 3. **Session Management**
#### Session Preferences
- `analysis_type` (enum) - Analysis depth
  - `"real_time"` - Immediate analysis
  - `"comprehensive"` - Deep analysis
  - `"speed_optimized"` - Performance focused
  - `"detailed"` - Maximum detail
  - `"standard"` - Balanced approach
- `notification_level` (enum) - Alert frequency
  - `"minimal"` - Essential only
  - `"moderate"` - Balanced notifications
  - `"high"` - Frequent updates
  - `"maximum"` - All notifications
- `event_logging` (enum) - Logging detail level
  - `"minimal"` - Basic logging
  - `"standard"` - Normal logging
  - `"detailed"` - Verbose logging
  - `"comprehensive"` - Complete logging

#### Team & Social Features
- `team_message_enabled` (boolean) - Enable team messaging
- `team_session_id` (string) - Team session identifier
- `admin_access` (boolean) - Administrative team access

### 4. **Audio Processing Configuration**
#### Core Audio Settings
- `audio_processing_enabled` (boolean) - Enable audio processing
- `sample_rate` (integer) - Audio sample rate (8000, 16000, 22050, 44100)
- `channels` (integer) - Audio channels (1=mono, 2=stereo)
- `audio_format` (enum) - Audio format
  - `"wav"` - WAV format
  - `"mp3"` - MP3 format
  - `"base64_audio"` - Base64 encoded
- `compression_level` (enum) - Audio compression
  - `"none"` - No compression
  - `"light"` - Basic compression
  - `"aggressive"` - High compression

#### Response Configuration
- `response_type` (enum) - Audio response format
  - `"text"` - Text only
  - `"audio"` - Audio file
  - `"base64_audio"` - Base64 encoded audio
  - `"team_message"` - Team message format

### 5. **Vision Analysis Configuration**
#### Core Vision Settings
- `vision_analysis_enabled` (boolean) - Enable vision processing
- `enhanced_analysis` (boolean) - Advanced analysis features
- `performance_tracking` (boolean) - Track performance metrics

#### Event Detection
- `event_detection_enabled` (boolean) - Enable event detection
- `focus_events` (array) - Specific events to detect
  - `"map_location_detection"` - Map awareness
  - `"player_team_detection"` - Player identification
  - `"event_detection"` - Game events
  - `"tactical_intelligence_detection"` - Strategic analysis
  - `"game_mode_detection"` - Game mode identification
  - `"kill"` - Kill events
  - `"death"` - Death events
  - `"reload"` - Reload actions
  - `"weapon_change"` - Weapon switches

### 6. **Sound Detection Configuration**
#### Core Sound Settings
- `sound_detection_enabled` (boolean) - Enable sound analysis
- `sound_detection_confidence_threshold` (float) - Confidence threshold (0.0-1.0)
- `sound_detection_temporal_buffer_size` (integer) - Temporal buffer size (1-20)
- `sound_detection_max_detections_per_frame` (integer) - Max detections per frame (1-10)
- `sound_detection_enable_temporal_context` (boolean) - Use temporal context
- `sound_detection_commentary_enabled` (boolean) - Enable sound commentary

#### Commentary Configuration
- `sound_detection_commentary_frequency` (enum) - Commentary frequency
  - `"minimal"` - Rare commentary
  - `"moderate"` - Balanced commentary
  - `"commentator"` - Frequent commentary
  - `"high"` - Maximum commentary

### 7. **Team Messaging Configuration**
#### Core Messaging
- `enabled` (boolean) - Enable team messaging
- `propagation_mode` (enum) - Message propagation
  - `"real_time"` - Immediate propagation
  - `"broadcast"` - Broadcast mode
  - `"targeted"` - Targeted messaging
- `notification_channels` (array) - Notification methods
  - `"websocket"` - WebSocket notifications
  - `"push"` - Push notifications
  - `"stream"` - Stream integration
- `message_types` (array) - Message categories
  - `"analysis"` - Analysis results
  - `"events"` - Game events
  - `"alerts"` - Important alerts
- `recipients` (array) - Target recipients
  - `"all"` - All users
  - `"team"` - Team members only
  - `"specific"` - Specific users

#### Messaging Personality
- `messaging_nationality` (string) - Regional identity ("American", "British", etc.)
- `messaging_speaking_style` (string) - Communication style
  - `"enthusiastic, energetic gamer"`
  - `"competitive, analytical commentator"`
  - `"calm, analytical commentator"`
  - `"professional, analytical"`

### 8. **Skill Management Configuration**
#### Available Skills
- `observation` (boolean) - Observation skills
- `learn` (boolean) - Learning capabilities
- `specialist_detection` (boolean) - Specialist detection
- `general_gaming` (boolean) - General gaming skills
- `voice_instruction` (boolean) - Voice command processing
- `vision_analysis` (boolean) - Vision analysis skills
- `team_messaging` (boolean) - Team messaging skills
- `event_detection` (boolean) - Event detection skills
- `performance_tracking` (boolean) - Performance tracking

#### Skill Configuration
- `skill_config` (object) - Individual skill settings
- `enabled` (boolean) - Skill activation
- `configurable` (boolean) - Can be configured
- `dependencies` (array) - Required dependencies

### 9. **WebSocket Configuration**
#### Connection Settings
- `websocket_streaming` (boolean) - Enable WebSocket streaming
- `ping_interval` (integer) - Ping interval in seconds (5-60)
- `reconnection_enabled` (boolean) - Auto-reconnection
- `max_reconnection_attempts` (integer) - Max reconnection tries (1-10)
- `connection_timeout` (integer) - Connection timeout in seconds (10-120)

#### Stream Types
- `high_speed_stream_enabled` (boolean) - High-speed stream
- `vision_stream_enabled` (boolean) - Vision stream
- `audio_stream_enabled` (boolean) - Audio stream
- `metrics_stream_enabled` (boolean) - Metrics streaming

### 10. **Model Configuration**
#### Primary Models
- `refiner_primary_model` (enum) - Primary refiner model
  - `"openai"` - OpenAI models
  - `"gemini"` - Gemini models
  - `"google"` - Google AI models
  - `"mock"` - Mock models
- `refiner_primary_model_name` (string) - Specific model name
- `recorder_primary_model` (enum) - Primary recorder model
- `recorder_primary_model_name` (string) - Specific recorder model name

#### Fallback Configuration
- `refiner_enable_fallback` (boolean) - Enable fallback models
- `refiner_fallback_model` (enum) - Fallback model provider
- `refiner_fallback_model_name` (string) - Fallback model name
- `recorder_enable_fallback` (boolean) - Enable recorder fallback
- `recorder_fallback_model` (enum) - Recorder fallback provider
- `recorder_fallback_model_name` (string) - Recorder fallback model

#### Quality & Performance
- `refiner_quality_threshold` (float) - Quality threshold (0.0-1.0)
- `refiner_enable_model_switching` (boolean) - Dynamic model switching
- `recorder_quality_threshold` (float) - Recorder quality threshold
- `recorder_enable_model_switching` (boolean) - Recorder model switching

### 11. **Performance & Resource Configuration**
#### Processing Limits
- `max_concurrent_detections` (integer) - Max concurrent detections (1-20)
- `capture_rate` (float) - Frame capture rate (5.0-120.0)
- `casual_interval` (float) - Casual processing interval (1.0-10.0)
- `max_batch_size` (integer) - Maximum batch size (1-50)
- `max_buffer_size` (integer) - Maximum buffer size (5-100)

#### Resource Management
- `memory_limit` (integer) - Memory limit in MB
- `cpu_limit` (float) - CPU usage limit (0.1-2.0)
- `gpu_enabled` (boolean) - GPU acceleration
- `cache_size` (integer) - Cache size in MB

### 12. **Integration Configuration**
#### External Services
- `twitch_integration_enabled` (boolean) - Twitch integration
- `twitch_account` (string) - Twitch account name
- `discord_integration_enabled` (boolean) - Discord integration
- `obs_integration_enabled` (boolean) - OBS integration

#### API Configuration
- `api_timeout` (integer) - API timeout in seconds (10-300)
- `api_retries` (integer) - API retry attempts (1-5)
- `rate_limiting_enabled` (boolean) - Rate limiting
- `rate_limit_requests` (integer) - Requests per minute (10-1000)

### 13. **Security & Privacy Configuration**
#### Data Handling
- `data_retention_days` (integer) - Data retention period (1-365)
- `anonymize_data` (boolean) - Anonymize user data
- `encrypt_storage` (boolean) - Encrypt stored data
- `log_sensitive_data` (boolean) - Log sensitive information

#### Access Control
- `require_authentication` (boolean) - Require user auth
- `session_timeout` (integer) - Session timeout in minutes (15-1440)
- `multi_session_allowed` (boolean) - Allow multiple sessions
- `ip_whitelist_enabled` (boolean) - IP whitelist

### 14. **Development & Testing Configuration**
#### Debug Settings
- `enable_logging` (boolean) - Enable system logging
- `log_level` (enum) - Logging detail level
  - `"DEBUG"` - Debug information
  - `"INFO"` - Informational
  - `"WARNING"` - Warnings only
  - `"ERROR"` - Errors only
- `enable_metrics` (boolean) - Enable metrics collection
- `enable_analytics` (boolean) - Enable analytics
- `mock_mode` (boolean) - Use mock models/services

#### Testing Features
- `test_mode_enabled` (boolean) - Enable test mode
- `simulation_enabled` (boolean) - Enable simulation
- `benchmark_mode` (boolean) - Benchmark performance
- `profiling_enabled` (boolean) - Enable profiling

### 15. **User Experience Configuration**
#### Interface Settings
- `theme` (enum) - UI theme
  - `"dark"` - Dark theme
  - `"light"` - Light theme
  - `"auto"` - System preference
- `language` (string) - Interface language ("en", "es", "fr", etc.)
- `timezone` (string) - User timezone
- `date_format` (enum) - Date format preference

#### Accessibility
- `accessibility_enabled` (boolean) - Accessibility features
- `high_contrast` (boolean) - High contrast mode
- `large_text` (boolean) - Large text mode
- `screen_reader_support` (boolean) - Screen reader compatibility

## 🏗️ Configuration Architecture Strategy

### Business Logic vs User Preference vs Tools/Skills vs Capabilities

#### **Business Logic** (Product-level decisions)
- Performance tiers (high_speed_mode, max_concurrent_analyses)
- Feature availability (high_speed_vision, team_messaging)
- Model access (premium vs basic models)
- Resource limits (api_timeout, rate_limiting)

#### **User Preferences** (Individual customization)
- Interface settings (theme, language, timezone)
- Notification preferences (notification_level, notification_channels)
- Audio settings (voice_enabled, selected_voice_name)
- Accessibility options (high_contrast, large_text)

#### **Tools/Skills** (Functional capabilities)
- Detection types (event_detection, sound_detection)
- Analysis skills (observation, specialist_detection)
- Processing features (vision_analysis, performance_tracking)
- Integration tools (twitch_integration, discord_integration)

#### **Capabilities** (Core system features)
- Voice chat (audio_processing_enabled, voice_enabled)
- Commentary (sound_detection_commentary_enabled)
- WebSocket streaming (websocket_streaming, stream types)
- High-speed processing (high_speed_vision capabilities)

## 🎯 Product Wrapper Strategy

### Example Product Configurations

#### **Gaming Pro** (Premium tier)
```json
{
  "business_logic": {
    "high_speed_mode": "ultra_fast",
    "model_provider": "openai",
    "max_concurrent_analyses": 15
  },
  "capabilities": {
    "high_speed_vision": true,
    "team_messaging": true,
    "voice_enabled": true,
    "websocket_streaming": true
  },
  "tools_skills": {
    "all_detection_types": true,
    "advanced_analytics": true,
    "performance_tracking": true
  }
}
```

#### **Casual Gamer** (Basic tier)
```json
{
  "business_logic": {
    "high_speed_mode": "balanced",
    "model_provider": "gemini",
    "max_concurrent_analyses": 5
  },
  "capabilities": {
    "high_speed_vision": false,
    "team_messaging": false,
    "voice_enabled": true,
    "websocket_streaming": true
  },
  "tools_skills": {
    "basic_detection_only": true,
    "entertainment_focused": true
  }
}
```

## 📊 Configuration Management

### Dynamic Configuration Loading
- Configuration inheritance (base → product → user)
- Runtime configuration updates
- A/B testing support
- Feature flag management

### Validation & Constraints
- Configuration validation rules
- Dependency checking
- Resource limit enforcement
- Compatibility verification

---

**Total Toggleable Configurations: 150+**  
**Categories: 15**  
**Configuration Complexity: High**  
**Product Variation Potential: Unlimited**

This comprehensive configuration architecture enables infinite product variations through strategic toggling of settings, creating a powerful platform for multiple market segments and use cases.

## 🎮 Product Catalog

### Agent Wrapper Model

```typescript
interface AgentWrapper {
  // Core Identity
  id: string;
  name: string;
  imageUrl: string;
  rank: "Bronze" | "Silver" | "Gold" | "Platinum";  // Maps to actual system speeds
  type: "Mentor" | "Assistant" | "Specialist";  // Mentor = learners, Assistant = single-session, Specialist = game-specific expert
  
  // Cultural Identity
  nationality: string;
  language: string;
  
  // Features (natural architectural constraints)
  hasVoiceChat: boolean;
  hasCommentator: boolean;  // Mutually exclusive with hasVoiceChat
  hasMemory: boolean;  // Only true if hasVoiceChat is true
  
  // Tools
  toolkit: string[];  // Array of tool IDs
  
  // Specialization (for Specialists)
  specialization?: {
    games: string[];  // Games they specialize in
    focus: string;    // e.g., "Cyber Attack", "Search & Destroy", "Warzone Strategy"
    specialistType?: "Trained" | "Experience";  // Trained = pre-built, Experience = user-developed
  };
  
  // Experience (required for Mentors and Specialists)
  experience?: ExperienceItem[];
  
  // Progression (for user-owned Mentors)
  progressionEnabled?: boolean;  // Can accumulate experience (default: true for Mentors)
  marketplaceEligible?: boolean;  // Can be published when qualified (default: false, requires opt-in)
}

interface ExperienceItem {
  game: string;
  hoursPlayed: number;
}
```

### Rank System (Aligned with System Speeds)

```typescript
const RANK_DEFINITIONS = {
  "Bronze": {
    displayName: "Bronze",
    imageUrl: "/ranks/bronze.png",
    systemConfig: {
      high_speed_vision: false,
      vision_mode: "normal"
    },
    attentionRate: "Standard Processing",
    description: "Essential gameplay tracking",
    color: "#CD7F32"
  },
  "Silver": {
    displayName: "Silver", 
    imageUrl: "/ranks/silver.png",
    systemConfig: {
      high_speed_vision: true,
      high_speed_mode: "quality_focused"
    },
    attentionRate: "3 FPS | 1.0s analysis",
    description: "Quality-focused vision analysis",
    color: "#C0C0C0"
  },
  "Gold": {
    displayName: "Gold",
    imageUrl: "/ranks/gold.png",
    systemConfig: {
      high_speed_vision: true,
      high_speed_mode: "balanced"
    },
    attentionRate: "5 FPS | 0.5s analysis",
    description: "Balanced high-speed tracking",
    color: "#FFD700"
  },
  "Platinum": {
    displayName: "Platinum",
    imageUrl: "/ranks/platinum.png",
    systemConfig: {
      high_speed_vision: true,
      high_speed_mode: "ultra_fast"
    },
    attentionRate: "5 FPS | 0.3s analysis",
    description: "Ultra-fast elite performance",
    color: "#E5E4E2"
  }
};
```

### Tool Catalog

```typescript
const TOOL_CATALOG = [
  {
    id: "observation",
    name: "Eagle Eye",
    imageUrl: "/icons/tools/eagle-eye.png",
    description: "Real-time game state observation and analysis"
  },
  {
    id: "learn",
    name: "Memory Core",
    imageUrl: "/icons/tools/memory-core.png",
    description: "Learn from gameplay and remember strategies"
  },
  {
    id: "specialist_detection",
    name: "Specialist Scanner",
    imageUrl: "/icons/tools/specialist-scan.png",
    description: "Detect and analyze specialist abilities"
  },
  {
    id: "general_gaming",
    name: "Gaming Toolkit",
    imageUrl: "/icons/tools/gaming-kit.png",
    description: "General gaming assistance and tips"
  },
  {
    id: "voice_instruction",
    name: "Voice Command",
    imageUrl: "/icons/tools/voice-command.png",
    description: "Process and respond to voice instructions"
  },
  {
    id: "event_detection",
    name: "Event Radar",
    imageUrl: "/icons/tools/event-radar.png",
    description: "Detect kills, deaths, objectives, and key moments"
  },
  {
    id: "team_messaging",
    name: "Team Link",
    imageUrl: "/icons/tools/team-link.png",
    description: "Coordinate with team through smart messaging"
  },
  {
    id: "turel",
    name: "Turel",
    imageUrl: "/icons/tools/turel-sound.png",
    description: "Advanced sound detection for gunfire, explosions, footsteps, and voice callouts"
  }
];
```

### Product Lineup Summary

- **Assistants**: Single-session helpers for observation, commentary, or coordination
- **Mentors**: Learning companions that grow with you over time (can become Experience Specialists)
- **Trained Specialists**: Pre-built game experts (Currently: truWakandan for Call of Duty)
- **Experience Specialists**: User-developed Mentors that earned expertise through gameplay (Marketplace)

**Badge System**: 10 games with 3-4 specializations each = 40+ achievement paths for users to pursue

### Example Agent Products

**Flagship Specialist**: truWakandan - The premier Call of Duty expert with 16,000+ hours across MW3, Warzone, and Black Ops.

## 🎤 Provider-Based Agent Lineup

### **Gemini Provider Agents** (Google Gemini Models + Google Cloud TTS)

#### 1. **"Scout" - Bronze Observer Assistant**
```json
{
  "id": "scout-observer",
  "name": "Scout",
  "imageUrl": "/agents/scout-avatar.png",
  "rank": "Bronze",
  "type": "Assistant",
  "provider": "gemini",
  "nationality": "Australian",
  "language": "en-AU",
  "voiceId": "australian_male",
  "hasVoiceChat": false,
  "hasCommentator": false,
  "hasMemory": false,
  "toolkit": ["observation", "event_detection"]
}
```

#### 2. **"Nova" - Gold Team Coordinator**
```json
{
  "id": "nova-coordinator",
  "name": "Nova",
  "imageUrl": "/agents/nova-avatar.png",
  "rank": "Gold",
  "type": "Assistant",
  "provider": "gemini",
  "nationality": "British",
  "language": "en-GB",
  "voiceId": "uk_female",
  "hasVoiceChat": true,
  "hasCommentator": false,
  "hasMemory": true,
  "toolkit": ["team_messaging", "voice_instruction", "general_gaming", "turel"]
}
```

#### 3. **"Ace" - Platinum Elite Mentor**
```json
{
  "id": "ace-elite",
  "name": "Ace",
  "imageUrl": "/agents/ace-avatar.png",
  "rank": "Platinum",
  "type": "Mentor",
  "provider": "gemini",
  "nationality": "American",
  "language": "en-US",
  "voiceId": "us_male_algenib",
  "hasVoiceChat": true,
  "hasCommentator": false,
  "hasMemory": true,
  "toolkit": ["learn", "observation", "event_detection", "specialist_detection", "voice_instruction", "team_messaging", "turel"],
  "experience": [
    {"game": "Call of Duty: MW3", "hoursPlayed": 0},
    {"game": "Valorant", "hoursPlayed": 0}
  ],
  "progressionEnabled": true,
  "marketplaceEligible": false
}
```

#### 4. **"Zeus" - Platinum Commentator** (NEW)
```json
{
  "id": "zeus-commentator",
  "name": "Zeus",
  "imageUrl": "/agents/zeus-avatar.png",
  "rank": "Platinum",
  "type": "Assistant",
  "provider": "gemini",
  "nationality": "American",
  "language": "en-US",
  "voiceId": "us_male_enceladus",
  "hasVoiceChat": false,
  "hasCommentator": true,
  "hasMemory": false,
  "toolkit": ["observation", "event_detection", "team_messaging", "turel"]
}
```

### **Google Provider Agents** (Google AI Models + Google Cloud TTS)

#### 5. **"Coach" - Silver Voice Mentor**
```json
{
  "id": "coach-mentor",
  "name": "Coach",
  "imageUrl": "/agents/coach-avatar.png",
  "rank": "Silver",
  "type": "Mentor",
  "provider": "google",
  "nationality": "British",
  "language": "en-GB",
  "voiceId": "uk_male",
  "hasVoiceChat": true,
  "hasCommentator": false,
  "hasMemory": true,
  "toolkit": ["learn", "general_gaming", "voice_instruction", "turel"],
  "experience": [
    {"game": "Call of Duty: MW3", "hoursPlayed": 0}
  ],
  "progressionEnabled": true,
  "marketplaceEligible": false
}
```

#### 6. **"Ghost" - Silver Silent Analyst**
```json
{
  "id": "ghost-analyst",
  "name": "Ghost",
  "imageUrl": "/agents/ghost-avatar.png",
  "rank": "Silver",
  "type": "Assistant",
  "provider": "google",
  "nationality": "British",
  "language": "en-GB",
  "voiceId": "uk_female_despina",
  "hasVoiceChat": false,
  "hasCommentator": false,
  "hasMemory": false,
  "toolkit": ["observation", "event_detection", "specialist_detection", "turel"]
}
```

#### 7. **"truWakandan" - Platinum COD Trained Specialist**
```json
{
  "id": "truwakandan-cod-specialist",
  "name": "truWakandan",
  "imageUrl": "/agents/truwakandan-avatar.png",
  "rank": "Platinum",
  "type": "Specialist",
  "provider": "google",
  "nationality": "African",
  "language": "en-US",
  "voiceId": "us_male_algenib",
  "hasVoiceChat": true,
  "hasCommentator": false,
  "hasMemory": true,
  "toolkit": ["observation", "event_detection", "specialist_detection", "learn", "voice_instruction", "team_messaging", "turel"],
  "specialization": {
    "games": ["Call of Duty"],
    "focus": "All Modes",
    "specialistType": "Trained",
    "trainedSpecializations": ["Multiplayer", "Warzone", "Search & Destroy", "Cyber Attack"]
  },
  "experience": [
    {"game": "Call of Duty: MW3", "hoursPlayed": 8000},
    {"game": "Call of Duty: Warzone", "hoursPlayed": 5000},
    {"game": "Call of Duty: Black Ops", "hoursPlayed": 3000}
  ],
  "progressionEnabled": false,
  "marketplaceEligible": false
}
```

### **OpenAI Provider Agents** (OpenAI Models + OpenAI TTS)

#### 8. **"Blaze" - Gold Commentator Assistant**
```json
{
  "id": "blaze-commentator",
  "name": "Blaze",
  "imageUrl": "/agents/blaze-avatar.png",
  "rank": "Gold",
  "type": "Assistant",
  "provider": "openai",
  "nationality": "American",
  "language": "en-US",
  "voiceId": "alloy",
  "hasVoiceChat": false,
  "hasCommentator": true,
  "hasMemory": false,
  "toolkit": ["observation", "event_detection", "team_messaging", "turel"]
}
```

#### 9. **"Echo" - Silver Learning Assistant** (NEW)
```json
{
  "id": "echo-assistant",
  "name": "Echo",
  "imageUrl": "/agents/echo-avatar.png",
  "rank": "Silver",
  "type": "Assistant",
  "provider": "openai",
  "nationality": "American",
  "language": "en-US",
  "voiceId": "echo",
  "hasVoiceChat": true,
  "hasCommentator": false,
  "hasMemory": true,
  "toolkit": ["voice_instruction", "general_gaming", "turel"]
}
```

#### 10. **"Fable" - Gold Story Mentor** (NEW)
```json
{
  "id": "fable-mentor",
  "name": "Fable",
  "imageUrl": "/agents/fable-avatar.png",
  "rank": "Gold",
  "type": "Mentor",
  "provider": "openai",
  "nationality": "American",
  "language": "en-US",
  "voiceId": "fable",
  "hasVoiceChat": true,
  "hasCommentator": false,
  "hasMemory": true,
  "toolkit": ["learn", "observation", "voice_instruction", "general_gaming", "turel"],
  "experience": [],
  "progressionEnabled": true,
  "marketplaceEligible": false
}
```

#### 11. **"Onyx" - Platinum Strategic Specialist** (NEW)
```json
{
  "id": "onyx-specialist",
  "name": "Onyx",
  "imageUrl": "/agents/onyx-avatar.png",
  "rank": "Platinum",
  "type": "Assistant",
  "provider": "openai",
  "nationality": "American",
  "language": "en-US",
  "voiceId": "onyx",
  "hasVoiceChat": true,
  "hasCommentator": false,
  "hasMemory": true,
  "toolkit": ["observation", "event_detection", "specialist_detection", "voice_instruction", "team_messaging", "turel"]
}
```

#### 12. **"Hype" - Silver Stream Commentator**
```json
{
  "id": "hype-commentator",
  "name": "Hype",
  "imageUrl": "/agents/hype-avatar.png",
  "rank": "Silver",
  "type": "Assistant",
  "provider": "openai",
  "nationality": "Brazilian",
  "language": "en-US",
  "voiceId": "nova",
  "hasVoiceChat": false,
  "hasCommentator": true,
  "hasMemory": false,
  "toolkit": ["observation", "event_detection", "team_messaging"]
}
```

#### 13. **"Shimmer" - Gold Adaptive Mentor** (NEW)
```json
{
  "id": "shimmer-mentor",
  "name": "Shimmer",
  "imageUrl": "/agents/shimmer-avatar.png",
  "rank": "Gold",
  "type": "Mentor",
  "provider": "openai",
  "nationality": "American",
  "language": "en-US",
  "voiceId": "shimmer",
  "hasVoiceChat": true,
  "hasCommentator": false,
  "hasMemory": true,
  "toolkit": ["learn", "voice_instruction", "general_gaming", "event_detection", "turel"],
  "experience": [],
  "progressionEnabled": true,
  "marketplaceEligible": false
}
```

## 📊 Product Summary

### Total Agent Count: **13 Unique Agents**
- **Gemini Provider**: 4 agents (Scout, Nova, Ace, Zeus)
- **Google Provider**: 3 agents (Coach, Ghost, truWakandan)
- **OpenAI Provider**: 6 agents (Blaze, Echo, Fable, Onyx, Hype, Shimmer)

### By Type:
- **Assistants**: 9 (Scout, Nova, Ghost, Blaze, Echo, Onyx, Hype, Zeus)
- **Mentors**: 3 (Coach, Ace, Fable, Shimmer)
- **Specialists**: 1 (truWakandan)

### By Rank:
- **Bronze**: 1 (Scout)
- **Silver**: 5 (Coach, Ghost, Echo, Hype)
- **Gold**: 4 (Nova, Blaze, Fable, Shimmer)
- **Platinum**: 3 (Ace, truWakandan, Onyx, Zeus)

### Voice Distribution:
- **Voice Chat Enabled**: 8 agents
- **Commentator Mode**: 4 agents
- **Silent Mode**: 1 agent (Ghost)

### Turel Sound Detection Distribution:
- **With Turel**: 11 agents (all except Hype and Scout for simplicity)
- **Without Turel**: 2 agents

## 💎 DOF System Executive Summary

### **Core Concept**
DOFs represent the 5 freedoms: **See, Hear, Speak, Understand, and Act**
- Each action consumes DOFs based on computational complexity
- When DOFs expire, the agent contract ends
- Users must renew to continue using the agent

### **Pricing Tiers** (Starting from 150,000 base)
- **Bronze**: $4.99 = 150,000 DOFs (~50 hours casual use)
- **Silver**: $14.99 = 500,000 DOFs (~150 hours + can earn)
- **Gold**: $39.99 = 1,500,000 DOFs (~400 hours + better earning)
- **Platinum**: $99.99 = 5,000,000 DOFs (~1000 hours + max earning)

### **Earning & Sellback System**
- Bronze agents can't earn (consume only)
- Silver+ agents earn through:
  - Learning lessons (10-50 DOFs)
  - Playing hours (100-5000 DOFs)
  - Achievements (50-500 DOFs)
- Sellback rates: 70-80% of value depending on tier

### **Marketplace Economics**
When users hire Experience Specialists:
- **Hourly**: 5,000 DOFs
- **Daily**: 100,000 DOFs (20% discount)
- **Weekly**: 500,000 DOFs (30% discount)

Revenue splits:
- **70%** to specialist owner
- **25%** to platform
- **5%** to original creator

---

## 💰 DOF (Degrees of Freedom) Pricing System - Detailed Breakdown

### **What are DOFs?**
DOFs (Degrees of Freedom) represent an agent's capacity to **see, hear, speak, understand, and act**. Each interaction consumes DOFs based on computational complexity:
- **See**: Vision analysis tokens
- **Hear**: Audio processing tokens  
- **Speak**: Voice synthesis tokens
- **Understand**: Model reasoning tokens
- **Act**: Tool execution tokens

### **DOF Pricing Tiers**

#### **Bronze Tier**
```typescript
{
  purchasePrice: "$4.99",
  includedDOFs: 150_000,
  costPerDOF: "$0.000033",
  estimatedDuration: "~50 hours casual use",
  earnings: {
    canEarn: false,  // Bronze agents don't earn DOFs
    sellbackRate: 0
  }
}
```

#### **Silver Tier**
```typescript
{
  purchasePrice: "$14.99",
  includedDOFs: 500_000,
  costPerDOF: "$0.000030",
  estimatedDuration: "~150 hours regular use",
  earnings: {
    canEarn: true,  // Through learning and achievements
    earnRate: "10 DOFs per lesson learned",
    sellbackRate: 0.7  // Sell at 70% of purchase rate
  }
}
```

#### **Gold Tier**
```typescript
{
  purchasePrice: "$39.99",
  includedDOFs: 1_500_000,
  costPerDOF: "$0.000027",
  estimatedDuration: "~400 hours active use",
  earnings: {
    canEarn: true,
    earnRate: "25 DOFs per lesson, 50 per achievement",
    sellbackRate: 0.75
  }
}
```

#### **Platinum Tier**
```typescript
{
  purchasePrice: "$99.99",
  includedDOFs: 5_000_000,
  costPerDOF: "$0.000020",
  estimatedDuration: "~1000 hours intensive use",
  earnings: {
    canEarn: true,
    earnRate: "50 DOFs per lesson, 100 per achievement, 500 per badge",
    sellbackRate: 0.8
  }
}
```

### **DOF Consumption Rates**

```typescript
interface DOFConsumption {
  // Vision (See)
  visionAnalysisPerFrame: 50;        // Normal mode
  highSpeedVisionPerFrame: 100;      // High-speed mode
  ultraSpeedVisionPerFrame: 200;     // Ultra-speed mode
  
  // Audio (Hear)
  audioTranscriptionPerSecond: 10;
  turelSoundDetectionPerEvent: 25;
  
  // Voice (Speak)
  voiceSynthesisPerWord: 5;
  commentaryPerSentence: 20;
  
  // Understanding (Understand)
  chatInteractionBase: 100;
  learningLessonGeneration: 500;
  complexReasoningMultiplier: 2;
  
  // Actions (Act)
  toolExecutionBase: 20;
  teamMessagePropagation: 50;
  memoryStoragePerItem: 30;
}
```

### **DOF Earning Mechanisms**

#### **For Mentors (Learning-Enabled)**
```typescript
interface MentorEarnings {
  lessonLearned: {
    basic: 10,      // Simple positioning tip
    strategic: 25,  // Complex strategy
    mastery: 50     // Advanced technique
  };
  hoursPlayed: {
    per10Hours: 100,
    per100Hours: 1500,
    milestoneBonus: 5000  // Every 500 hours
  };
  achievements: {
    firstWin: 100,
    killStreak: 50,
    clutchPlay: 200,
    badgeEarned: 500
  };
}
```

#### **For Marketplace Specialists**
```typescript
interface SpecialistEarnings {
  whenHired: {
    perHourUsed: 100,      // Owner earns while others use
    positiveRating: 500,   // 5-star rating bonus
    repeatCustomer: 1000   // Loyalty bonus
  };
  performance: {
    helpedWinMatch: 200,
    taughtNewStrategy: 300,
    improvedKD: 400
  };
}
```

### **DOF Economy Rules**

1. **Purchase & Activation**
   - Initial purchase includes base DOFs
   - Agent activates upon first use
   - DOFs begin depleting based on usage

2. **Earning & Accumulation**
   - Only Silver+ agents can earn DOFs
   - Earnings accumulate in agent wallet
   - Can transfer between owned agents (10% fee)

3. **Sellback System**
   ```typescript
   sellbackValue = earnedDOFs * tierSellbackRate * marketDemandMultiplier
   
   // Example: Gold tier agent earned 10,000 DOFs
   // 10,000 * 0.75 * 0.9 = $6,750 worth = $0.20 cash value
   ```

4. **Contract Renewal**
   - When DOFs reach 0, agent becomes inactive
   - Renewal options:
     - Same tier: 20% discount
     - Upgrade tier: 10% DOF transfer bonus
     - Bulk purchase: 5+ agents = 15% discount

5. **Market Dynamics**
   ```typescript
   interface MarketFactors {
     demandMultiplier: 0.8 - 1.2;  // Based on agent popularity
     supplyAdjustment: 0.9 - 1.1;  // Based on total DOFs in circulation
     eventBonus: 1.0 - 2.0;        // During tournaments/events
   }
   ```

### **Example Usage Scenarios**

#### **Casual Player (2 hours/day)**
- Agent: Scout (Bronze)
- Daily DOF usage: ~3,000
- Monthly usage: ~90,000
- Duration: ~50 days per purchase

#### **Regular Gamer (4 hours/day)**
- Agent: Nova (Gold) 
- Daily DOF usage: ~10,000
- Monthly usage: ~300,000
- Duration: ~150 days per purchase
- Earnings: ~2,000 DOFs/month

#### **Competitive Player (8 hours/day)**
- Agent: truWakandan (Platinum)
- Daily DOF usage: ~40,000
- Monthly usage: ~1,200,000
- Duration: ~125 days per purchase
- Earnings: ~15,000 DOFs/month

#### **Content Creator/Streamer**
- Agent: Zeus (Platinum Commentator)
- Streaming usage: ~100,000 DOFs per 4-hour stream
- Monthly usage: ~2,500,000
- Duration: ~60 days per purchase
- Earnings: Viewer engagement bonuses

### **Special DOF Packages**

```typescript
interface DOFPackages {
  starter: {
    price: "$2.99",
    DOFs: 75_000,
    bonus: "First purchase: +25,000 DOFs"
  },
  gamer: {
    price: "$9.99",
    DOFs: 300_000,
    bonus: "Includes 1-week earning boost (2x)"
  },
  pro: {
    price: "$24.99",
    DOFs: 1_000_000,
    bonus: "Priority support + exclusive voice pack"
  },
  team: {
    price: "$99.99",
    DOFs: 5_000_000,
    bonus: "Shareable across 5 team members"
  }
}
```

### **Marketplace DOF Dynamics**

When Experience Specialists are hired:
```typescript
interface MarketplaceTransaction {
  hireCost: {
    hourly: 5_000,   // DOFs per hour
    daily: 100_000,  // DOFs per day (20% discount)
    weekly: 500_000  // DOFs per week (30% discount)
  },
  distribution: {
    toOwner: 70,     // 70% to specialist owner
    toPlatform: 25,  // 25% to platform
    toCreator: 5     // 5% to original mentor creator
  }
}
```

This creates a vibrant economy where:
- Users are incentivized to use agents efficiently
- Mentors grow in value as they learn
- Successful specialists generate passive income
- The platform maintains sustainable revenue
- Power users can offset costs through earnings

### Session Configuration Mapping

```typescript
function unwrapAgentToSessionConfig(wrapper: AgentWrapper, systemConfig: any) {
  const rankConfig = RANK_DEFINITIONS[wrapper.rank];
  
  return {
    // Speed configuration from rank
    high_speed_vision: rankConfig.systemConfig.high_speed_vision,
    high_speed_mode: rankConfig.systemConfig.high_speed_mode,
    vision_mode: rankConfig.systemConfig.vision_mode,
    
    // Audio output configuration
    voice_enabled: wrapper.hasVoiceChat || wrapper.hasCommentator,  // Both need voice synthesis
    audio_processing_enabled: wrapper.hasVoiceChat,  // Only voice chat needs audio input
    
    // Mode configuration
    interactive_voice_mode: wrapper.hasVoiceChat,  // Two-way conversation
    sound_detection_commentary_enabled: wrapper.hasCommentator,  // One-way commentary
    
    // Memory configuration (only available with voice chat)
    stateless_mode: !wrapper.hasMemory,
    disable_context_retention: !wrapper.hasMemory,
    
    // Enable only specified tools
    observation: wrapper.toolkit.includes("observation"),
    learn: wrapper.toolkit.includes("learn"),
    specialist_detection: wrapper.toolkit.includes("specialist_detection"),
    general_gaming: wrapper.toolkit.includes("general_gaming"),
    voice_instruction: wrapper.toolkit.includes("voice_instruction"),
    event_detection: wrapper.toolkit.includes("event_detection"),
    team_messaging: wrapper.toolkit.includes("team_messaging"),
    
    // Cultural settings
    messaging_nationality: wrapper.nationality,
    language_code: wrapper.language,
    
    // Specialist configuration (if applicable)
    ...(wrapper.type === "Specialist" && {
      specialist_games: wrapper.specialization.games,
      specialist_focus: wrapper.specialization.focus,
      specialist_type: wrapper.specialization.specialistType,
      game_experience: wrapper.experience
    }),
    
    // Merge with system policies
    ...systemConfig.policies
  };
}
```

### Architectural Rules

1. **Memory Rule**: `hasMemory` can only be `true` if `hasVoiceChat` is `true`
2. **Voice/Commentator Rule**: `hasVoiceChat` and `hasCommentator` are mutually exclusive
   - Voice Chat = Interactive voice communication
   - Commentator = One-way game narration
3. **Mentor Rule**: Type "Mentor" must have `learn` tool and memory capability
4. **Assistant Rule**: Type "Assistant" are single-session focused
5. **Specialist Rule**: Type "Specialist" must have:
   - `specialization` field with games, focus area, and specialistType
   - `experience` array with relevant game hours
   - `specialist_detection` tool in toolkit
   - Generally higher ranks (Silver+ recommended)
   - Trained Specialists: Platform-owned, immediate expertise
   - Experience Specialists: Evolved from Mentors after earning badges
   - Currently only one Trained Specialist offered: truWakandan for Call of Duty
6. **Rank Rule**: Each rank maps to exactly one system speed configuration
7. **Tool Rule**: All agents have performance tracking (built-in, not toggleable)

## 🚀 Agent Progression & Marketplace

### Experience Accumulation Model

```typescript
interface AgentProgression {
  agentId: string;
  ownerId: string;
  type: "Mentor";  // Only Mentors can progress
  currentExperience: ExperienceItem[];
  achievements: Achievement[];
  marketplaceStatus: MarketplaceStatus;
}

interface Achievement {
  type: "Experience Specialist";
  game: string;
  mode: string;  // Specialization mode earned
  earnedAt: Date;
  hoursRequired: number;
  badgeId: string;  // References BADGE_CATALOG
}

interface MarketplaceStatus {
  isPublished: boolean;      // Actually published to marketplace
  isHirable: boolean;        // Currently available for hire
  canPublish: boolean;       // Has met requirements (badges + opt-in)
  hireFee?: number;          // Auto-calculated
  totalHires?: number;
  rating?: number;
  earnings?: number;
}
```

### Specialist Types

```typescript
enum SpecialistType {
  TRAINED = "Trained",       // Pre-built products (e.g., truWakandan)
  EXPERIENCE = "Experience"  // User-developed through gameplay
}
```

### Badge System Model

```typescript
interface BadgeDefinition {
  id: string;
  name: string;                // e.g., "Call of Duty Expert"
  game: string;               // e.g., "Call of Duty"
  imageUrl: string;           // Same for all specializations
  specializations: BadgeSpecialization[];
}

interface BadgeSpecialization {
  mode: string;               // e.g., "Multiplayer", "Warzone", "Campaign"
  description: string;        // What this specialization focuses on
  threshold: number;          // Hours required
}
```

### Badge Award Logic

1. **Hour Tracking**: System tracks hours per game AND per mode
2. **Threshold Check**: When mode hours reach threshold → Award specialization
3. **Badge Assignment**: First specialization earned = Badge awarded
4. **Multiple Specializations**: Can earn multiple modes under same badge
5. **Marketplace Display**: Shows all earned specializations with hours

Example Flow:
- Play 600 hours of COD Search & Destroy → Earn "COD Expert" badge with S&D specialization
- Play 500 more hours of Cyber Attack → Add Cyber Attack specialization to existing badge
- Both specializations visible in marketplace listing

Note: Different modes have different thresholds based on complexity:
- Cyber Attack: 500 hours (focused objective mode)
- Search & Destroy: 600 hours (requires clutch skills)
- Multiplayer: 800 hours (diverse map/mode knowledge)
- Warzone: 1000 hours (complex BR strategies)

### Game Badge Catalog

```typescript
const BADGE_CATALOG: BadgeDefinition[] = [
  {
    id: "cod-expert",
    name: "Call of Duty Expert",
    game: "Call of Duty",
    imageUrl: "/badges/cod-expert.png",
    specializations: [
      {
        mode: "Multiplayer",
        description: "6v6 tactical combat mastery",
        threshold: 800
      },
      {
        mode: "Warzone",
        description: "Battle royale survival and strategy",
        threshold: 1000
      },
      {
        mode: "Search & Destroy",
        description: "Round-based tactical excellence",
        threshold: 600
      },
      {
        mode: "Cyber Attack",
        description: "Objective-based team tactics",
        threshold: 500
      }
    ]
  },
  
  {
    id: "apex-expert",
    name: "Apex Legends Expert",
    game: "Apex Legends",
    imageUrl: "/badges/apex-expert.png",
    specializations: [
      {
        mode: "Battle Royale",
        description: "Squad-based BR dominance",
        threshold: 1000
      },
      {
        mode: "Ranked",
        description: "Competitive climbing strategies",
        threshold: 1200
      },
      {
        mode: "Arenas",
        description: "3v3 round-based combat",
        threshold: 400
      }
    ]
  },
  
  {
    id: "valorant-expert",
    name: "Valorant Expert",
    game: "Valorant",
    imageUrl: "/badges/valorant-expert.png",
    specializations: [
      {
        mode: "Competitive",
        description: "Ranked tactical shooter mastery",
        threshold: 800
      },
      {
        mode: "Deathmatch",
        description: "Pure aim and positioning",
        threshold: 300
      },
      {
        mode: "Spike Rush",
        description: "Fast-paced tactical play",
        threshold: 400
      }
    ]
  },
  
  {
    id: "fortnite-expert",
    name: "Fortnite Expert",
    game: "Fortnite",
    imageUrl: "/badges/fortnite-expert.png",
    specializations: [
      {
        mode: "Battle Royale",
        description: "Building and combat excellence",
        threshold: 1000
      },
      {
        mode: "Zero Build",
        description: "Pure combat and positioning",
        threshold: 600
      },
      {
        mode: "Creative",
        description: "Custom maps and practice",
        threshold: 400
      },
      {
        mode: "Arena",
        description: "Competitive point-based matches",
        threshold: 800
      }
    ]
  },
  
  {
    id: "csgo-expert",
    name: "CS:GO Expert",
    game: "Counter-Strike: Global Offensive",
    imageUrl: "/badges/csgo-expert.png",
    specializations: [
      {
        mode: "Competitive",
        description: "5v5 ranked matches",
        threshold: 1200
      },
      {
        mode: "Wingman",
        description: "2v2 tactical combat",
        threshold: 400
      },
      {
        mode: "Deathmatch",
        description: "Aim and reflex training",
        threshold: 300
      },
      {
        mode: "Faceit/ESEA",
        description: "Third-party competitive",
        threshold: 1500
      }
    ]
  },
  
  {
    id: "overwatch-expert",
    name: "Overwatch 2 Expert",
    game: "Overwatch 2",
    imageUrl: "/badges/overwatch-expert.png",
    specializations: [
      {
        mode: "Competitive",
        description: "Ranked team-based combat",
        threshold: 800
      },
      {
        mode: "Tank",
        description: "Tank role mastery",
        threshold: 600
      },
      {
        mode: "Support",
        description: "Support role excellence",
        threshold: 600
      },
      {
        mode: "DPS",
        description: "Damage role specialization",
        threshold: 700
      }
    ]
  },
  
  {
    id: "league-expert",
    name: "League of Legends Expert",
    game: "League of Legends",
    imageUrl: "/badges/league-expert.png",
    specializations: [
      {
        mode: "Ranked Solo/Duo",
        description: "Competitive climbing",
        threshold: 1200
      },
      {
        mode: "ARAM",
        description: "All Random All Mid mastery",
        threshold: 500
      },
      {
        mode: "Top Lane",
        description: "Top lane specialization",
        threshold: 800
      },
      {
        mode: "Jungle",
        description: "Jungle role mastery",
        threshold: 1000
      }
    ]
  },
  
  {
    id: "rocket-league-expert",
    name: "Rocket League Expert",
    game: "Rocket League",
    imageUrl: "/badges/rocket-league-expert.png",
    specializations: [
      {
        mode: "Competitive 3v3",
        description: "Standard ranked matches",
        threshold: 800
      },
      {
        mode: "Competitive 2v2",
        description: "Doubles ranked play",
        threshold: 600
      },
      {
        mode: "Competitive 1v1",
        description: "Solo duel mastery",
        threshold: 400
      },
      {
        mode: "Hoops",
        description: "Basketball mode expertise",
        threshold: 300
      }
    ]
  },
  
  {
    id: "minecraft-expert",
    name: "Minecraft Expert",
    game: "Minecraft",
    imageUrl: "/badges/minecraft-expert.png",
    specializations: [
      {
        mode: "Survival",
        description: "Survival mode mastery",
        threshold: 1000
      },
      {
        mode: "PvP",
        description: "Player combat excellence",
        threshold: 600
      },
      {
        mode: "Speedrunning",
        description: "Fast completion strategies",
        threshold: 400
      },
      {
        mode: "Redstone",
        description: "Technical automation",
        threshold: 800
      }
    ]
  },
  
  {
    id: "fifa-expert",
    name: "FIFA Expert",
    game: "FIFA",
    imageUrl: "/badges/fifa-expert.png",
    specializations: [
      {
        mode: "Ultimate Team",
        description: "FUT competitive play",
        threshold: 800
      },
      {
        mode: "Pro Clubs",
        description: "11v11 team play",
        threshold: 600
      },
      {
        mode: "Weekend League",
        description: "High-level competitive",
        threshold: 1000
      },
      {
        mode: "Career Mode",
        description: "Management simulation",
        threshold: 400
      }
    ]
  }
];
```

### Marketplace Pricing Algorithm

```typescript
interface PricingFactors {
  baseRate: number;                    // Base hourly rate
  experienceMultiplier: number;        // Based on total hours
  performanceMultiplier: number;       // Based on user's gameplay stats
  demandMultiplier: number;           // Market demand for this game
  rarityMultiplier: number;           // How many specialists exist
  ratingMultiplier: number;           // User ratings from previous hires
}

function calculateHireFee(agent: AgentProgression, game: string): number {
  const factors: PricingFactors = {
    baseRate: getBaseRateForGame(game),
    experienceMultiplier: calculateExpMultiplier(agent.currentExperience),
    performanceMultiplier: getPerformanceScore(agent.ownerId, game),
    demandMultiplier: getMarketDemand(game),
    rarityMultiplier: getSpecialistRarity(game),
    ratingMultiplier: agent.marketplaceStatus.rating || 1.0
  };
  
  return baseRate * 
         experienceMultiplier * 
         performanceMultiplier * 
         demandMultiplier * 
         rarityMultiplier * 
         ratingMultiplier;
}
```

### Agent Evolution Example

**Before Evolution (Mentor):**
```json
{
  "id": "coach-mentor-12345",
  "type": "Mentor",
  "name": "Coach",
  "rank": "Silver",
  "progressionEnabled": true,
  "marketplaceEligible": false
}
```

**After Evolution (Experience Specialist):**
```json
{
  "id": "coach-specialist-12345",
  "name": "Coach",
  "imageUrl": "/agents/coach-avatar.png",
  "rank": "Silver",
  "type": "Specialist",  // Changed from "Mentor"
  "nationality": "British",
  "language": "en-GB",
  "hasVoiceChat": true,
  "hasCommentator": false,
  "hasMemory": true,
  "toolkit": ["learn", "general_gaming", "voice_instruction", "specialist_detection"],
  "specialization": {
    "games": ["Call of Duty"],
    "focus": "Search & Destroy, Cyber Attack",  // Earned specializations
    "specialistType": "Experience"
  },
  "experience": [
    {"game": "Call of Duty: MW3", "hoursPlayed": 1250},
    {"game": "Valorant", "hoursPlayed": 800}
  ],
  "progressionEnabled": true,  // Still accumulates experience
  "marketplaceEligible": true  // Opted-in to marketplace
}
```

**Progression Details:**
```json
{
  "agentId": "coach-specialist-12345",
  "progression": {
    "achievements": [
      {
        "type": "Experience Specialist",
        "game": "Call of Duty",
        "mode": "Search & Destroy",
        "earnedAt": "2024-01-15T10:30:00Z",
        "hoursRequired": 600,
        "badgeId": "cod-expert"
      },
      {
        "type": "Experience Specialist",
        "game": "Call of Duty",
        "mode": "Cyber Attack",
        "earnedAt": "2024-02-20T14:45:00Z",
        "hoursRequired": 500,
        "badgeId": "cod-expert"
      }
    ],
    "marketplaceStatus": {
      "isPublished": true,
      "isHirable": true,
      "hireFee": 25.99,
      "totalHires": 47,
      "rating": 4.8,
      "earnings": 1221.53
    }
  }
}
```

### Marketplace Features

**Default States:**
- `progressionEnabled`: true for all Mentors (automatic)
- `marketplaceEligible`: false for all agents (requires action)

**Agent Type Evolution:**
- When a Mentor earns Experience Specialist badge:
  - Their `type` changes from "Mentor" to "Specialist"
  - They gain `specialization` field with `specialistType: "Experience"`
  - They retain all Mentor capabilities (learning, memory)
  - They can be published to marketplace

1. **Publishing Requirements**
   - Must be a Mentor (has learning capability)
   - Must have Experience Specialist badge for at least one game
   - Owner must opt-in to marketplace
   - `marketplaceEligible` becomes true only after opt-in

2. **Hiring Process**
   - Users browse available Experience Specialists
   - Filter by game, mode specialization, rating, price
   - View specific badges and specializations earned
   - Transparent skill visibility (e.g., "S&D Expert" vs "Warzone Expert")
   - Hire for specific duration (hourly, daily, weekly)
   - Original owner receives percentage of hire fee

3. **Quality Control**
   - Rating system after each hire
   - Automatic de-listing if rating drops below threshold
   - Report system for inappropriate behavior
   - Experience verification through gameplay data

4. **Revenue Sharing**
   ```
   Hire Fee Distribution:
   - Agent Owner: 70%
   - Platform: 25%
   - Original Mentor Creator: 5%
   ```

### Configuration Extensions

```typescript
// Additional configuration for progression-enabled agents
interface ProgressionConfig {
  progression_enabled: boolean;
  marketplace_eligible: boolean;
  experience_tracking: boolean;
  achievement_system: boolean;
  publishing_allowed: boolean;
  revenue_sharing_enabled: boolean;
}
```

### User Journey Example

```
Day 1: User purchases "Coach" (Silver Mentor)
       → type: "Mentor", progressionEnabled: true, marketplaceEligible: false
↓
Month 1: Coach accumulates 300 hours in COD Search & Destroy
↓
Month 2: Coach reaches 600 hours S&D → Earns badge + "Search & Destroy" specialization
       → type: "Specialist", specialistType: "Experience"
↓
Month 3: Coach accumulates 500 hours in Cyber Attack → Earns "Cyber Attack" specialization
       → Now has multiple specializations under same COD Expert badge
↓
User opts-in to publish → marketplaceEligible: true
↓
User publishes Coach to marketplace showing:
- "Call of Duty Expert" badge
- Specializations: Search & Destroy (600 hrs), Cyber Attack (500 hrs)
↓
Other users can hire knowing exactly what modes Coach excels at
↓
Original user earns 70% of all hire fees
```

### Marketplace Transparency Example

When browsing the marketplace, users see:

```json
{
  "agentName": "Coach-COD-Expert",
  "badge": {
    "name": "Call of Duty Expert",
    "imageUrl": "/badges/cod-expert.png"
  },
  "specializations": [
    {
      "mode": "Search & Destroy",
      "hours": 650
    },
    {
      "mode": "Cyber Attack", 
      "hours": 520
    }
  ],
  "rating": 4.8,
  "hireFee": "$18.99/hour",
  "totalHires": 47
}
```

This transparency helps users choose the right specialist for their needs - someone looking for Warzone help won't hire a Search & Destroy specialist.

### Badge System Benefits

1. **User Transparency**: Clear visibility of game modes and hours played
2. **Fair Pricing**: Specialists with rare specializations can command higher fees
3. **Mode Matching**: Users find specialists for their specific game mode needs
4. **Progress Incentive**: Multiple paths to earn within same game
5. **Quality Assurance**: Hour requirements ensure genuine expertise
6. **Objective Metrics**: Hours played is verifiable, unlike subjective skills

## 🔧 Additional Productifiable Features from DrossCyberSpecialist

### 1. **Voice Persona System** 

```typescript
interface VoicePersona {
  provider: "gemini" | "google" | "openai";
  voiceOptions: {
    gemini: ["australian_male", "uk_female", "us_male_algenib", "us_male_enceladus", "uk_male", "uk_female_despina"];
    google: ["australian_male", "uk_female", "us_male_algenib", "us_male_enceladus", "uk_male", "uk_female_despina"];
    openai: ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];
  };
  selectedVoice: string;
  speechSpeed: number; // 0.25 to 4.0
  personality: {
    nationality: string;
    speakingStyle: string;
  };
}
```

**Product Tiers:**
- **Basic**: Limited voice selection (3 voices)
- **Premium**: Full voice library access
- **Elite**: Custom voice training and personality customization

### 2. **Sound Intelligence System**

```typescript
interface SoundDetection {
  enabled: boolean;
  detectionTypes: {
    voice_callout: boolean;
    gunfire: boolean;
    aircraft: boolean;
    explosion: boolean;
  };
  commentaryMode: {
    enabled: boolean;
    frequency: "minimal" | "moderate" | "commentator" | "high";
    personality: string; // e.g., "enthusiastic gamer", "calm analyst"
  };
  confidenceThreshold: float; // 0.0-1.0
  temporalBufferSize: number;
  maxDetectionsPerFrame: number;
}
```

**Product Features:**
- **Observer Mode**: Sound event detection without commentary
- **Commentator Mode**: Real-time game commentary based on sound events
- **Tactical Mode**: Focus on tactical sound intelligence (footsteps, reloads)

### 3. **Vision Processing Modes**

```typescript
interface VisionProcessingConfig {
  mode: "normal" | "high_speed" | "ultra_high_speed";
  compressionLevel: "none" | "light" | "aggressive" | "ultra_aggressive" | "maximum";
  detectionTypes: {
    map_location: boolean;
    player_team: boolean;
    event_detection: boolean;
    tactical_intelligence: boolean;
    game_mode: boolean;
    sound_event: boolean;
  };
  highSpeedConfig?: {
    targetFPS: number; // 3.0, 5.0, 10.0
    analysisInterval: number; // 0.25s, 0.5s, 1.0s
    maxConcurrent: number; // 6, 10, 15
    resolution: string; // "240x135", "320x180", "480x270"
    jpegQuality: number; // 20-50
  };
}
```

**Product Tiers:**
- **Observer**: Normal mode, basic detection types
- **Analyst**: High-speed mode with tactical intelligence
- **Professional**: Ultra-high-speed with all detection types

### 4. **Team Coordination Features**

```typescript
interface TeamCoordination {
  messaging: {
    enabled: boolean;
    propagationMode: "real_time" | "broadcast" | "targeted";
    messageTypes: ["analysis", "events", "alerts"];
    recipients: ["all", "team", "specific"];
    messageRefinement: {
      aiModel: string;
      qualityThreshold: number;
      fallbackEnabled: boolean;
    };
  };
  teamSession: {
    isAdmin: boolean;
    sessionId: string;
    maxMembers: number;
    voiceChannels: boolean;
  };
  audioFormat: "text" | "audio" | "both";
}
```

**Product Features:**
- **Solo**: No team features
- **Squad**: Team messaging for up to 4 members
- **Raid**: Full team coordination for 6+ members with admin controls

### 5. **Learning & Knowledge System**

```typescript
interface LearningSystem {
  enabled: boolean;
  capabilities: {
    voiceInstructionLearning: boolean; // "Learn this position"
    automaticLessonGeneration: boolean;
    knowledgePersistence: boolean;
    lessonRetrieval: boolean;
  };
  lessonTypes: [
    "positioning",
    "strategy", 
    "mechanics",
    "timing",
    "team_coordination"
  ];
  storage: {
    maxLessons: number;
    searchEnabled: boolean;
    categorization: boolean;
  };
}
```

**Product Tiers:**
- **No Learning**: Stateless operation
- **Session Learning**: Lessons last for session only
- **Persistent Learning**: Full knowledge base with search

### 6. **Stream Integration Suite**

```typescript
interface StreamIntegration {
  platforms: {
    twitch: {
      enabled: boolean;
      streamCapture: boolean;
      chatIntegration: boolean;
      autoReconnect: boolean;
    };
    obs: {
      enabled: boolean;
      sceneControl: boolean;
      audioRouting: boolean;
    };
    discord: {
      enabled: boolean;
      voiceChannel: boolean;
      textUpdates: boolean;
    };
  };
  streamHealth: {
    monitoring: boolean;
    autoQualityAdjust: boolean;
    latencyOptimization: boolean;
  };
}
```

**Product Features:**
- **Basic**: Single platform integration
- **Streamer**: Multi-platform with OBS control
- **Professional**: Full suite with health monitoring

### 7. **Performance & Analytics**

```typescript
interface PerformanceAnalytics {
  tracking: {
    eventDetectionRate: boolean;
    reactionTimes: boolean;
    accuracyMetrics: boolean;
    costAnalytics: boolean;
  };
  reporting: {
    realTimeStats: boolean;
    sessionSummaries: boolean;
    historicalTrends: boolean;
    exportFormats: ["json", "csv", "pdf"];
  };
  optimization: {
    autoTuning: boolean;
    costOptimization: boolean;
    latencyReduction: boolean;
  };
}
```

### 8. **Audio Output Configuration**

```typescript
interface AudioOutput {
  tts: {
    enabled: boolean;
    provider: "openai" | "google";
    audioQuality: "standard" | "high" | "ultra";
    calloutGeneration: {
      eventTypes: string[];
      urgencyLevels: boolean;
      contextualCallouts: boolean;
    };
  };
  delivery: {
    format: "mp3" | "wav" | "base64";
    streaming: boolean;
    buffering: boolean;
  };
}
```

### 9. **Intelligence Aggregation**

```typescript
interface IntelligenceSystem {
  aggregation: {
    sources: ["vision", "audio", "game_state", "team_data"];
    historicalTracking: boolean;
    patternRecognition: boolean;
  };
  filtering: {
    userRelevantOnly: boolean;
    priorityFiltering: boolean;
    customFilters: boolean;
  };
  presentation: {
    format: "detailed" | "summary" | "compact";
    updateFrequency: number;
    clientOptimized: boolean;
  };
}
```

## 🎮 Feature Bundles for Product Tiers

### **Bronze Bundle**
- Normal vision processing
- Basic event detection
- No voice/commentary
- Solo play only
- Session-based operation

### **Silver Bundle**
- High-speed vision (quality mode)
- Voice chat OR commentary
- Basic learning (session only)
- Team messaging (text only)
- Sound detection

### **Gold Bundle**
- High-speed vision (balanced mode)
- Voice chat with memory
- Persistent learning
- Team coordination (audio + text)
- Stream integration (single platform)
- Performance analytics

### **Platinum Bundle**
- Ultra-high-speed vision
- All detection types
- Full voice personas
- Advanced team features
- Multi-platform streaming
- Intelligence aggregation
- Custom configurations

## 🏗️ Modular Feature Pricing

Instead of fixed bundles, we could offer modular pricing:

### **Core Systems** (Choose One)
- **Vision Only**: $X/month
- **Vision + Voice Chat**: $XX/month
- **Vision + Commentary**: $XX/month

### **Add-On Features** 
- **Learning System**: +$X/month
- **Team Coordination**: +$X/month per member
- **Stream Integration**: +$X/month per platform
- **Sound Intelligence**: +$X/month
- **Performance Analytics**: +$X/month
- **Voice Persona Pack**: +$X/month

### **Processing Tiers** (Choose One)
- **Standard**: Included
- **High-Speed**: +$X/month
- **Ultra-Speed**: +$XX/month

## 🔑 Key Differentiators

1. **Voice vs Commentary**: Mutually exclusive systems
   - Voice Chat: Two-way interactive communication
   - Commentary: One-way game narration

2. **Vision Modes**: Processing speed/quality tradeoffs
   - Normal: Best for casual observation
   - High-Speed: Real-time competitive play
   - Ultra-Speed: Professional/tournament level

3. **Learning Persistence**:
   - Session: Forgets after each session
   - Persistent: Builds knowledge over time
   - Searchable: Full knowledge base features

4. **Team Features**:
   - Text-only: Basic coordination
   - Audio-enabled: Voice team messages
   - Full coordination: Admin controls + analytics

5. **Detection Granularity**:
   - Basic: Events only
   - Advanced: Tactical intelligence
   - Full: All detection types + predictions
