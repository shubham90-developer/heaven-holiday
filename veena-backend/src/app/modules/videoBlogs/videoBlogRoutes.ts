import { Router } from 'express';
import {
  getAllVideoBlogs,
  createVideoBlog,
  updateVideoBlog,
  deleteVideoBlog,
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from './videoBlogController';

const router = Router();

// ========== VIDEO BLOG ROUTES ==========

// Get all video blogs
router.get('/', getAllVideoBlogs);

// Create video blog
router.post('/', createVideoBlog);

// Update video blog by ID
router.put('/:id', updateVideoBlog);

// Delete video blog by ID
router.delete('/:id', deleteVideoBlog);

// ========== CATEGORY ROUTES ==========

// Get all categories
router.get('/categories', getAllCategories);

// Add category
router.post('/categories', addCategory);

// Update category by categoryId
router.put('/categories/:categoryId', updateCategory);

// Delete category by categoryId
router.delete('/categories/:categoryId', deleteCategory);

export const videoBlogRouter = router;
