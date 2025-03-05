import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface Props {
  isLoading: boolean;
  results: any; // 根据实际数据类型调整
}

export const ResultDisplay: React.FC<Props> = ({ isLoading, results }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="result-container">
      {/* 使用紧凑布局类 */}
      <div className="compact-layout">
        {/* 显示结果内容 */}
        {results && Object.entries(results).map(([key, value], index) => (
          <div key={index} className="compact-layout">
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>
    </div>
  );
};
