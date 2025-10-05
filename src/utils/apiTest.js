/**
 * API Testing Utility
 * Use this to test API connectivity from the browser console
 */

import { API_CONFIG } from '../config/environment';

/**
 * Test API connectivity
 * Call this function from browser console: window.testAPI()
 */
export const testAPI = async () => {
  console.log('🧪 Testing API Connection...');
  console.log('📍 API URL:', API_CONFIG.BASE_URL);
  console.log('⏱️ Timeout:', API_CONFIG.TIMEOUT);
  console.log('🔄 Cache Busting:', API_CONFIG.ENABLE_CACHE_BUSTING);
  
  try {
    const startTime = Date.now();
    const cacheBuster = API_CONFIG.ENABLE_CACHE_BUSTING ? `?_t=${Date.now()}` : '';
    const url = `${API_CONFIG.BASE_URL}${cacheBuster}`;
    
    console.log('🚀 Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log('📊 Response Details:');
    console.log('  Status:', response.status, response.statusText);
    console.log('  Duration:', duration + 'ms');
    console.log('  Headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Data received:');
      console.log('  Records:', Array.isArray(data) ? data.length : Object.keys(data).length);
      console.log('  Sample:', data[0] || data);
      return { success: true, data, duration };
    } else {
      const errorText = await response.text();
      console.error('❌ HTTP Error:', response.status, response.statusText);
      console.error('❌ Error Body:', errorText);
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}`, duration };
    }
  } catch (error) {
    console.error('❌ Network Error:', error);
    console.error('  Type:', error.name);
    console.error('  Message:', error.message);
    
    // Provide specific troubleshooting advice
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.log('💡 Troubleshooting: This looks like a network connectivity issue');
      console.log('   - Check your internet connection');
      console.log('   - Verify the API URL is correct');
      console.log('   - Check if the API server is running');
    } else if (error.message.includes('CORS')) {
      console.log('💡 Troubleshooting: This is a CORS (Cross-Origin) issue');
      console.log('   - The API server needs to allow requests from your domain');
      console.log('   - Contact the API provider to whitelist your domain');
    } else if (error.name === 'AbortError' || error.message.includes('timeout')) {
      console.log('💡 Troubleshooting: Request timed out');
      console.log('   - The API is taking too long to respond');
      console.log('   - Try increasing REACT_APP_API_TIMEOUT in .env');
      console.log('   - Check if the API server is overloaded');
    }
    
    return { success: false, error: error.message };
  }
};

/**
 * Test specific course endpoint
 */
export const testCourseEndpoint = async (courseId = '1') => {
  console.log(`🧪 Testing Course Endpoint for ID: ${courseId}`);
  
  try {
    const url = `${API_CONFIG.BASE_URL}/${courseId}`;
    console.log('🚀 Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📊 Response:', response.status, response.statusText);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Course data:', data);
      return { success: true, data };
    } else {
      const errorText = await response.text();
      console.error('❌ Error:', errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error('❌ Error:', error);
    return { success: false, error: error.message };
  }
};

// Make functions available globally for console testing
if (typeof window !== 'undefined') {
  window.testAPI = testAPI;
  window.testCourseEndpoint = testCourseEndpoint;
  console.log('🔧 API test functions available:');
  console.log('  window.testAPI() - Test main API endpoint');
  console.log('  window.testCourseEndpoint(id) - Test specific course endpoint');
}