export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export type MoodType = 'happy' | 'calm' | 'sad' | 'anxious' | 'excited' | 'reflective';

export interface Diary {
  id: number;
  user_id: number;
  title: string;
  content: string;
  mood: MoodType;
  tags?: string[];
  entry_date: string;
  created_at: string;
  updated_at: string;
}

export interface MoodStats {
  mood: MoodType;
  count: number;
  percentage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    data: T[];
    per_page: number;
    total: number;
  };
}

/** Data yang dikirim ke backend saat membuat / mengubah diary. */
export interface DiaryPayload {
  title: string;
  content: string;
  mood: MoodType;
  entry_date: string; // format YYYY-MM-DD
}
