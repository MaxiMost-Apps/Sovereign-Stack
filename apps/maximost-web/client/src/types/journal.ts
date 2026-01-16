export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  content: string;
  mood: 'positive' | 'neutral' | 'negative';
  tags: string[];
}
