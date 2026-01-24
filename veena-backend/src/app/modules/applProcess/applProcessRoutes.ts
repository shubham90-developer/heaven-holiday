import { Router } from 'express';
import {
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from './applProcessController';
import { upload } from '../../config/cloudinary';

const router = Router();

router.get('/', getAllApplications);
router.post('/', upload.single('image'), createApplication);
router.put('/:id', upload.single('image'), updateApplication);
router.delete('/:id', deleteApplication);

export const applnProcessRouter = router;
