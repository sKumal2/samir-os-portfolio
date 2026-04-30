export type WindowType =
  | 'about' | 'projects' | 'education' | 'skills' | 'experience' | 'contact'
  | 'fun' | 'secret' | 'terminal'
  | 'project-fashion' | 'project-rag' | 'project-lesion';

export interface WindowState {
  id: string;
  type: WindowType;
  title: string;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  savedX?: number;
  savedY?: number;
  savedW?: number;
  savedH?: number;
}
