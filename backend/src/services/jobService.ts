import { ioInstance, notifyJobCompleted } from '../socket';
import { IJob } from '../types/jobs';
import { v4 as uuidv4 } from 'uuid';
import { readJobsFromFile, writeJobsToFile } from '../utils/fileDB';
import { JOB_STATUS } from '../utils/constants';

export const createNewJob = (): IJob => {
  const jobId = uuidv4();
  return {
    id: jobId,
    status: JOB_STATUS.PENDING,
    imageUrl: null,
    createdAt: new Date().toISOString(),
  };
};

export const processJob = async (jobId: string): Promise<void> => {
  setTimeout(
    async () => {
      const jobs: IJob[] = readJobsFromFile();
      const jobIndex = jobs.findIndex((job) => job.id === jobId);

      if (jobIndex !== -1) {
        try {
          const { imageUrl, description } = await getRandomFoodImage();
          jobs[jobIndex].status = JOB_STATUS.COMPLETED;
          jobs[jobIndex].imageUrl = imageUrl;
          jobs[jobIndex].description = description;
          writeJobsToFile(jobs);

          notifyJobCompleted(ioInstance, jobs[jobIndex]);
        } catch (error) {
          console.error('Error processing the job:', error);
          jobs[jobIndex].status = JOB_STATUS.FAILED;
          writeJobsToFile(jobs);

          ioInstance.emit('jobCompleted', {
            id: jobId,
            result: 'Failed to fetch the image',
          });
        }
      }
    },
    Math.floor(Math.random() * 5) * 1000 + 5000
  );
};

async function getRandomFoodImage(): Promise<{
  imageUrl: string;
  description: string;
}> {
  const url = `https://api.unsplash.com/photos/random?query=food&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    return {
      imageUrl: data.urls.regular,
      description: data.description,
    };
  } catch (error) {
    console.error('Error fetching the image:', error);
    throw new Error('Error fetching the image');
  }
}
