import { Router } from 'express';
import { getFooterInfo, updateFooterInfo } from './footerInfoController';

const router = Router();

router.get('/', getFooterInfo);

router.put('/', updateFooterInfo);

export const footerInfoRouter = router;
