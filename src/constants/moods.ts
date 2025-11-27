export interface Mood {
  id: string;
  label: string;
  emoji: string;
}

export const MOODS: Mood[] = [
  {id: 'happy', label: 'Happy', emoji: '😊'},
  {id: 'nostalgic', label: 'Nostalgic', emoji: '🥺'},
  {id: 'sad', label: 'Sad', emoji: '😢'},
  {id: 'love', label: 'Love', emoji: '❤️'},
];

