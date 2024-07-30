import { IJob } from "../types/jobTypes";

const BASE_URL = 'http://localhost:3000';

export const fetchJobs = async (): Promise<IJob[]> => {
    const response = await fetch(`${BASE_URL}/api/jobs`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return response.json();
  };
  
  export const createJob = async (): Promise<{ id: string }> => {
    const response = await fetch(`${BASE_URL}/api/jobs`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to create job');
    }
    return response.json();
  };
  
  export const fetchJobById = async (id: string): Promise<IJob> => {
    const response = await fetch(`${BASE_URL}/api/jobs/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch job with ID ${id}`);
    }
    return response.json();
  };
  