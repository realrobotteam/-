
import React from 'react';
import { Recommendation } from '../types';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';
import InfoCircleIcon from './icons/InfoCircleIcon';

interface RecommendationItemProps {
  recommendation: Recommendation;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ recommendation }) => {
  const priorityStyles = {
    high: {
      icon: <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />,
      text: 'اولویت بالا',
      colors: 'border-red-500/30 bg-red-500/10',
    },
    medium: {
      icon: <InfoCircleIcon className="w-6 h-6 text-yellow-400" />,
      text: 'اولویت متوسط',
      colors: 'border-yellow-500/30 bg-yellow-500/10',
    },
    low: {
      icon: <CheckCircleIcon className="w-6 h-6 text-sky-400" />,
      text: 'اولویت پایین',
      colors: 'border-sky-500/30 bg-sky-500/10',
    },
  };

  const style = priorityStyles[recommendation.priority];

  return (
    <div className={`flex items-start p-4 rounded-lg border ${style.colors} space-x-4 space-x-reverse`}>
      <div className="flex-shrink-0">{style.icon}</div>
      <div>
        <h4 className="font-semibold text-gray-200">{style.text}</h4>
        <p className="text-gray-400">{recommendation.description}</p>
      </div>
    </div>
  );
};

export default RecommendationItem;
