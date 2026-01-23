
export type AuthView = 'login' | 'signup' | 'forgot-password';

export interface User {
  id: string;
  name: string;
  email: string;
}

export type AppPath = 'home' | 'dashboard' | 'platform' | 'solutions' | 'enterprise' | 'help' | 'contact';

export type AppStage = 
  | 'ingest' 
  | 'cleaning' 
  | 'path_selection' 
  | 'objective_selection' 
  | 'deep_analysis' 
  | 'export';

export interface ColumnProfile {
  name: string;
  type: string;
  missing: number;
  unique: number;
  mean?: number;
}

export interface DatasetMetadata {
  fileName: string;
  rowCount: number;
  colCount: number;
  missingValues: number;
  duplicateRows: number;
  columns: ColumnProfile[];
}

export interface DataPoint {
  [key: string]: any;
}

export type AnalyticsPath = 'powerbi' | 'predictive' | 'none';

export interface PowerBIObjectives {
  dataPrep: string[];
  modeling: string[];
  dax: string[];
  visualization: string[];
}

export interface MLObjectives {
  supervised: string[];
  unsupervised: string[];
  advanced: string[];
  evaluation: string[];
}

export interface DeepInsight {
  title: string;
  content: string;
  industryCase: string;
}
