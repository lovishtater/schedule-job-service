import fs from 'fs';
import { IJob } from '../types/jobs';

const filePath = '../../jobs.json';
const isProduction = process.env.NODE_ENV === 'production';

export const readJobsFromFile = (): IJob[] => {
  if (!fs.existsSync(filePath) || isProduction) {
    return readJobsFromInMemory();
  }

  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

export const writeJobsToFile = (jobs: IJob[]): void => {
  if (isProduction) {
    writeJobsToInMemory(jobs);
    return;
  }

  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
};

// As Vercel does not support writing to the file system, we need to use a different approach to store data.
// In this case, we can use a simple in-memory array to store the job data.

let jobs: IJob[] = [];

export const readJobsFromInMemory = (): IJob[] => jobs;

export const writeJobsToInMemory = (newJobs: IJob[]): void => {
  jobs = newJobs;
};
