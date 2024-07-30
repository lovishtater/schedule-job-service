import { IJob } from "../types/jobTypes";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3002/api";

export const fetchJobs = async (): Promise<IJob[]> => {
    const response = await fetch(`${BASE_URL}/jobs`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return response.json();
  };
  
  export const createJob = async (): Promise<{ id: string }> => {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to create job');
    }
    return response.json();
  };
  
  export const fetchJobById = async (id: string): Promise<IJob> => {
    const response = await fetch(`${BASE_URL}/jobs/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch job with ID ${id}`);
    }
    return response.json();
  };
  