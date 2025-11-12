
import React from 'react';

interface ScoreCardProps {
  score: number;
  title: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, title }) => {
  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-green-400';
    if (s >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTrackColor = (s: number) => {
    if (s >= 90) return 'stroke-green-400/30';
    if (s >= 50) return 'stroke-yellow-400/30';
    return 'stroke-red-400/30';
  };

  const getProgressColor = (s: number) => {
    if (s >= 90) return 'stroke-green-400';
    if (s >= 50) return 'stroke-yellow-400';
    return 'stroke-red-400';
  };

  const circumference = 2 * Math.PI * 45; // r = 45
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className={`transition-all duration-500 ${getTrackColor(score)}`}
            strokeWidth="10"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
          />
          <circle
            className={`transition-all duration-1000 ease-out ${getProgressColor(score)}`}
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-300">{title}</h3>
    </div>
  );
};

export default ScoreCard;
