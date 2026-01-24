import { Router } from 'express';
import {
  getPrinciple,
  updateMainFields,
  addDetail,
  updateDetail,
  deleteDetail,
} from './principlesController';

const router = Router();

router.get('/', getPrinciple);

router.put('/', updateMainFields);

router.post('/details', addDetail);

router.put('/details/:id', updateDetail);

router.delete('/details/:id', deleteDetail);

export const principleRouter = router;
