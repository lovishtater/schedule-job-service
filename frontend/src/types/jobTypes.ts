export interface IJob {
    id: string;
    status: string;
    imageUrl: string | null;
    description?: string | null;
    createdAt: string;
  }