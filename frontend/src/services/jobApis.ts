import { IJob } from "../types/jobTypes";

const BASE_URL = `${process.env.REACT_APP_SERVER_URL}/api`;

export const fetchJobs = async (): Promise<IJob[]> => {
  const response = await fetch(`${BASE_URL}/jobs`);
  if (!response.ok) {
    alert("Failed to fetch jobs");
    return [];
  }
  return response.json();
};

export const createJob = async (): Promise<{ id: string }> => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
  });
  if (!response.ok) {
    alert("Failed to create job");
    return { id: "" };
  }
  return response.json();
};

export const fetchJobById = async (id: string): Promise<IJob> => {
  const response = await fetch(`${BASE_URL}/jobs/${id}`);
  if (!response.ok) {
    alert("Failed to fetch job");
    return {} as IJob;
  }
  return response.json();
};
