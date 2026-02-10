import express from 'express';
import {
  getBrandsSections,
  getBrandsSectionById,
  createBrandsSection,
  updateBrandsSection,
  deleteBrandsSection,
} from './brandsController';
import { upload } from "../../config/cloudinary";

const router = express.Router();

router.get('/', getBrandsSections);
router.get('/:id', getBrandsSectionById);
router.post('/', upload.array("industries"), createBrandsSection);
router.put('/:id', upload.array("industries"), updateBrandsSection);
router.delete('/:id', deleteBrandsSection);

export const brandsRouter = router;
