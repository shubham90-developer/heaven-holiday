// routes/department.route.ts
import express from 'express';
import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  toggleDepartmentStatus,
} from './openingController';

import {
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
  toggleLocationStatus,
} from './openingController';

import {
  getJobPage,
  updateJobPageHeader,
  createJobItem,
  getAllJobItems,
  updateJobItem,
  deleteJobItem,
  updateJobItemStatus,
} from './openingController';
const router = express.Router();

router.post('/department', createDepartment);
router.get('/department', getAllDepartments);

router.put('/department/:id', updateDepartment);
router.delete('/department/:id', deleteDepartment);
router.patch('/department/:id/toggle-status', toggleDepartmentStatus);

router.post('/location', createLocation);
router.get('/location', getAllLocations);

router.put('/location/:id', updateLocation);
router.delete('/location/:id', deleteLocation);
router.patch('/location/:id/toggle-status', toggleLocationStatus);

// Job Page (title, subtitle)
router.get('/job/page', getJobPage);
router.patch('/job/page/header', updateJobPageHeader);

// Job Items CRUD
router.post('/job/items', createJobItem);
router.get('/job/items', getAllJobItems);

router.put('/job/items/:jobId', updateJobItem);
router.delete('/job/items/:jobId', deleteJobItem);
router.patch('/job/items/:jobId/status', updateJobItemStatus);

export const JobRouter = router;
export const LocationRouter = router;
export const DepartmentRouter = router;
