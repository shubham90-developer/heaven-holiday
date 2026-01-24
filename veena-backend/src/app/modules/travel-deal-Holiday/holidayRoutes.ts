// routes/holidaySection.routes.ts
import express from 'express';
import {
  getHolidaySection,
  updateMainFields,
  addFeature,
  updateFeature,
  deleteFeature,
  updateHolidaySection,
} from './holidayControllers';

const router = express.Router();

router.get('/holiday-section', getHolidaySection);

router.put('/holiday-section/main-fields', updateMainFields);

router.post('/holiday-section/feature', addFeature);

router.put('/holiday-section/feature/:featureId', updateFeature);

router.delete('/holiday-section/feature/:featureId', deleteFeature);

router.put('/holiday-section', updateHolidaySection);

export const travelDealsHeadingRouter = router;
