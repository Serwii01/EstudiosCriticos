export interface News {
  id: number;
  title: string;
  description: string;
  longDescription?: string; 
  activityType?: string;    
  date: Date | string;
  assembly: string;
  imageUrl?: string;       
}