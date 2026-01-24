// faq.route.ts
import { Router } from 'express';
import { createFAQ, getAllFAQs, updateFAQ, deleteFAQ } from './faqControllers';

const router = Router();

// Create a new FAQ
router.post('/', createFAQ);

// Get all FAQs
router.get('/', getAllFAQs);

// Update an FAQ by ID
router.patch('/:id', updateFAQ);

// Delete an FAQ by ID
router.delete('/:id', deleteFAQ);

export const CSRFAQRouter = router;
