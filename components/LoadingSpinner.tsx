
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4 p-8">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-400"></div>
    <p className="text-sky-300 text-lg font-semibold">در حال تحلیل... لطفاً منتظر بمانید.</p>
  </div>
);

export default LoadingSpinner;
