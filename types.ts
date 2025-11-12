
export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  description: string;
}

export interface SeoCategory {
  score: number;
  title: string;
  summary: string;
  recommendations: Recommendation[];
}

export interface SeoAnalysis {
  overallScore: number;
  summary: string;
  contentAnalysis: SeoCategory;
  technicalSeo: SeoCategory;
  performance: SeoCategory;
  urlStructure: SeoCategory;
}

export type AnalysisStatus = 'idle' | 'loading' | 'success' | 'error';
