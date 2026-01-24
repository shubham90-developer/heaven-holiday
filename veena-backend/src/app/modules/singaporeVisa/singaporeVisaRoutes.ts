// routes/visaInfo.routes.ts
import express from 'express';
import { getVisaInfo, updateVisaInfo } from './singaporeVisaController.';

const router = express.Router();

router.get('/visa-info', getVisaInfo);

router.put('/visa-info', updateVisaInfo);

export const visaInfoRouter = router;
