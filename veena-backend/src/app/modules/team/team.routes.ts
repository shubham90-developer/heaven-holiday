import express from 'express';
import {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
} from './team.controller';
import { auth } from '../../middlewares/authMiddleware';
import { upload } from '../../config/cloudinary';

const router = express.Router();

// Public routes
router.get('/', getTeams);
router.get('/:id', getTeamById);

// Admin routes
router.post('/', upload.single('image'), createTeam);
router.put('/:id', upload.single('image'), updateTeam);
router.delete('/:id', deleteTeam);

export const teamRouter = router;
