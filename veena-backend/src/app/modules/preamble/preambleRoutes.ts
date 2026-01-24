import express from 'express';
import {
  getPreamble,
  updateMainFields,
  addTableRow,
  updateTableRow,
  deleteTableRow,
  createPreamble,
} from './preambleController';

const router = express.Router();

// Get Preamble
router.get('/preamble', getPreamble);

// Update Main Fields (heading, paragraph, subtitle)
router.patch('/preamble/main-fields', updateMainFields);

// Add Table Row
router.post('/preamble/table-row', addTableRow);
router.post('/preamble', createPreamble);

// Update Table Row
router.patch('/preamble/table-row', updateTableRow);

// Delete Table Row
router.delete('/preamble/table-row', deleteTableRow);

export const preambleRouter = router;
