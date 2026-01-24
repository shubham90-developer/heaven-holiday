// controllers/tabcards.controller.ts
import { Request, Response } from 'express';
import { TabCards } from './tabcardsModel';
import {
  createTabCardSchema,
  updateTabCardSchema,
  getCardsByCategorySchema,
} from './tabcardsValidation';
import { z } from 'zod';

// ================= GET ALL TAB CARDS =================
export const getAllTabCards = async (req: Request, res: Response) => {
  try {
    let document = await TabCards.findOne();

    if (!document) {
      return res.json({
        success: true,
        statusCode: 200,
        message: 'No tab cards found',
        data: {
          cards: [],
        },
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Tab cards retrieved successfully',
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tab cards',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// ================= GET CARDS BY CATEGORY =================
export const getCardsByCategory = async (req: Request, res: Response) => {
  try {
    const validated = getCardsByCategorySchema.parse({
      params: req.params,
    });

    const { category } = validated.params;

    let document = await TabCards.findOne();

    if (!document) {
      return res.json({
        success: true,
        statusCode: 200,
        message: `No ${category} cards found`,
        data: [],
      });
    }

    const filteredCards = document.cards.filter(
      (card) => card.category === category,
    );

    res.json({
      success: true,
      statusCode: 200,
      message: `${
        category.charAt(0).toUpperCase() + category.slice(1)
      } cards retrieved successfully`,
      data: filteredCards,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching cards by category',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// ================= ADD CARD =================
export const createTabCard = async (req: Request, res: Response) => {
  try {
    const {
      title,
      tours,
      departures,
      guests,
      badge,
      link,
      category,
      isActive,
    } = req.body;
    const imgUrl = req.file?.path || '';

    if (!imgUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const validatedCard = createTabCardSchema.shape.body.parse({
      title,
      tours: Number(tours),
      departures: Number(departures),
      guests,
      image: imgUrl,
      badge,
      link: link || '/tour-list',
      category,
      isActive: isActive === 'true' || isActive === true,
    });

    let document = await TabCards.findOne();

    if (!document) {
      document = new TabCards({
        cards: [validatedCard],
      });
    } else {
      document.cards.push(validatedCard as any);
    }

    await document.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Tab card added successfully',
      data: document,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating tab card',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// ================= UPDATE CARD =================
export const updateTabCard = async (req: Request, res: Response) => {
  try {
    const {
      cardId,
      title,
      tours,
      departures,
      guests,
      badge,
      link,
      category,
      isActive,
    } = req.body;
    const newImageFile = req.file;

    if (!cardId) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required',
      });
    }

    const document = await TabCards.findOne({ 'cards._id': cardId });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document or card not found',
      });
    }

    const existingCard = document.cards.find(
      (card: any) => card._id?.toString() === cardId,
    );

    if (!existingCard) {
      return res.status(404).json({
        success: false,
        message: 'Card not found in document',
      });
    }

    const imageUrl = newImageFile?.path || existingCard.image;

    const validatedCard = updateTabCardSchema.shape.body.parse({
      title: title || existingCard.title,
      tours: tours ? Number(tours) : existingCard.tours,
      departures: departures ? Number(departures) : existingCard.departures,
      guests: guests || existingCard.guests,
      image: imageUrl,
      badge: badge !== undefined ? badge : existingCard.badge,
      link: link || existingCard.link,
      category: category || existingCard.category,
      isActive:
        isActive !== undefined
          ? isActive === 'true' || isActive === true
          : existingCard.isActive,
    });

    const updatedDocument = await TabCards.findOneAndUpdate(
      { 'cards._id': cardId },
      {
        $set: {
          'cards.$.title': validatedCard.title,
          'cards.$.tours': validatedCard.tours,
          'cards.$.departures': validatedCard.departures,
          'cards.$.guests': validatedCard.guests,
          'cards.$.image': validatedCard.image,
          'cards.$.badge': validatedCard.badge,
          'cards.$.link': validatedCard.link,
          'cards.$.category': validatedCard.category,
          'cards.$.isActive': validatedCard.isActive,
        },
      },
      { new: true, runValidators: true },
    );

    if (!updatedDocument) {
      return res.status(404).json({
        success: false,
        message: 'Failed to update card',
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Tab card updated successfully',
      data: updatedDocument,
    });
  } catch (error) {
    console.error('Update card error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating tab card',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// ================= DELETE CARD =================
export const deleteTabCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.body;

    if (!cardId) {
      return res.status(400).json({
        success: false,
        message: 'Card ID is required',
      });
    }

    const document = await TabCards.findOneAndUpdate(
      { 'cards._id': cardId },
      { $pull: { cards: { _id: cardId } } },
      { new: true },
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Card not found',
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Tab card deleted successfully',
      data: document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting tab card',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
