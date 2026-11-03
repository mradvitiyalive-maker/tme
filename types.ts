export interface MemoryPhoto {
  id: string;
  year: string;
  title: string;
  caption: string;
  imageUrl?: string;
  rotation?: string;
  tapeColor?: 'pink' | 'lavender' | 'peach';
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
}

export const CHAPTERS: Chapter[] = [
  { id: 'welcome', number: 1, title: 'The Birthday Welcome 🎂', shortTitle: 'Welcome' },
  { id: 'origin', number: 2, title: 'The Friendship Origin Story 🏫', shortTitle: 'Class 7th' },
  { id: 'museum', number: 3, title: 'The Memory Museum 🏆', shortTitle: 'Museum' },
  { id: 'special-memory', number: 4, title: 'One For The Memories ❤️', shortTitle: 'Special Photo' },
  { id: 'things-i-like', number: 5, title: 'What Do I Like About You? ❤️', shortTitle: 'Unbiased Review' },
  { id: 'open-when-sad', number: 6, title: 'Open This When You’re Sad 🌷', shortTitle: 'When Sad' },
  { id: 'secret-message', number: 7, title: 'The Secret Message 🤫', shortTitle: 'Secret Letter' },
  { id: 'final-surprise', number: 8, title: 'The Final Birthday Surprise 🎉', shortTitle: 'Grand Finale' },
];
