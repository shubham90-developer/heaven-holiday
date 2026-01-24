import { RequestHandler } from "express";
import { Address } from "./address.model";
import { createAddressValidation, updateAddressValidation } from "./address.validation";

// OTP storage (in-memory, consider Redis for production)
const otpStore: Map<string, { otp: string; expiresAt: Date; verified: boolean }> = new Map();

// Rate limiting: Track OTP send attempts (phone -> array of timestamps)
const otpRateLimiter: Map<string, number[]> = new Map();

// Rate limiting constants
const MAX_OTP_ATTEMPTS = 2;
const RATE_LIMIT_WINDOW = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

// Generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Check if user exceeded rate limit
const isRateLimited = (phone: string): boolean => {
  const now = Date.now();
  const attempts = otpRateLimiter.get(phone) || [];
  
  // Filter out attempts older than 3 hours
  const recentAttempts = attempts.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  // Update the map with recent attempts
  if (recentAttempts.length > 0) {
    otpRateLimiter.set(phone, recentAttempts);
  } else {
    otpRateLimiter.delete(phone);
  }
  
  return recentAttempts.length >= MAX_OTP_ATTEMPTS;
};

// Record OTP send attempt
const recordOTPAttempt = (phone: string): void => {
  const attempts = otpRateLimiter.get(phone) || [];
  attempts.push(Date.now());
  otpRateLimiter.set(phone, attempts);
};

// Send OTP via WhatsApp
export const sendAddressOTP: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Phone number is required",
      });
      return;
    }

    // Check rate limiting
    if (isRateLimited(phone)) {
      res.status(429).json({
        success: false,
        statusCode: 429,
        message: "Too many OTP requests. You can only send 2 OTPs within 3 hours. Please try again later.",
      });
      return;
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Record this OTP attempt
    recordOTPAttempt(phone);
    
    // Store OTP with 5 minutes expiration
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    otpStore.set(phone, { otp, expiresAt, verified: false });

    // Log OTP to console for development
    const attempts = otpRateLimiter.get(phone) || [];
    const remainingAttempts = MAX_OTP_ATTEMPTS - attempts.length;
    console.log(`📱 WhatsApp OTP for ${phone}: ${otp}`);
    console.log(`OTP expires at: ${expiresAt.toLocaleString()}`);
    console.log(`📊 OTP attempts: ${attempts.length}/${MAX_OTP_ATTEMPTS} (${remainingAttempts} remaining)`);

    // Send OTP via WhatsApp API
    try {
      const whatsappApiUrl = `http://wapi.nationalsms.in/wapp/v2/api/send?apikey=fe22749a04504c949e0786df974ac9c7&mobile=${phone}&msg=Your address verification OTP is ${otp}. Valid for 5 minutes.`;
      const response = await fetch(whatsappApiUrl);
      const result = await response.text();
      console.log(`WhatsApp API Response: ${result}`);
    } catch (whatsappError) {
      console.error('Failed to send WhatsApp OTP:', whatsappError);
      // Continue with the flow even if WhatsApp fails, for development purposes
    }

    res.json({
      success: true,
      statusCode: 200,
      message: `OTP sent successfully to WhatsApp. ${remainingAttempts} attempt(s) remaining.`,
      data: { 
        phone, 
        expiresIn: 300, // 300 seconds = 5 minutes
        attemptsUsed: attempts.length,
        attemptsRemaining: remainingAttempts,
        maxAttempts: MAX_OTP_ATTEMPTS
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};

// Verify OTP
export const verifyAddressOTP: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Phone number and OTP are required",
      });
      return;
    }

    // Check if OTP exists
    const storedOTP = otpStore.get(phone);
    if (!storedOTP) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "OTP not found or expired. Please request a new OTP.",
      });
      return;
    }

    // Check if OTP is expired
    if (new Date() > storedOTP.expiresAt) {
      otpStore.delete(phone);
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "OTP has expired. Please request a new OTP.",
      });
      return;
    }

    // Verify OTP
    if (storedOTP.otp !== otp) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid OTP. Please try again.",
      });
      return;
    }

    // Mark as verified
    storedOTP.verified = true;
    otpStore.set(phone, storedOTP);

    console.log(`✅ OTP verified successfully for ${phone}`);

    res.json({
      success: true,
      statusCode: 200,
      message: "OTP verified successfully",
      data: { phone, verified: true },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};

// Get all addresses for logged-in user
export const getMyAddresses: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      });
      return;
    }

    const addresses = await Address.find({ userId }).sort({ isDefault: -1, createdAt: -1 });

    res.json({
      success: true,
      statusCode: 200,
      message: "Addresses retrieved successfully",
      data: addresses,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};

// Get single address by ID
export const getAddressById: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      });
      return;
    }

    const address = await Address.findOne({ _id: id, userId });

    if (!address) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Address not found",
      });
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Address retrieved successfully",
      data: address,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};

// Create new address
export const createAddress: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      });
      return;
    }

    const validatedData = createAddressValidation.parse(req.body);

    // Check if phone number OTP is verified
    const storedOTP = otpStore.get(validatedData.phone);
    if (!storedOTP || !storedOTP.verified) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Phone number not verified. Please verify your phone number with OTP first.",
      });
      return;
    }

    // Check if OTP is still valid (not expired)
    if (new Date() > storedOTP.expiresAt) {
      otpStore.delete(validatedData.phone);
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: "OTP verification expired. Please verify your phone number again.",
      });
      return;
    }

    // If this is set as default, unset other default addresses
    if (validatedData.isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }

    const address = new Address({
      ...validatedData,
      userId,
    });

    await address.save();

    // Clear the OTP after successful address creation
    otpStore.delete(validatedData.phone);
    console.log(`✅ Address created successfully for ${validatedData.phone}`);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Address created successfully",
      data: address,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    });
  }
};

// Update address
export const updateAddress: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      });
      return;
    }

    const validatedData = updateAddressValidation.parse(req.body);

    // If setting as default, unset other default addresses
    if (validatedData.isDefault) {
      await Address.updateMany({ userId, _id: { $ne: id } }, { isDefault: false });
    }

    const address = await Address.findOneAndUpdate(
      { _id: id, userId },
      validatedData,
      { new: true }
    );

    if (!address) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Address not found",
      });
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    });
  }
};

// Delete address
export const deleteAddress: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      });
      return;
    }

    const address = await Address.findOneAndDelete({ _id: id, userId });

    if (!address) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Address not found",
      });
      return;
    }

    // If deleted address was default, make another address default if exists
    if (address.isDefault) {
      const nextAddress = await Address.findOne({ userId }).sort({ createdAt: -1 });
      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
      }
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Address deleted successfully",
      data: address,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};

// Set address as default
export const setDefaultAddress: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      });
      return;
    }

    // Unset all default addresses for this user
    await Address.updateMany({ userId }, { isDefault: false });

    // Set the specified address as default
    const address = await Address.findOneAndUpdate(
      { _id: id, userId },
      { isDefault: true },
      { new: true }
    );

    if (!address) {
      res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Address not found",
      });
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Default address updated successfully",
      data: address,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message,
    });
  }
};
