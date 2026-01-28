import { NextFunction, Request, Response } from 'express';
import { Category, TourPackageCard } from './tourPackageModel';
import { Includes } from '../toursIncluded/toursIncludedModel';

import {
  createCategorySchema,
  updateCategorySchema,
  createTourPackageCardSchema,
  updateTourPackageCardSchema,
  getCategoryQuerySchema,
  getTourPackageCardQuerySchema,
  paginationSchema,
  mongoIdSchema,
  CreateCategoryInput,
  UpdateCategoryInput,
  CreateTourPackageCardInput,
  UpdateTourPackageCardInput,
} from './tourPackageValidation';
import { appError } from '../../errors/appError';
import { cloudinary } from '../../config/cloudinary';
import { ZodError } from 'zod';

const parseJSON = <T>(value: string | T): T => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value as T;
    }
  }
  return value;
};

const parseBoolean = (value: any): boolean => {
  return value === 'true' || value === true;
};

const cleanupImages = async (files: Express.Multer.File[], folder: string) => {
  for (const file of files) {
    const publicId = file.path.split('/').pop()?.split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`${folder}/${publicId}`);
    }
  }
};

const handleZodError = (error: any, next: NextFunction) => {
  if (error instanceof ZodError) {
    const errorMessage = error.issues
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    next(new appError(errorMessage, 400));
  } else {
    next(error);
  }
};

const validateTourIncludes = async (
  includesIds: string[],
): Promise<boolean> => {
  if (!includesIds || includesIds.length === 0) {
    return true; // Empty array is valid
  }

  // Check if all IDs are valid MongoDB ObjectIds
  const validIds = includesIds.every((id) => /^[a-f\d]{24}$/i.test(id));
  if (!validIds) {
    throw new appError('Invalid tour includes ID format', 400);
  }

  // Check if all includes exist and are active (lowercase 'active' per includes schema)
  const includes = await Includes.find({
    _id: { $in: includesIds },
    status: 'active',
  });

  if (includes.length !== includesIds.length) {
    throw new appError('One or more tour includes not found or inactive', 400);
  }

  return true;
};

// NEW: Helper to update departure status based on available seats
const updateDepartureStatus = (
  availableSeats: number,
  totalSeats: number,
): string => {
  if (availableSeats === 0) return 'Sold Out';
  const percentageFilled = ((totalSeats - availableSeats) / totalSeats) * 100;
  if (percentageFilled >= 80) return 'Filling Fast';
  return 'Available';
};

// ============= CATEGORY CONTROLLERS =============

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Validate image upload
    if (!req.file) {
      next(new appError('Image is required', 400));
      return;
    }

    // Prepare category data
    const categoryData: CreateCategoryInput = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      guests: req.body.guests,
      image: req.file.path,
      badge: req.body.badge,
      categoryType: req.body.categoryType,
      status: req.body.status || 'Active',
    };

    // Validate and create
    const validated = createCategorySchema.parse(categoryData);
    const category = await Category.create(validated);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error: any) {
    if (req.file) {
      await cleanupImages([req.file], 'categories');
    }

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      next(new appError('Category with this name already exists', 400));
      return;
    }

    handleZodError(error, next);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Parse and validate query params
    const queryParams = getCategoryQuerySchema.parse(req.query);
    const pagination = paginationSchema.parse({
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
      sortBy: req.query.sortBy || 'createdAt',
      sortOrder: req.query.sortOrder || 'desc',
    });

    // Build filter
    const filter: any = {};
    if (queryParams.categoryType)
      filter.categoryType = queryParams.categoryType;
    if (queryParams.status) filter.status = queryParams.status;
    if (queryParams.name) filter.name = new RegExp(queryParams.name, 'i');

    // Calculate pagination
    const skip = (pagination.page - 1) * pagination.limit;
    const sortOptions: any = {};
    if (pagination.sortBy) {
      sortOptions[pagination.sortBy] = pagination.sortOrder === 'asc' ? 1 : -1;
    }

    // Execute query
    const [categories, total] = await Promise.all([
      Category.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(pagination.limit),
      Category.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: categories,
      pagination: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(total / pagination.limit),
      },
    });
  } catch (error) {
    handleZodError(error, next);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { categoryId } = req.params;

    // Validate MongoDB ID
    mongoIdSchema.parse(categoryId);

    const category = await Category.findById(categoryId);
    if (!category) {
      if (req.file) {
        await cleanupImages([req.file], 'categories');
      }
      next(new appError('Category not found', 404));
      return;
    }

    // Check for duplicate name
    if (req.body.name && req.body.name !== category.name) {
      const existingName = await Category.findOne({ name: req.body.name });
      if (existingName) {
        if (req.file) {
          await cleanupImages([req.file], 'categories');
        }
        next(new appError('Category with this name already exists', 400));
        return;
      }
    }

    // Prepare update data
    const updateData: Partial<UpdateCategoryInput> = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description !== undefined)
      updateData.description = req.body.description;
    if (req.body.guests) updateData.guests = req.body.guests;
    if (req.body.badge !== undefined) updateData.badge = req.body.badge;
    if (req.body.categoryType) updateData.categoryType = req.body.categoryType;
    if (req.body.status !== undefined) updateData.status = req.body.status;

    // Handle image update
    if (req.file) {
      const oldImagePublicId = category.image.split('/').pop()?.split('.')[0];
      if (oldImagePublicId) {
        await cloudinary.uploader.destroy(`categories/${oldImagePublicId}`);
      }
      updateData.image = req.file.path;
    }

    // Validate and update
    const validated = updateCategorySchema.parse(updateData);
    Object.assign(category, validated);
    await category.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    if (req.file) {
      await cleanupImages([req.file], 'categories');
    }
    handleZodError(error, next);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { categoryId } = req.params;

    // Validate MongoDB ID
    mongoIdSchema.parse(categoryId);

    const category = await Category.findById(categoryId);
    if (!category) {
      next(new appError('Category not found', 404));
      return;
    }

    // Check for associated tour package cards
    const tourPackageCardsCount = await TourPackageCard.countDocuments({
      category: categoryId,
    });

    if (tourPackageCardsCount > 0) {
      next(
        new appError(
          'Cannot delete category with associated tour package cards',
          400,
        ),
      );
      return;
    }

    // Delete image from cloudinary
    const imagePublicId = category.image.split('/').pop()?.split('.')[0];
    if (imagePublicId) {
      await cloudinary.uploader.destroy(`categories/${imagePublicId}`);
    }

    await Category.findByIdAndDelete(categoryId);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    handleZodError(error, next);
  }
};

// ============= TOUR PACKAGE CARD CONTROLLERS =============

export const createTourPackageCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Validate images upload
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      next(new appError('At least one image is required', 400));
      return;
    }

    // Validate category exists
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
      await cleanupImages(
        req.files as Express.Multer.File[],
        'tour-package-cards',
      );
      next(new appError('Category not found', 404));
      return;
    }

    const files = req.files as Express.Multer.File[];

    // Parse tour includes (admin selected from checkboxes)
    const tourIncludes = req.body.tourIncludes
      ? parseJSON(req.body.tourIncludes)
      : [];

    // Validate tour includes if provided
    if (tourIncludes && tourIncludes.length > 0) {
      try {
        await validateTourIncludes(tourIncludes);
      } catch (error) {
        await cleanupImages(files, 'tour-package-cards');
        next(error);
        return;
      }
    }

    // Parse departures and auto-calculate status
    const departures = parseJSON(req.body.departures);
    if (departures && Array.isArray(departures)) {
      departures.forEach((departure: any) => {
        departure.status = updateDepartureStatus(
          departure.availableSeats,
          departure.totalSeats,
        );
      });
    }

    // Parse itinerary
    const itinerary = req.body.itinerary ? parseJSON(req.body.itinerary) : [];

    // ✅ Parse flights, accommodations, and reporting/dropping
    const flights = req.body.flights ? parseJSON(req.body.flights) : [];
    const accommodations = req.body.accommodations
      ? parseJSON(req.body.accommodations)
      : [];
    const reportingDropping = req.body.reportingDropping
      ? parseJSON(req.body.reportingDropping)
      : [];

    // Prepare package card data
    const packageCardData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      category: req.body.category,
      galleryImages: files.map((file) => file.path),
      badge: req.body.badge,
      metaDescription: req.body.metaDescription,
      featured: parseBoolean(req.body.featured),
      status: req.body.status || 'Active',
      tourType: req.body.tourType,
      days: parseInt(req.body.days),
      nights: parseInt(req.body.nights),
      states: parseJSON(req.body.states),
      route: req.body.route,
      cityDetails: parseJSON(req.body.cityDetails),
      baseFullPackagePrice: parseFloat(req.body.baseFullPackagePrice),
      baseJoiningPrice: parseFloat(req.body.baseJoiningPrice),
      priceNote: req.body.priceNote,
      departures: departures,
      tourManagerIncluded: parseBoolean(req.body.tourManagerIncluded),
      tourManagerNote: req.body.tourManagerNote,
      whyTravel: req.body.whyTravel ? parseJSON(req.body.whyTravel) : [],
      tourIncludes: tourIncludes,
      itinerary: itinerary,
      // ✅ Add new fields
      flights: flights,
      accommodations: accommodations,
      reportingDropping: reportingDropping,
    };

    // Validate and create
    const validated = createTourPackageCardSchema.parse(packageCardData);
    const tourPackageCard = await TourPackageCard.create(validated);

    // Populate both category and tourIncludes for response
    await tourPackageCard.populate([
      { path: 'category' },
      { path: 'tourIncludes' },
    ]);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Tour package card created successfully',
      data: tourPackageCard,
    });
  } catch (error) {
    if (req.files && Array.isArray(req.files)) {
      await cleanupImages(
        req.files as Express.Multer.File[],
        'tour-package-cards',
      );
    }
    handleZodError(error, next);
  }
};

export const getTourPackageCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Parse and validate query params
    const queryParams = getTourPackageCardQuerySchema.parse(req.query);
    const pagination = paginationSchema.parse({
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 10,
      sortBy: req.query.sortBy || 'createdAt',
      sortOrder: req.query.sortOrder || 'desc',
    });

    // Build filter
    const filter: any = {};
    if (queryParams.category) filter.category = queryParams.category;
    if (queryParams.status) filter.status = queryParams.status;
    if (queryParams.featured !== undefined)
      filter.featured = queryParams.featured;
    if (queryParams.tourType)
      filter.tourType = new RegExp(queryParams.tourType, 'i');
    if (queryParams.minPrice || queryParams.maxPrice) {
      filter.baseFullPackagePrice = {};
      if (queryParams.minPrice)
        filter.baseFullPackagePrice.$gte = queryParams.minPrice;
      if (queryParams.maxPrice)
        filter.baseFullPackagePrice.$lte = queryParams.maxPrice;
    }

    // NEW: Departure-based filters
    if (queryParams.departureCity) {
      filter['departures.city'] = new RegExp(queryParams.departureCity, 'i');
    }
    if (queryParams.departureDateFrom || queryParams.departureDateTo) {
      filter['departures.date'] = {};
      if (queryParams.departureDateFrom)
        filter['departures.date'].$gte = queryParams.departureDateFrom;
      if (queryParams.departureDateTo)
        filter['departures.date'].$lte = queryParams.departureDateTo;
    }
    if (queryParams.departureStatus) {
      filter['departures.status'] = queryParams.departureStatus;
    }
    if (queryParams.minSeats) {
      filter['departures.availableSeats'] = { $gte: queryParams.minSeats };
    }

    // Calculate pagination
    const skip = (pagination.page - 1) * pagination.limit;
    const sortOptions: any = {};
    if (pagination.sortBy) {
      sortOptions[pagination.sortBy] = pagination.sortOrder === 'asc' ? 1 : -1;
    }

    // Execute query with populated includes
    const [tourPackageCards, total] = await Promise.all([
      TourPackageCard.find(filter)
        .populate('category')
        .populate('tourIncludes') // Populate includes for display
        .sort(sortOptions)
        .skip(skip)
        .limit(pagination.limit),
      TourPackageCard.countDocuments(filter),
    ]);

    // NEW: Add computed metadata for each tour
    const toursWithMetadata = tourPackageCards.map((tour: any) => {
      const tourObj = tour.toObject();
      const uniqueCities = [
        ...new Set(tourObj.departures.map((d: any) => d.city)),
      ];
      const totalDates = tourObj.departures.length;

      return {
        ...tourObj,
        metadata: {
          totalDepartures: totalDates,
          uniqueCities: uniqueCities.length,
          displayText: `${totalDates} Dates from ${uniqueCities.length} Cities`,
        },
      };
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Tour package cards retrieved successfully',
      data: toursWithMetadata,
      pagination: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(total / pagination.limit),
      },
    });
  } catch (error) {
    handleZodError(error, next);
  }
};

export const updateTourPackageCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { cardId } = req.params;

    // Validate MongoDB ID
    mongoIdSchema.parse(cardId);

    const tourPackageCard = await TourPackageCard.findById(cardId);
    if (!tourPackageCard) {
      if (req.files && Array.isArray(req.files)) {
        await cleanupImages(
          req.files as Express.Multer.File[],
          'tour-package-cards',
        );
      }
      next(new appError('Tour package card not found', 404));
      return;
    }

    // Validate category if being updated
    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        if (req.files && Array.isArray(req.files)) {
          await cleanupImages(
            req.files as Express.Multer.File[],
            'tour-package-cards',
          );
        }
        next(new appError('Category not found', 404));
        return;
      }
    }

    // Validate tour includes if being updated
    if (req.body.tourIncludes !== undefined) {
      const tourIncludes = parseJSON(req.body.tourIncludes);

      if (tourIncludes && tourIncludes.length > 0) {
        try {
          await validateTourIncludes(tourIncludes);
        } catch (error) {
          if (req.files && Array.isArray(req.files)) {
            await cleanupImages(
              req.files as Express.Multer.File[],
              'tour-package-cards',
            );
          }
          next(error);
          return;
        }
      }
    }

    // Prepare update data
    const updateData: Partial<UpdateTourPackageCardInput> = {};

    if (req.body.title) updateData.title = req.body.title;
    if (req.body.subtitle) updateData.subtitle = req.body.subtitle;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.badge !== undefined) updateData.badge = req.body.badge;
    if (req.body.metaDescription !== undefined)
      updateData.metaDescription = req.body.metaDescription;
    if (req.body.featured !== undefined)
      updateData.featured = parseBoolean(req.body.featured);
    if (req.body.status !== undefined) updateData.status = req.body.status;
    if (req.body.tourType) updateData.tourType = req.body.tourType;
    if (req.body.days !== undefined) updateData.days = parseInt(req.body.days);
    if (req.body.nights !== undefined)
      updateData.nights = parseInt(req.body.nights);
    if (req.body.states !== undefined)
      updateData.states = parseJSON(req.body.states);
    if (req.body.route) updateData.route = req.body.route;
    if (req.body.cityDetails !== undefined)
      updateData.cityDetails = parseJSON(req.body.cityDetails);
    if (req.body.baseFullPackagePrice !== undefined)
      updateData.baseFullPackagePrice = parseFloat(
        req.body.baseFullPackagePrice,
      );
    if (req.body.baseJoiningPrice !== undefined)
      updateData.baseJoiningPrice = parseFloat(req.body.baseJoiningPrice);
    if (req.body.priceNote !== undefined)
      updateData.priceNote = req.body.priceNote;
    if (req.body.tourManagerIncluded !== undefined)
      updateData.tourManagerIncluded = parseBoolean(
        req.body.tourManagerIncluded,
      );
    if (req.body.tourManagerNote !== undefined)
      updateData.tourManagerNote = req.body.tourManagerNote;
    if (req.body.whyTravel !== undefined)
      updateData.whyTravel = parseJSON(req.body.whyTravel);
    if (req.body.tourIncludes !== undefined)
      updateData.tourIncludes = parseJSON(req.body.tourIncludes);
    if (req.body.itinerary !== undefined)
      updateData.itinerary = parseJSON(req.body.itinerary);

    // ✅ Handle flights update
    if (req.body.flights !== undefined) {
      updateData.flights = parseJSON(req.body.flights);
    }

    // ✅ Handle accommodations update
    if (req.body.accommodations !== undefined) {
      updateData.accommodations = parseJSON(req.body.accommodations);
    }

    // ✅ Handle reporting/dropping update
    if (req.body.reportingDropping !== undefined) {
      updateData.reportingDropping = parseJSON(req.body.reportingDropping);
    }

    // Handle departures update with status calculation
    if (req.body.departures !== undefined) {
      const departures = parseJSON(req.body.departures);
      if (departures && Array.isArray(departures)) {
        departures.forEach((departure: any) => {
          departure.status = updateDepartureStatus(
            departure.availableSeats,
            departure.totalSeats,
          );
        });
      }
      updateData.departures = departures;
    }

    // Handle images update
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const files = req.files as Express.Multer.File[];

      // Delete old gallery images
      for (const oldGalleryImage of tourPackageCard.galleryImages || []) {
        const oldGalleryPublicId = oldGalleryImage
          .split('/')
          .pop()
          ?.split('.')[0];
        if (oldGalleryPublicId) {
          await cloudinary.uploader.destroy(
            `tour-package-cards/${oldGalleryPublicId}`,
          );
        }
      }

      updateData.galleryImages = files.map((file) => file.path);
    }

    // Validate and update
    const validated = updateTourPackageCardSchema.parse(updateData);
    Object.assign(tourPackageCard, validated);
    await tourPackageCard.save();

    // Populate both category and tourIncludes
    await tourPackageCard.populate([
      { path: 'category' },
      { path: 'tourIncludes' },
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Tour package card updated successfully',
      data: tourPackageCard,
    });
  } catch (error) {
    if (req.files && Array.isArray(req.files)) {
      await cleanupImages(
        req.files as Express.Multer.File[],
        'tour-package-cards',
      );
    }
    handleZodError(error, next);
  }
};

export const deleteTourPackageCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { cardId } = req.params;

    // Validate MongoDB ID
    mongoIdSchema.parse(cardId);

    const tourPackageCard = await TourPackageCard.findById(cardId);
    if (!tourPackageCard) {
      next(new appError('Tour package card not found', 404));
      return;
    }

    // Delete gallery images from cloudinary
    for (const galleryImage of tourPackageCard.galleryImages || []) {
      const galleryPublicId = galleryImage.split('/').pop()?.split('.')[0];
      if (galleryPublicId) {
        await cloudinary.uploader.destroy(
          `tour-package-cards/${galleryPublicId}`,
        );
      }
    }

    await TourPackageCard.findByIdAndDelete(cardId);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Tour package card deleted successfully',
    });
  } catch (error) {
    handleZodError(error, next);
  }
};
