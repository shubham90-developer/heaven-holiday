import express from 'express';
import { getCounter, updateCounter } from './counter.controller';
const router = express.Router();

router.get('/', getCounter);
router.put('/', updateCounter);

export const counterRouter = router;
