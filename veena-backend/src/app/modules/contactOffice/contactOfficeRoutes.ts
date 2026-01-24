import { Router } from 'express';
import {
  getAllOffices,
  getOfficeById,
  createOffice,
  updateOffice,
  deleteOffice,
} from './contactOffice.Controller';

const router = Router();

router.get('/', getAllOffices);
router.get('/:id', getOfficeById);
router.post('/', createOffice);
router.put('/:id', updateOffice);
router.delete('/:id', deleteOffice);

export const contactOfficeRouter = router;
