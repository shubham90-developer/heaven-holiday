// routes/empowering.routes.ts
import express from 'express';
import { getEmpowering, updateEmpowering } from './empoweringController';

const router = express.Router();

// GET /api/empowering - Get empowering content
router.get('/', getEmpowering);

// PUT /api/empowering - Update empowering content
router.put('/', updateEmpowering);

export const EmpoweringRouter = router;
