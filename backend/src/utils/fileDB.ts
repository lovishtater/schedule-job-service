import fs from 'fs';
import { IJob } from '../types/jobs';
import path from 'path';

const filePath = 
  path.join(__dirname, '../../jobs.json');
  console.log(filePath);

export const readJobsFromFile = (): IJob[] => {
  if (!fs.existsSync(filePath)) {
    console.log('File not found');
    return [];
  }

  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

export const writeJobsToFile = (jobs: IJob[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
};
