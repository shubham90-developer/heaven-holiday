import express from 'express';
import {
  getPrivacyPolicy,
  updatePrivacyPolicy,
} from './privacy-policy.controller';

const router = express.Router();

router.get('/', getPrivacyPolicy);

router.put('/', updatePrivacyPolicy);

export const privacyPolicyRouter = router;
