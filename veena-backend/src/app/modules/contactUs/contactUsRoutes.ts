import { Router } from 'express';
import {
  getContactDetails,
  updateContactDetails,
  patchContactDetails,
} from './contactUsController';

const router = Router();

// GET contact details
router.get('/', getContactDetails);

// PUT -> full update / create
router.put('/', updateContactDetails);

// PATCH -> partial update
router.patch('/', patchContactDetails);

export const contactRouter = router;
