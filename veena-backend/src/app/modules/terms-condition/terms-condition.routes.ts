import express from 'express';
import {
  getTermsCondition,
  updateTermsCondition,
} from './terms-condition.controller';
import { auth } from '../../middlewares/authMiddleware';
import { adminMiddleware } from '../../middlewares/adminMiddleware';

const router = express.Router();

router.get('/', getTermsCondition);

router.put('/', updateTermsCondition);

export const TermsConditionRouter = router;
