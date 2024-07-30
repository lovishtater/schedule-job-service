import { Request, Response } from 'express';
import { readJobsFromFile, writeJobsToFile } from '../utils/fileDB';
import { IJob } from '../types/jobs';
import { createNewJob, processJob } from '../services/jobService';

export const createJob = (req: Request, res: Response): void => {
  try {
    const jobs: IJob[] = readJobsFromFile();
    const newJob = createNewJob();
    const jobId = newJob.id;

    jobs.push(newJob);
    writeJobsToFile(jobs);

    processJob(jobId);
    res.json({ id: jobId });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllJobs = (req: Request, res: Response): void => {
  try {
    const jobs: IJob[] = readJobsFromFile();
    res.json(jobs);
  } catch (error) {
    console.error('Error getting jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getJobById = (req: Request, res: Response): void => {
  try {
    const jobs: IJob[] = readJobsFromFile();
    const job = jobs.find((job) => job.id === req.params.id);

    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.json(job);
  } catch (error) {
    console.error('Error getting job by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
