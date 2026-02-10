import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { BrandsSection } from './brandsModel';
import {
  createBrandsSectionSchema,
  updateBrandsSectionSchema,
} from './brandsValidation';


export const getBrandsSections = async (req: Request, res: Response) => {
  try {
    const data = await BrandsSection.find({ isActive: true });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const getBrandsSectionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const data = await BrandsSection.findById(id);

    if (!data) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const createBrandsSection = async (req: Request, res: Response) => {
  try {
    /* ---------- EXTRACT DATA ---------- */
    const { heading, isActive } = req.body;

    const brands = req.body.brands
      ? JSON.parse(req.body.brands)
      : [];

    const files = req.files as Express.Multer.File[];

    const industries = files?.map((file) => ({
      image: file.path, // store path
    })) || [];

    /* ---------- ZOD VALIDATION ---------- */
    const payload = createBrandsSectionSchema.parse({
      heading,
      brands,
      industries,
      isActive: isActive === "true",
    });

    /* ---------- SAVE ---------- */
    const created = await BrandsSection.create(payload);

    return res.status(201).json({
      success: true,
      data: created,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }

    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const updateBrandsSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    /* ---------- EXTRACT DATA ---------- */
    const { heading, isActive } = req.body;

    const brands = req.body.brands
      ? JSON.parse(req.body.brands)
      : [];

    const files = req.files as Express.Multer.File[];

    const industries = files?.length
      ? files.map((file) => ({ image: file.path }))
      : undefined;

    /* ---------- ZOD VALIDATION ---------- */
    const payload = createBrandsSectionSchema.partial().parse({
      heading,
      brands,
      industries,
      isActive: isActive === "true",
    });

    /* ---------- UPDATE ---------- */
    const updated = await BrandsSection.findByIdAndUpdate(
      id,
      {
        ...payload,
        ...(industries && { industries }), // only overwrite if new images
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }

    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteBrandsSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const deleted = await BrandsSection.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!deleted) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};



