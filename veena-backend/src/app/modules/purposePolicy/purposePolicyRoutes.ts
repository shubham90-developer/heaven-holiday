import { Router } from 'express';
import {
  getPurposePolicy,
  updateMainFields,
  addCard,
  updateCard,
  deleteCard,
} from './purposepolicyController';
import { upload } from '../../config/cloudinary';

const router = Router();

router.get('/', getPurposePolicy);
router.put('/main-fields', updateMainFields);

// Add upload.single('img') middleware to these two routes:
router.post('/card', upload.single('img'), addCard);
router.put('/card', upload.single('img'), updateCard);
router.delete('/card', deleteCard);

export const purposePolicyRouter = router;
