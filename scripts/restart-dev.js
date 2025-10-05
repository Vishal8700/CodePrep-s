#!/usr/bin/env node

/**
 * Development server restart helper
 * This script helps restart the development server and validates environment
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🔄 Restarting development server...\n');

// First validate environment
console.log('1️⃣ Validating environment configuration...');
try {
  require('./validate-env.js');
} catch (error) {
  console.error('❌ Environment validation failed:', error.message);
  process.exit(1);
}

console.log('\n2️⃣ Starting development server...');
console.log('📝 Note: Environment variables are now loaded fresh\n');

// Start the development server
const startScript = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true,
  cwd: path.join(__dirname, '..')
});

startScript.on('error', (error) => {
  console.error('❌ Failed to start development server:', error);
  process.exit(1);
});

startScript.on('close', (code) => {
  console.log(`\n🏁 Development server exited with code ${code}`);
});