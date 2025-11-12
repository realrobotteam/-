
import React from 'react';
import { SeoAnalysis, SeoCategory } from '../types';
import ScoreCard from './ScoreCard';
import RecommendationItem from './RecommendationItem';

interface AnalysisResultProps {
  data: SeoAnalysis;
}

const CategorySection: React.FC<{ category: SeoCategory }> = ({ category }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
    <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
       <div className="flex-shrink-0">
         <ScoreCard score={category.score} title={category.title} />
       </div>
       <div className="flex-1">
        <h2 className="text-2xl font-bold text-sky-400 mb-2">{category.title}</h2>
        <p className="text-gray-300">{category.summary}</p>
       </div>
    </div>
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-200 border-b-2 border-gray-600 pb-2 mb-4">توصیه‌ها</h3>
      {category.recommendations.map((rec, index) => (
        <RecommendationItem key={index} recommendation={rec} />
      ))}
    </div>
  </div>
);


const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  const getOverallScoreColor = (s: number) => {
    if (s >= 90) return 'text-green-400';
    if (s >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-2xl font-bold text-gray-200 mb-2">امتیاز کلی سئو</h1>
        <p className={`text-7xl font-extrabold ${getOverallScoreColor(data.overallScore)}`}>{data.overallScore}<span className="text-4xl text-gray-400">/100</span></p>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{data.summary}</p>
      </div>

      <div className="space-y-8">
        <CategorySection category={data.contentAnalysis} />
        <CategorySection category={data.technicalSeo} />
        <CategorySection category={data.performance} />
        <CategorySection category={data.urlStructure} />
      </div>
    </div>
  );
};

export default AnalysisResult;
