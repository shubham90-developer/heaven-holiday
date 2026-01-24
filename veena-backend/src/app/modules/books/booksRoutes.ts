import express from 'express';
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  addImagesToBook,
  removeImageFromBook,
} from './booksController';
import { upload } from '../../config/cloudinary';

const router = express.Router();

// GET all books
router.get('/', getAllBooks);

router.post(
  '/',
  upload.fields([{ name: 'coverImg', maxCount: 1 }, { name: 'images' }]),
  createBook,
);

// UPDATE book

router.put(
  '/:id',
  upload.fields([{ name: 'coverImg', maxCount: 1 }, { name: 'images' }]),
  updateBook,
);

// DELETE book
router.delete('/:id', deleteBook);

router.post('/:id/add-images', upload.array('images'), addImagesToBook);

// REMOVE single image from book
router.delete('/:id/remove-image', removeImageFromBook);

export const booksRouter = router;
