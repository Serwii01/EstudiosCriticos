export interface News {
  id: number;
  title: string;
  imageUrl?: string;
  assembly: 'sevilla' | 'malaga' | 'general';  // Minúscula para tu función
  description: string;
  date: string;  // Formatea en backend o aquí
  details?: string;
}
