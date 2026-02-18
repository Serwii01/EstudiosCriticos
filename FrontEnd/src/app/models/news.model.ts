export interface News {
  id: number;
  title: string;
  description: string;
  longDescription?: string; // <--- NUEVO (Texto largo)
  activityType?: string;    // <--- NUEVO (Huelga, Asamblea...)
  date: Date | string;
  assembly: string;
  imageUrl?: string;        // URL que nos da el backend
}