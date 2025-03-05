import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <span style={{ marginLeft: '8px' }}>分析中...</span>
    </div>
  );
};
