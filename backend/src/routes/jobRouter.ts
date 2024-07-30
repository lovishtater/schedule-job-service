import { Router } from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
} from '../controllers/jobController';

const router = Router();

router.post('/jobs', createJob);

router.get('/jobs', getAllJobs);

router.get('/jobs/:id', getJobById);

export default router;
