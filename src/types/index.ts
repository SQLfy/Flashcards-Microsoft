export interface Flashcard {
  id: number;
  category: string;
  section: string;
  question: string;
  answer: string;
}

export type StudyMode = 'study' | 'quiz';

export interface QuizScore {
  correct: number;
  incorrect: number;
  total: number;
}
