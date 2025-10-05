import React from 'react';
import { API_CONFIG, ENVIRONMENT } from '../../config/environment';

const EnvStatus = () => {
  // Only show in development
  if (!ENVIRONMENT.IS_DEVELOPMENT) {
    return null;
  }

  const hasApiUrl = !!API_CONFIG.BASE_URL && API_CONFIG.BASE_URL !== 'undefined';
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      background: hasApiUrl ? '#4CAF50' : '#f44336',
      color: 'white',
      padding: '4px 8px',
      fontSize: '12px',
      zIndex: 9999,
      borderRadius: '0 0 0 4px'
    }}>
      ENV: {hasApiUrl ? '✅' : '❌'} API
    </div>
  );
};

export default EnvStatus;