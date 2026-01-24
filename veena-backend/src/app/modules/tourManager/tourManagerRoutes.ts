import express from 'express';
import {
  getTourManagers,
  createTourManager,
  updateTourManager,
} from './tourManagerController';

const router = express.Router();

router.get('/', getTourManagers);

router.post('/', createTourManager);

router.put('/:id', updateTourManager);

export const tourManagerRouter = router;
