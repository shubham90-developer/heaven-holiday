import { NextFunction, Request, Response } from 'express';
import { TourPackage } from './tourPackageModel';
import {
  createTourPackageSchema,
  addPackageCardSchema,
  updatePackageCardSchema,
} from './tourPackageValidation';
import { appError } from '../../errors/appError';
import { cloudinary } from '../../config/cloudinary';

export const getTourPackage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let tourPackage = await TourPackage.findOne().sort({
      createdAt: -1,
    });

    if (!tourPackage) {
      tourPackage = await TourPackage.create({
        title: 'title',
        subtitle: 'subtitle',
        packages: [],
      });
    }

    // Sort packages by order then by city
    tourPackage.packages.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.city.localeCompare(b.city);
    });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Tour package retrieved successfully',
      data: tourPackage,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// Update title and subtitle
export const updateTitleSubtitle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, subtitle } = req.body;

    if (!title && !subtitle) {
      next(new appError('Title or subtitle is required', 400));
      return;
    }

    const existing = await TourPackage.findOne();

    if (existing) {
      // Update existing
      if (title) existing.title = title;
      if (subtitle) existing.subtitle = subtitle;
      await existing.save();

      res.json({
        success: true,
        statusCode: 200,
        message: 'Tour package updated successfully',
        data: existing,
      });
      return;
    } else {
      // Create new
      const validated = createTourPackageSchema.parse({
        title: title || 'Default Title',
        subtitle: subtitle || 'Default Subtitle',
        packages: [],
      });

      const tourPackage = new TourPackage(validated);
      await tourPackage.save();

      res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Tour package created successfully',
        data: tourPackage,
      });
      return;
    }
  } catch (error) {
    next(error);
  }
};

// Add a package card
export const addPackageCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      city,
      tours,
      departures,
      price,
      badge,
      status,
      order,
      link,
      cities,
      days,
      startOn,
      joinPrice,
    } = req.body;

    if (!req.file) {
      next(new appError('Image is required', 400));
      return;
    }

    const tourPackage = await TourPackage.findOne();

    if (!tourPackage) {
      next(
        new appError(
          'Tour package not found. Please create tour package first.',
          404,
        ),
      );
      return;
    }

    // Check if package with same city already exists
    const existingPackage = tourPackage.packages.find(
      (pkg) => pkg.city.toLowerCase() === city.toLowerCase(),
    );

    if (existingPackage) {
      if (req.file?.path) {
        const publicId = req.file.path.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`tour-packages/${publicId}`);
        }
      }
      next(new appError('Package with this city already exists', 400));
      return;
    }

    const image = req.file.path;
    const validated = addPackageCardSchema.parse({
      city,
      tours: parseInt(tours),
      departures: parseInt(departures),
      price,
      image,
      badge: badge || undefined,
      status:
        status === 'Active' || status === true || status === 'true'
          ? 'Active'
          : 'Inactive',
      order: order ? parseInt(order) : 0,
      link: link || '/tour-details',
      cities: typeof cities === 'string' ? JSON.parse(cities) : cities,
      days: parseInt(days),
      startOn: new Date(startOn),
      joinPrice,
    });

    tourPackage.packages.push(validated);
    await tourPackage.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Package card added successfully',
      data: tourPackage,
    });
    return;
  } catch (error) {
    if (req.file?.path) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`tour-packages/${publicId}`);
      }
    }
    next(error);
  }
};

// Update a package card
export const updatePackageCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { packageId } = req.params;
    const {
      city,
      tours,
      departures,
      price,
      badge,
      status,
      order,
      link,
      cities,
      days,
      startOn,
      joinPrice,
    } = req.body;

    const tourPackage = await TourPackage.findOne({
      'packages._id': packageId,
    });

    if (!tourPackage) {
      if (req.file?.path) {
        const publicId = req.file.path.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`tour-packages/${publicId}`);
        }
      }
      next(new appError('Package card not found', 404));
      return;
    }

    const packageCard = tourPackage.packages.find(
      (pkg) => pkg._id?.toString() === packageId,
    );

    if (!packageCard) {
      if (req.file?.path) {
        const publicId = req.file.path.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`tour-packages/${publicId}`);
        }
      }
      next(new appError('Package card not found', 404));
      return;
    }

    // Check if city is being changed to an existing one
    if (city && city !== packageCard.city) {
      const existingPackage = tourPackage.packages.find(
        (pkg) => pkg.city.toLowerCase() === city.toLowerCase(),
      );

      if (existingPackage) {
        if (req.file?.path) {
          const publicId = req.file.path.split('/').pop()?.split('.')[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`tour-packages/${publicId}`);
          }
        }
        next(new appError('Package with this city already exists', 400));
        return;
      }
    }

    // Prepare update data
    const updateData: any = {};

    if (city) updateData.city = city;
    if (tours !== undefined) updateData.tours = parseInt(tours);
    if (departures !== undefined) updateData.departures = parseInt(departures);
    if (price) updateData.price = price;
    if (badge !== undefined) updateData.badge = badge;
    if (status !== undefined) {
      updateData.status =
        status === 'Active' || status === true || status === 'true'
          ? 'Active'
          : 'Inactive';
    }
    if (order !== undefined) updateData.order = parseInt(order);
    if (req.file) updateData.image = req.file.path;
    if (link) updateData.link = link;
    if (cities !== undefined)
      updateData.cities =
        typeof cities === 'string' ? JSON.parse(cities) : cities;
    if (days !== undefined) updateData.days = parseInt(days);
    if (startOn) updateData.startOn = new Date(startOn);
    if (joinPrice) updateData.joinPrice = joinPrice;

    // Validate with Zod
    const validated = updatePackageCardSchema.parse(updateData);

    // Apply validated updates to packageCard
    if (validated.city) packageCard.city = validated.city;
    if (validated.tours !== undefined) packageCard.tours = validated.tours;
    if (validated.departures !== undefined)
      packageCard.departures = validated.departures;
    if (validated.price) packageCard.price = validated.price;
    if (validated.badge !== undefined) packageCard.badge = validated.badge;
    if (validated.status) packageCard.status = validated.status;
    if (validated.order !== undefined) packageCard.order = validated.order;
    if (validated.link) packageCard.link = validated.link;
    if (validated.cities) packageCard.cities = validated.cities;
    if (validated.days !== undefined) packageCard.days = validated.days;
    if (validated.startOn) packageCard.startOn = validated.startOn;
    if (validated.joinPrice) packageCard.joinPrice = validated.joinPrice;

    // Handle image update
    if (validated.image && req.file) {
      const oldImagePublicId = packageCard.image
        .split('/')
        .pop()
        ?.split('.')[0];
      if (oldImagePublicId) {
        await cloudinary.uploader.destroy(`tour-packages/${oldImagePublicId}`);
      }
      packageCard.image = validated.image;
    }

    await tourPackage.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Package card updated successfully',
      data: tourPackage,
    });
    return;
  } catch (error) {
    if (req.file?.path) {
      const publicId = req.file.path.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`tour-packages/${publicId}`);
      }
    }
    next(error);
  }
};

// Delete a package card
export const deletePackageCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { packageId } = req.params;

    const tourPackage = await TourPackage.findOne({
      'packages._id': packageId,
    });

    if (!tourPackage) {
      next(new appError('Package card not found', 404));
      return;
    }

    const packageIndex = tourPackage.packages.findIndex(
      (pkg) => pkg._id?.toString() === packageId,
    );

    if (packageIndex === -1) {
      next(new appError('Package card not found', 404));
      return;
    }

    // Delete image from cloudinary
    const packageCard = tourPackage.packages[packageIndex];
    const imagePublicId = packageCard.image.split('/').pop()?.split('.')[0];
    if (imagePublicId) {
      await cloudinary.uploader.destroy(`tour-packages/${imagePublicId}`);
    }

    // Remove package from array
    tourPackage.packages.splice(packageIndex, 1);
    await tourPackage.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Package card deleted successfully',
      data: tourPackage,
    });
    return;
  } catch (error) {
    next(error);
  }
};
