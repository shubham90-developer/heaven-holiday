// routes/faq.routes.ts
import express from 'express';
import {
  getAllFAQs,
  getAllCategories,
  getFAQsByCategory,
  createCategory,
  createFAQ,
  updateCategory,
  updateFAQ,
  deleteCategory,
  deleteFAQ,
} from './faq.controller';

const router = express.Router();

// GET routes
router.get('/', getAllFAQs); // Get all FAQs and categories
router.get('/categories', getAllCategories); // Get only categories
router.get('/category/:category', getFAQsByCategory); // Get FAQs by category name

// POST routes
router.post('/category', createCategory); // Create new category
router.post('/faq', createFAQ); // Create new FAQ

// PUT routes
router.put('/category/:categoryId', updateCategory); // Update category
router.put('/faq/:faqId', updateFAQ); // Update FAQ

// DELETE routes
router.delete('/category/:categoryId', deleteCategory); // Delete category
router.delete('/faq/:faqId', deleteFAQ); // Delete FAQ

export const faqRouter = router;
