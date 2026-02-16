import { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';
import { BrandsSection } from './brandsModel';
import {
  createBrandsSectionSchema,
  updateBrandsSectionSchema,
} from './brandsValidation';


export const getBrandsSections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await BrandsSection.find({ isActive: true });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getBrandsSectionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const data = await BrandsSection.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createBrandsSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { heading, isActive } = req.body;

    const brands = req.body.brands
      ? JSON.parse(req.body.brands)
      : [];

    const files = req.files as Express.Multer.File[];

    const industries =
      files?.map((file) => ({
        image: file.path,
      })) || [];

    const payload = createBrandsSectionSchema.parse({
      heading,
      brands,
      industries,
      isActive: isActive === "true",
    });

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

    next(error);
  }
};

export const updateBrandsSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const { heading, isActive } = req.body;

    const brands = req.body.brands
      ? JSON.parse(req.body.brands)
      : [];

    const files = req.files as Express.Multer.File[];

    const industries = files?.length
      ? files.map((file) => ({ image: file.path }))
      : undefined;

    const payload = createBrandsSectionSchema.partial().parse({
      heading,
      brands,
      industries,
      isActive: isActive === "true",
    });

    const updated = await BrandsSection.findByIdAndUpdate(
      id,
      {
        ...payload,
        ...(industries && { industries }),
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

    next(error);
  }
};

export const deleteBrandsSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const deleted = await BrandsSection.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};




