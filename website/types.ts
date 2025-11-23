export enum View {
  LANDING = 'LANDING',
  DOCS = 'DOCS',
}

export interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode; // Simplified for this example to allow JSX in content
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isError?: boolean;
}
