import { Router } from 'express';
import {
  getAllForms,
  createForm,
  updateFormStatus,
  deleteForm,
} from './formController';

const router = Router();

router.get('/', getAllForms);
router.post('/', createForm);
router.patch('/:id/status', updateFormStatus);
router.delete('/:id', deleteForm);

export const becomePartnerFormRouter = router;
