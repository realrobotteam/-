
import React, { useState } from 'react';

interface SeoInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const SeoInputForm: React.FC<SeoInputFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('لطفاً یک آدرس وب‌سایت وارد کنید.');
      return;
    }
    try {
      new URL(url);
      setError('');
      onSubmit(url);
    } catch (_) {
      setError('لطفاً یک آدرس معتبر وارد کنید (مثال: https://example.com).');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col sm:flex-row items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700 shadow-lg backdrop-blur-sm">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="آدرس وب‌سایت خود را وارد کنید (مثال: https://example.com)"
          className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-300 placeholder:text-gray-500"
          disabled={isLoading}
          dir="ltr"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 bg-sky-600 text-white font-bold rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-sky-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? 'در حال تحلیل...' : 'تحلیل کن'}
        </button>
      </div>
      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
    </form>
  );
};

export default SeoInputForm;
