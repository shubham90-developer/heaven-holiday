import { Router } from 'express';
import {
  getCities,
  createCity,
  updateCity,
  deleteCity,
} from './contactCities.controller';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getCities);

router.post('/', upload.single('icon'), createCity);
router.put('/:id', upload.single('icon'), updateCity);
router.delete('/:id', deleteCity);

export const contactCitiesRouter = router;
