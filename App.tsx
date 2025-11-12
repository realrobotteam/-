import React, { useState, useCallback } from 'react';
import SeoInputForm from './components/SeoInputForm';
import AnalysisResult from './components/AnalysisResult';
import LoadingSpinner from './components/LoadingSpinner';
import { SeoAnalysis, AnalysisStatus } from './types';
import { analyzeSeoForUrl } from './services/geminiService';

const App: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<SeoAnalysis | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisRequest = useCallback(async (url: string) => {
    setStatus('loading');
    setError(null);
    setAnalysisData(null);
    try {
      const result = await analyzeSeoForUrl(url);
      setAnalysisData(result);
      setStatus('success');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setStatus('error');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center my-8 sm:my-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
            دستیار سئو هوش مصنوعی
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            وب‌سایت خود را با قدرت هوش مصنوعی تحلیل کنید و توصیه‌های عملی برای بهبود رتبه در گوگل دریافت نمایید. (ویژه زبان فارسی)
          </p>
        </header>

        <main className="flex flex-col items-center">
          <div className="w-full max-w-3xl mb-12">
            <SeoInputForm onSubmit={handleAnalysisRequest} isLoading={status === 'loading'} />
          </div>

          <div className="w-full">
            {status === 'loading' && <LoadingSpinner />}
            {status === 'error' && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center max-w-2xl mx-auto">
                <p className="font-bold">خطا در تحلیل</p>
                <p>{error}</p>
              </div>
            )}
            {status === 'success' && analysisData && (
              <AnalysisResult data={analysisData} />
            )}
             {status === 'idle' && (
              <div className="text-center text-gray-500 max-w-md mx-auto">
                <p>برای شروع، آدرس وب‌سایت مورد نظر خود را در کادر بالا وارد کرده و روی دکمه "تحلیل کن" کلیک کنید.</p>
              </div>
            )}
          </div>
        </main>
        
        <footer className="text-center mt-16 py-6 border-t border-gray-800">
            <p className="text-gray-500">
                طراحی شده با ❤️ و هوش مصنوعی در تیم <a href="https://realrobot.ir/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 transition-colors">رئال ربات</a>
            </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
