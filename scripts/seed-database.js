#!/usr/bin/env node

/**
 * JIGA Store Database Seeding Script
 * 
 * This script uploads the 13 core agents and their marketplace listings
 * to Firebase Firestore. Run this after setting up your Firebase project.
 * 
 * Usage:
 *   npm run seed-database
 *   
 * Environment Variables Required:
 *   - FIREBASE_PROJECT_ID
 *   - FIREBASE_PRIVATE_KEY
 *   - FIREBASE_CLIENT_EMAIL
 */

const admin = require('firebase-admin');
const fs = require('fs').promises;
const path = require('path');

// Initialize Firebase Admin
function initializeFirebase() {
  try {
    // Try to use service account from environment
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      };
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else {
      // Fallback to default credentials (for local development with emulator)
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'jiga-store-dev'
      });
    }
    
    console.log('✅ Firebase Admin initialized');
    return admin.firestore();
  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error.message);
    process.exit(1);
  }
}

// Load JSON data
async function loadJsonFile(filename) {
  try {
    const filePath = path.join(__dirname, '..', 'data', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Failed to load ${filename}:`, error.message);
    throw error;
  }
}

// Upload agents to Firestore
async function uploadAgents(db, agents) {
  console.log('\n📤 Uploading agents...');
  const batch = db.batch();
  
  for (const agent of agents) {
    const agentRef = db.collection('agents').doc(agent.id);
    
    // Convert date strings to Firestore timestamps
    const agentData = {
      ...agent,
      createdAt: admin.firestore.Timestamp.fromDate(new Date(agent.createdAt)),
      updatedAt: admin.firestore.Timestamp.fromDate(new Date(agent.updatedAt)),
    };
    
    if (agent.marketplaceStatus?.publishedAt) {
      agentData.marketplaceStatus.publishedAt = admin.firestore.Timestamp.fromDate(
        new Date(agent.marketplaceStatus.publishedAt)
      );
    }
    
    if (agent.achievements) {
      agentData.achievements = agent.achievements.map(achievement => ({
        ...achievement,
        earnedAt: admin.firestore.Timestamp.fromDate(new Date(achievement.earnedAt))
      }));
    }
    
    batch.set(agentRef, agentData);
    console.log(`  ✓ Prepared agent: ${agent.name} (${agent.id})`);
  }
  
  await batch.commit();
  console.log(`✅ Successfully uploaded ${agents.length} agents`);
}

// Upload marketplace listings to Firestore
async function uploadListings(db, listings) {
  console.log('\n📤 Uploading marketplace listings...');
  const batch = db.batch();
  
  for (const listing of listings) {
    const listingRef = db.collection('marketplace').doc(listing.id);
    
    // Convert date strings to Firestore timestamps
    const listingData = {
      ...listing,
      createdAt: admin.firestore.Timestamp.fromDate(new Date(listing.createdAt)),
      updatedAt: admin.firestore.Timestamp.fromDate(new Date(listing.updatedAt)),
    };
    
    batch.set(listingRef, listingData);
    console.log(`  ✓ Prepared listing: ${listing.title}`);
  }
  
  await batch.commit();
  console.log(`✅ Successfully uploaded ${listings.length} marketplace listings`);
}

// Create initial badges in the database
async function createBadges(db) {
  console.log('\n📤 Creating badge definitions...');
  
  const badges = [
    {
      id: 'cod-expert',
      name: 'Call of Duty Expert',
      game: 'Call of Duty',
      imageUrl: '/badges/cod-expert.png',
      specializations: [
        { mode: 'Multiplayer', description: '6v6 tactical combat mastery', threshold: 800 },
        { mode: 'Warzone', description: 'Battle royale survival and strategy', threshold: 1000 },
        { mode: 'Search & Destroy', description: 'Round-based tactical excellence', threshold: 600 },
        { mode: 'Cyber Attack', description: 'Objective-based team tactics', threshold: 500 }
      ],
      requirements: {
        hoursRequired: 500,
        additionalCriteria: []
      },
      totalAwarded: 1, // truWakandan has this badge
      activeSpecialists: 1
    }
  ];
  
  const batch = db.batch();
  
  for (const badge of badges) {
    const badgeRef = db.collection('badges').doc(badge.id);
    batch.set(badgeRef, badge);
    console.log(`  ✓ Prepared badge: ${badge.name}`);
  }
  
  await batch.commit();
  console.log(`✅ Successfully created ${badges.length} badge definitions`);
}

// Create system user
async function createSystemUser(db) {
  console.log('\n📤 Creating system user...');
  
  const systemUser = {
    id: 'system',
    email: 'system@jigastore.com',
    displayName: 'JIGA System',
    avatar: '/avatars/system.png',
    nationality: 'Global',
    timezone: 'UTC',
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
    wallet: {
      balance: 1000000000, // 1 billion DOFs for system operations
      currency: 'DOF',
      history: []
    },
    ownedAgents: [
      'scout-observer-001',
      'nova-coordinator-001',
      'ace-elite-001',
      'zeus-commentator-001',
      'coach-mentor-001',
      'ghost-analyst-001',
      'truwakandan-cod-specialist-001',
      'blaze-commentator-001',
      'echo-assistant-001',
      'fable-mentor-001',
      'onyx-specialist-001',
      'hype-commentator-001',
      'shimmer-mentor-001'
    ],
    publishedSpecialists: ['truwakandan-cod-specialist-001'],
    marketplaceStats: {
      totalEarnings: 0,
      totalHires: 0,
      averageRating: 5.0,
      ratingCount: 0
    },
    preferences: {
      notifications: {
        email: false,
        push: false,
        inApp: false
      },
      privacy: {
        profileVisible: false,
        statsVisible: false
      }
    }
  };
  
  await db.collection('users').doc('system').set(systemUser);
  console.log('✅ Successfully created system user');
}

  // Create initial DOF packages for Shopify
  async function createDOFPackages(db) {
    console.log('\n📤 Creating DOF packages...');
    
    const packages = [
      {
        id: 'dof-bronze',
        name: 'Bronze DOF Package',
        description: '150,000 DOFs - Perfect for getting started (~50 hours with Bronze agents)',
        price: 4.99,
        currency: 'USD',
        dofAmount: 150000,
        tier: 'bronze',
        bonusDOF: 0,
        shopifySKU: 'DOF-150K-BRONZE',
        estimatedHours: {
          bronze: 50,   // 150k / 3k
          silver: 27,   // 150k / 5.5k
          gold: 18,     // 150k / 8k
          platinum: 10  // 150k / 15k
        },
        active: true
      },
      {
        id: 'dof-silver',
        name: 'Silver DOF Package',
        description: '500,000 DOFs - Great value for regular users (~83 hours with Silver agents)',
        price: 14.99,
        currency: 'USD',
        dofAmount: 500000,
        tier: 'silver',
        bonusDOF: 0,
        shopifySKU: 'DOF-500K-SILVER',
        estimatedHours: {
          bronze: 166,  // 500k / 3k
          silver: 83,   // 500k / 6k
          gold: 55,     // 500k / 9k
          platinum: 33  // 500k / 15k
        },
        active: true
      },
      {
        id: 'dof-gold',
        name: 'Gold DOF Package',
        description: '1,500,000 DOFs - Best for active gamers (~150 hours with Gold agents)',
        price: 39.99,
        currency: 'USD',
        dofAmount: 1500000,
        tier: 'gold',
        bonusDOF: 0,
        shopifySKU: 'DOF-1M5-GOLD',
        estimatedHours: {
          bronze: 500,  // 1.5M / 3k
          silver: 250,  // 1.5M / 6k
          gold: 150,    // 1.5M / 10k
          platinum: 100 // 1.5M / 15k
        },
        active: true
      },
      {
        id: 'dof-platinum',
        name: 'Platinum DOF Package',
        description: '5,000,000 DOFs - Ultimate gaming experience (~333 hours with Platinum agents)',
        price: 99.99,
        currency: 'USD',
        dofAmount: 5000000,
        tier: 'platinum',
        bonusDOF: 0,
        shopifySKU: 'DOF-5M-PLATINUM',
        estimatedHours: {
          bronze: 1666, // 5M / 3k
          silver: 833,  // 5M / 6k
          gold: 500,    // 5M / 10k
          platinum: 333 // 5M / 15k
        },
        active: true
      }
    ];
    
    const batch = db.batch();
    
    for (const pkg of packages) {
      const packageRef = db.collection('dof_packages').doc(pkg.id);
      batch.set(packageRef, pkg);
      console.log(`  ✓ Prepared DOF package: ${pkg.name}`);
    }
    
    await batch.commit();
    console.log(`✅ Successfully created ${packages.length} DOF packages`);
  }

// Main seeding function
async function seedDatabase() {
  console.log('🌱 JIGA Store Database Seeding Script');
  console.log('=====================================\n');
  
  try {
    // Initialize Firebase
    const db = initializeFirebase();
    
    // Check if using emulator
    if (process.env.FIRESTORE_EMULATOR_HOST) {
      console.log(`📍 Using Firestore Emulator at ${process.env.FIRESTORE_EMULATOR_HOST}`);
    }
    
    // Load data files
    console.log('📂 Loading data files...');
    const agentsData = await loadJsonFile('core-agents.json');
    const listingsData = await loadJsonFile('marketplace-listings.json');
    
    console.log(`✅ Loaded ${agentsData.agents.length} agents`);
    console.log(`✅ Loaded ${listingsData.listings.length} marketplace listings`);
    
    // Create system user first
    await createSystemUser(db);
    
    // Upload data to Firestore
    await uploadAgents(db, agentsData.agents);
    await uploadListings(db, listingsData.listings);
    await createBadges(db);
    await createDOFPackages(db);
    
    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - System user: 1`);
    console.log(`  - Agents: ${agentsData.agents.length}`);
    console.log(`  - Marketplace listings: ${listingsData.listings.length}`);
    console.log(`  - Badges: 1`);
    console.log(`  - DOF packages: 4`);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding script
seedDatabase(); 