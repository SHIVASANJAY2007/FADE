export interface AnalysisFlag {
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AnalysisResult {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  flags: AnalysisFlag[];
}
