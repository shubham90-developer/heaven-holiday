// routes/howWeHire.routes.ts
import { Router } from 'express';
import {
  getHowWeHire,
  updateHowWeHireInfo,
  addHowWeHireStep,
  updateHowWeHireStep,
  deleteHowWeHireStep,
} from './hireControllers';
import { upload } from '../../config/cloudinary';

const router = Router();

router.get('/', getHowWeHire);

router.put('/info', updateHowWeHireInfo);

router.post('/step', upload.single('img'), addHowWeHireStep);

router.put('/step', upload.single('img'), updateHowWeHireStep);

router.delete('/step', deleteHowWeHireStep);

export const howWeHireRouter = router;
