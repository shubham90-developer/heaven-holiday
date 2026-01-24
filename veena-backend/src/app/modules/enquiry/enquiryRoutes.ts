import express from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  updateEnquiry,
  deleteEnquiry,
} from './enquiryController';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', getAllEnquiries);
router.put('/:id', updateEnquiry);
router.delete('/:id', deleteEnquiry);

export const enquiryRouter = router;
