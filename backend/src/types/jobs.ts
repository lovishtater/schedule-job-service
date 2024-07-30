export interface IJob {
  id: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  imageUrl?: string | null;
  description?: string;
  createdAt: string;
}
