import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import { Request } from 'express'; // Import the Request type

dotenv.config();

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req: Request, _file: Express.Multer.File) => {
      if (req.originalUrl.includes('/products')) {
        return 'restaurant-products';
      } else if (
        req.originalUrl.includes('/categories') ||
        req.originalUrl.includes('/productsCategory')
      ) {
        return 'restaurant-categories';
      } else if (req.originalUrl.includes('/banners')) {
        return 'restaurant-banners';
      } else if (req.originalUrl.includes('/blogs')) {
        return 'restaurant-blogs';
      } else if (req.originalUrl.includes('/teams')) {
        return 'restaurant-teams';
      } else if (req.originalUrl.includes('/aboutus')) {
        return 'restaurent-teams';
      } else if (req.originalUrl.includes('/hero-banner')) {
        return 'restaurent-banners';
      } else if (req.originalUrl.includes('/gallery')) {
        return 'restaurent-gallery';
      } else if (req.originalUrl.includes('/services')) {
        return 'restaurent-services';
      } else if (req.originalUrl.includes('/csr-preamble')) {
        return 'restaurent-csr-preamble';
      } else if (req.originalUrl.includes('/csr-management')) {
        return 'restaurent-csr-management';
      } else if (req.originalUrl.includes('/csr-purpose-policy')) {
        return 'restaurent-csr-policy';
      } else if (req.originalUrl.includes('/contact-city')) {
        return 'restaurent-csr-city';
      } else if (req.originalUrl.includes('/tour-manager-team')) {
        return 'restaurent-tour-manager-team';
      } else if (req.originalUrl.includes('/tour-package')) {
        return 'restaurent-tour-package';
      } else if (req.originalUrl.includes('/offer-banner')) {
        return 'restaurent-offer-banner';
      } else if (req.originalUrl.includes('/trending-destinations')) {
        return 'restaurent-trending-destinations';
      } else if (req.originalUrl.includes('/podcasts')) {
        return 'restaurent-podcasts';
      } else if (req.originalUrl.includes('/tours-gallery')) {
        return 'restaurent-tours-gallery';
      } else if (req.originalUrl.includes('/annual-return')) {
        return 'restaurent-annual-return-pdf';
      } else if (req.originalUrl.includes('/online-booking')) {
        return 'restaurent-online-booking';
      } else if (req.originalUrl.includes('/job-applications')) {
        return 'restaurent-job-applications';
      } else if (req.originalUrl.includes('/books')) {
        return 'restaurent-books';
      }
      return 'restaurant-uploads';
    },
    allowed_formats: [
      'jpg',
      'jpeg',
      'png',
      'webp',
      'avif',
      'gif',
      'mp4',
      'mov',
      'avi',
      'mkv',
      'pdf',
      'svg',
    ],
    resource_type: 'auto',
    transformation: [{ width: 1200, height: 600, crop: 'limit' }], // Appropriate for banners
  } as any,
});

// File filter to validate MIME types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif',
    'image/svg+xml',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'application/pdf',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('An unknown file format not allowed'));
  }
};

// Initialize multer upload
const upload = multer({ storage, fileFilter });

export { cloudinary, upload };
