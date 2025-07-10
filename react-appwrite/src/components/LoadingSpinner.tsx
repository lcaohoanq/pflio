import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="mt-4 text-white text-center">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
