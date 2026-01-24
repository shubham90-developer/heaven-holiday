import { Request, Response } from 'express';
import { Office } from './contactOffice.Model';

import {
  createOfficeSchema,
  updateOfficeSchema,
} from './contactOffice.validation';

import { z } from 'zod';

export const getAllOffices = async (req: Request, res: Response) => {
  try {
    const offices = await Office.find();
    res.status(200).json({
      success: true,
      data: offices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching offices',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getOfficeById = async (req: Request, res: Response) => {
  try {
    const office = await Office.findById(req.params.id);
    if (!office) {
      return res.status(404).json({
        success: false,
        message: 'Office not found',
      });
    }

    res.status(200).json({
      success: true,
      data: office,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching office',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createOffice = async (req: Request, res: Response) => {
  try {
    const validatedData = createOfficeSchema.parse(req.body);

    const newOffice = await Office.create(validatedData);

    res.status(201).json({
      success: true,
      message: 'Office created successfully',
      data: newOffice,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating office',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateOffice = async (req: Request, res: Response) => {
  try {
    const validatedData = updateOfficeSchema.parse(req.body);

    const updatedOffice = await Office.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    if (!updatedOffice) {
      return res.status(404).json({
        success: false,
        message: 'Office not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Office updated successfully',
      data: updatedOffice,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating office',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteOffice = async (req: Request, res: Response) => {
  try {
    const deletedOffice = await Office.findByIdAndDelete(req.params.id);

    if (!deletedOffice) {
      return res.status(404).json({
        success: false,
        message: 'Office not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Office deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting office',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
