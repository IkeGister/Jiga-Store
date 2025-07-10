#!/usr/bin/env node

/**
 * JIGA Store Credentials Verification Script
 * 
 * This script checks that all required environment variables are set
 * and optionally tests connectivity to each service.
 * 
 * Usage:
 *   node scripts/verify-credentials.js          # Check env vars only
 *   node scripts/verify-credentials.js --test   # Test connections
 */

const chalk = require('chalk');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Define required credentials
const REQUIRED_CREDENTIALS = {
  // Firebase/GCP
  'Firebase': {
    vars: ['FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY', 'FIREBASE_CLIENT_EMAIL'],
    test: async () => {
      const admin = require('firebase-admin');
      try {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          })
        });
        await admin.firestore().collection('_test').doc('test').get();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  },

  // Shopify
  'Shopify': {
    vars: ['SHOPIFY_SHOP_DOMAIN', 'SHOPIFY_ADMIN_API_TOKEN'],
    test: async () => {
      try {
        const response = await fetch(
          `https://${process.env.SHOPIFY_SHOP_DOMAIN}/admin/api/2024-01/shop.json`,
          {
            headers: {
              'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN,
            }
          }
        );
        return { success: response.ok, error: response.ok ? null : `Status: ${response.status}` };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  },

  // OpenAI
  'OpenAI': {
    vars: ['OPENAI_API_KEY'],
    test: async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/models', {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          }
        });
        return { success: response.ok, error: response.ok ? null : `Status: ${response.status}` };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  },

  // Google AI
  'Google AI': {
    vars: ['GOOGLE_AI_API_KEY'],
    test: async () => {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GOOGLE_AI_API_KEY}`
        );
        return { success: response.ok, error: response.ok ? null : `Status: ${response.status}` };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  },

  // Algolia
  'Algolia': {
    vars: ['ALGOLIA_APP_ID', 'ALGOLIA_ADMIN_API_KEY'],
    test: async () => {
      try {
        const algoliasearch = require('algoliasearch');
        const client = algoliasearch(
          process.env.ALGOLIA_APP_ID,
          process.env.ALGOLIA_ADMIN_API_KEY
        );
        await client.listIndices();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  },

  // Redis
  'Redis': {
    vars: ['REDIS_URL'],
    optional: true,
    test: async () => {
      try {
        const { createClient } = require('redis');
        const client = createClient({ url: process.env.REDIS_URL });
        await client.connect();
        await client.ping();
        await client.disconnect();
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  },

  // SendGrid
  'SendGrid': {
    vars: ['SENDGRID_API_KEY', 'SENDGRID_FROM_EMAIL'],
    test: async () => {
      try {
        const response = await fetch('https://api.sendgrid.com/v3/scopes', {
          headers: {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          }
        });
        return { success: response.ok, error: response.ok ? null : `Status: ${response.status}` };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  },

  // Google Analytics
  'Google Analytics': {
    vars: ['GA_MEASUREMENT_ID'],
    optional: true,
    test: async () => {
      // GA doesn't have a simple test endpoint
      return { success: true, warning: 'Cannot test GA connectivity' };
    }
  },

  // Sentry
  'Sentry': {
    vars: ['SENTRY_DSN'],
    optional: true,
    test: async () => {
      try {
        const Sentry = require('@sentry/node');
        Sentry.init({ dsn: process.env.SENTRY_DSN });
        // Sentry doesn't provide a simple connectivity test
        return { success: true, warning: 'Sentry initialized, cannot verify connectivity' };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  }
};

// Main verification function
async function verifyCredentials(testConnections = false) {
  console.log(chalk.blue.bold('\n🔍 JIGA Store Credentials Verification\n'));

  let allValid = true;
  const results = {};

  // Check each service
  for (const [service, config] of Object.entries(REQUIRED_CREDENTIALS)) {
    console.log(chalk.yellow(`\n${service}:`));
    
    let serviceValid = true;
    const missingVars = [];

    // Check environment variables
    for (const varName of config.vars) {
      if (process.env[varName]) {
        console.log(chalk.green(`  ✓ ${varName} is set`));
      } else {
        console.log(chalk.red(`  ✗ ${varName} is missing`));
        missingVars.push(varName);
        serviceValid = false;
      }
    }

    // Test connection if requested and all vars present
    if (testConnections && serviceValid && config.test) {
      process.stdout.write(chalk.gray(`  Testing connection...`));
      try {
        const result = await config.test();
        if (result.success) {
          console.log(chalk.green(` Connected! ✓`));
          if (result.warning) {
            console.log(chalk.yellow(`  ⚠ ${result.warning}`));
          }
        } else {
          console.log(chalk.red(` Failed! ✗`));
          console.log(chalk.red(`  Error: ${result.error}`));
          serviceValid = false;
        }
      } catch (error) {
        console.log(chalk.red(` Failed! ✗`));
        console.log(chalk.red(`  Error: ${error.message}`));
        serviceValid = false;
      }
    }

    results[service] = {
      valid: serviceValid,
      optional: config.optional || false,
      missingVars
    };

    if (!serviceValid && !config.optional) {
      allValid = false;
    }
  }

  // Summary
  console.log(chalk.blue.bold('\n📊 Summary:\n'));
  
  const required = Object.entries(results).filter(([_, r]) => !r.optional);
  const optional = Object.entries(results).filter(([_, r]) => r.optional);
  
  console.log(chalk.white('Required Services:'));
  for (const [service, result] of required) {
    const status = result.valid ? chalk.green('✓') : chalk.red('✗');
    console.log(`  ${status} ${service}`);
  }
  
  if (optional.length > 0) {
    console.log(chalk.white('\nOptional Services:'));
    for (const [service, result] of optional) {
      const status = result.valid ? chalk.green('✓') : chalk.yellow('○');
      console.log(`  ${status} ${service}`);
    }
  }

  // Final result
  if (allValid) {
    console.log(chalk.green.bold('\n✅ All required credentials are configured!\n'));
  } else {
    console.log(chalk.red.bold('\n❌ Some required credentials are missing!\n'));
    console.log(chalk.white('To fix:'));
    console.log('1. Copy .env.example to .env');
    console.log('2. Fill in the missing values');
    console.log('3. Run this script again\n');
    process.exit(1);
  }
}

// Create .env.example if it doesn't exist
function createEnvExample() {
  const fs = require('fs');
  const path = require('path');
  
  const envExamplePath = path.join(process.cwd(), '.env.example');
  
  if (!fs.existsSync(envExamplePath)) {
    const template = `# JIGA Store Environment Variables

# Firebase/GCP
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
STORAGE_BUCKET=

# Shopify
SHOPIFY_SHOP_DOMAIN=
SHOPIFY_ADMIN_API_TOKEN=
SHOPIFY_STOREFRONT_API_TOKEN=
SHOPIFY_WEBHOOK_SECRET=

# AI Providers
OPENAI_API_KEY=
GOOGLE_AI_API_KEY=
GOOGLE_TTS_CREDENTIALS_PATH=

# Search
ALGOLIA_APP_ID=
ALGOLIA_ADMIN_API_KEY=
ALGOLIA_SEARCH_API_KEY=

# Caching (Optional)
REDIS_URL=

# Email
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# Moderation
PERSPECTIVE_API_KEY=

# Analytics (Optional)
GA_MEASUREMENT_ID=
SENTRY_DSN=

# CDN (Optional)
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ZONE_ID=

# Environment
NODE_ENV=development
API_URL=http://localhost:3000
APP_URL=http://localhost:3001
`;

    fs.writeFileSync(envExamplePath, template);
    console.log(chalk.green('Created .env.example file'));
  }
}

// Run the script
if (require.main === module) {
  const args = process.argv.slice(2);
  const testConnections = args.includes('--test');
  
  createEnvExample();
  verifyCredentials(testConnections)
    .catch(error => {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    });
}

module.exports = { verifyCredentials }; 