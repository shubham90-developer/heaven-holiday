import { Router } from 'express';
import {
  createJobApplication,
  getAllJobApplications,
  updateApplicationStatus,
  deleteJobApplication,
} from './applicationControllers';
import { upload } from '../../config/cloudinary';

const router = Router();

router.post('/', upload.single('resume'), createJobApplication);

router.get('/', getAllJobApplications);

router.patch('/:id/status', updateApplicationStatus);

router.delete('/:id', deleteJobApplication);

export const JobApplicationRouter = router;
