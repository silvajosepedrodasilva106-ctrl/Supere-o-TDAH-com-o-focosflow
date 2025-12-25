
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Habit {
  id: string;
  name: string;
  completed: boolean;
  category: 'foco' | 'saude' | 'rotina';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  link: string;
}

export enum AppSection {
  HOME = 'home',
  DASHBOARD = 'dashboard',
  ASSESSMENT = 'assessment',
  TECHNIQUES = 'techniques',
  EDUCATION = 'education',
  STORE = 'store',
  MINDFULNESS = 'mindfulness'
}
