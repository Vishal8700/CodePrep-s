/**
 * Environment Debug Utility
 * Use this to debug environment variable loading issues
 */

export const debugEnvironment = () => {
  console.log('🔍 Environment Debug Information:');
  console.log('================================');
  
  // Check if we're in the right environment
  console.log('📍 NODE_ENV:', process.env.NODE_ENV);
  console.log('📍 Current URL:', window.location.href);
  
  // List all REACT_APP_ variables
  console.log('\n📋 REACT_APP Environment Variables:');
  const reactAppVars = Object.keys(process.env)
    .filter(key => key.startsWith('REACT_APP_'))
    .sort();
  
  if (reactAppVars.length === 0) {
    console.log('❌ No REACT_APP_ variables found!');
    console.log('💡 This usually means:');
    console.log('   1. .env file is missing or not in the root directory');
    console.log('   2. Development server needs to be restarted');
    console.log('   3. Variables in .env don\'t start with REACT_APP_');
  } else {
    reactAppVars.forEach(key => {
      const value = process.env[key];
      console.log(`  ✅ ${key}: ${value || 'undefined'}`);
    });
  }
  
  // Check specific required variables
  console.log('\n🎯 Required Variables Check:');
  const requiredVars = [
    'REACT_APP_API_BASE_URL',
    'REACT_APP_API_TIMEOUT',
    'REACT_APP_ENABLE_API_CACHE_BUSTING'
  ];
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    const status = value ? '✅' : '❌';
    console.log(`  ${status} ${varName}: ${value || 'MISSING'}`);
  });
  
  // Show what the API config resolves to
  console.log('\n⚙️ Resolved API Configuration:');
  try {
    const { API_CONFIG } = require('../config/environment');
    console.log('  BASE_URL:', API_CONFIG.BASE_URL);
    console.log('  TIMEOUT:', API_CONFIG.TIMEOUT);
    console.log('  ENABLE_CACHE_BUSTING:', API_CONFIG.ENABLE_CACHE_BUSTING);
  } catch (error) {
    console.error('❌ Error loading API config:', error.message);
  }
  
  console.log('\n🔧 Troubleshooting Steps:');
  console.log('1. Ensure .env file exists in project root');
  console.log('2. Restart development server: Ctrl+C then npm start');
  console.log('3. Check .env file format (no spaces around =)');
  console.log('4. Ensure variables start with REACT_APP_');
  
  return {
    hasEnvVars: reactAppVars.length > 0,
    missingRequired: requiredVars.filter(v => !process.env[v]),
    allVars: reactAppVars.reduce((acc, key) => {
      acc[key] = process.env[key];
      return acc;
    }, {})
  };
};

// Make available globally
if (typeof window !== 'undefined') {
  window.debugEnvironment = debugEnvironment;
  console.log('🔧 Environment debug function available: window.debugEnvironment()');
}