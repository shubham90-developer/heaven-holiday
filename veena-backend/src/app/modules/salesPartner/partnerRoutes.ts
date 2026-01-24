import { Router } from 'express';
import {
  getAllCards,
  createCard,
  updateCard,
  deleteCard,
} from './partnerController';
import { upload } from '../../config/cloudinary';

const router = Router();

router.get('/', getAllCards);
router.post('/', upload.single('icon'), createCard);
router.put('/:id', upload.single('icon'), updateCard);
router.delete('/:id', deleteCard);

export const becomePartnerRouter = router;
