import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { categoryRouter } from '../modules/category/category.routes';
import { bannerRouter } from '../modules/banner/banner.routes';
import { contractRouter } from '../modules/contact/contract.routes';
import { privacyPolicyRouter } from '../modules/privacy-policy/privacy-policy.routes';
import { shippingPolicyRouter } from '../modules/shipping-policy/shipping-policy.routes';
import { paymentPolicyRouter } from '../modules/payment-policy/payment-policy.routes';
import { disclaimerRouter } from '../modules/disclaimer/disclaimer.routes';
import { siteSecurityRouter } from '../modules/site-security/site-security.routes';
import { TermsConditionRouter } from '../modules/terms-condition/terms-condition.routes';
import { helpSupportRouter } from '../modules/help-support/help-support.routes';
import { blogRouter } from '../modules/blog/blog.routes';
import { blogCategoryRouter } from '../modules/blog-category/blog-category.routes';
import { headerBannerRouter } from '../modules/header-banner/header-banner.routes';
import { discountOfferRouter } from '../modules/discount-offer/discount-offer.routes';
import { offerBannerRouter } from '../modules/offer-banner/offer-banner.routes';
import { uploadRouter } from '../modules/upload/upload.routes';
import { productRouter } from '../modules/product/product.routes';
import { cartRouter } from '../modules/cart/cart.routes';
import { vendorPolicyRouter } from '../modules/vendor-policy/vendor-policy.routes';
import { orderRouter } from '../modules/order/order.routes';
import { paymentRouter } from '../modules/payment/payment.routes';
import { wishlistRouter } from '../modules/wishlist/wishlist.routes';
import { aboutRouter } from '../modules/about/about.routes';
import { footerWidgetRouter } from '../modules/footer-widget/footer-widget.routes';
import { generalSettingsRouter } from '../modules/general-settings/general-settings.routes';
import { productCategoryRouter } from '../modules/Product-category/product-category.routes';
import { subscriptionRouter } from '../modules/subscription/subscription.routes';
import { subscriptionIncludeRouter } from '../modules/subscription-include/subscription-include.routes';
import { vendorRouter } from '../modules/vendor/vendor.routes';
import { addressRouter } from '../modules/address/address.routes';
import { couponRouter } from '../modules/coupon/coupon.routes';
import { teamRouter } from '../modules/team/team.routes';
import { aboutusRouter } from '../modules/aboutus/aboutus.routes';
import { counterRouter } from '../modules/counter/counter.routes';
import { heroBannerRouter } from '../modules/hero-banner/bannerRoutes';
import { galleryRouter } from '../modules/Gallery/galleryRoutes';
import { principleRouter } from '../modules/principles/principlesRoutes';
import { servicesRouter } from '../modules/services/servicesRoutes';
import { joinUsRouter } from '../modules/joinOurFamily/messageRoutes';
import { contactRouter } from '../modules/contactUs/contactUsRoutes';
import { footerInfoRouter } from '../modules/footerInfo/footerInfoRoute';
import { reviewsRouter } from '../modules/reviews/reviewsRoutes';
import { preambleRouter } from '../modules/preamble/preambleRoutes';
import { philosophyRouter } from '../modules/managementPhilosophy/philosophyRoutes';
import { purposePolicyRouter } from '../modules/purposePolicy/purposePolicyRoutes';
import { contactOfficeRouter } from '../modules/contactOffice/contactOfficeRoutes';
import { contactCitiesRouter } from '../modules/contactCities/contactCities.routes';
import { tourManagerRouter } from '../modules/tourManager/tourManagerRoutes';
import { tourManagerTeamRouter } from '../modules/tourManagerDirectory/tourManagerDirectoryRoutes';
import { tourPackageRouter } from '../modules/tourPackage/tourPackageRoutes';
import { trendingDestinationsRouter } from '../modules/trendingDestinations/destinationRoutes';
import { podcastRouter } from '../modules/podcasts/podcastRoutes';
import { toursGalleryRouter } from '../modules/toursGallery/toursGalleryRoutes';
import { FeedbackRouter } from '../modules/feedBackForm/feedbackRoutes';
import { careersRouter } from '../modules/careers/careersRoutes';
import { faqRouter } from '../modules/faq/faq.routes';
import {
  DepartmentRouter,
  JobRouter,
  LocationRouter,
} from '../modules/currentOpenings/openingRoutes';
import { howWeHireRouter } from '../modules/howWeHire/hireRoutes';
import { EmpoweringRouter } from '../modules/EmpoweringWomenSection/EmpoweringRoutes';
import { excitedToWorkRouter } from '../modules/excitedToWork/excitedToWorkRoutes';
import { tabCardRouter } from '../modules/tabcards/tabcardRoutes';
import { contactInfoBoxRouter } from '../modules/contact-info-box/infoBoxRoutes';
import { travelDealBannerRouter } from '../modules/travel-deal-hero/travelDealsRoutes';
import { travelDealsHeadingRouter } from '../modules/travel-deal-Holiday/holidayRoutes';
import { celebrateRouter } from '../modules/travel-offer-banner/offer-bannerRoutes';
import { visaInfoRouter } from '../modules/singaporeVisa/singaporeVisaRoutes';
import { annualReturnRouter } from '../modules/annulReturn/returnRoutes';
import { onlineBookingRouter } from '../modules/booking/bookingRoutes';
import { blogsRouter } from '../modules/blogs/blogsRoutes';
import { videoBlogRouter } from '../modules/videoBlogs/videoBlogRoutes';
import { enquiryRouter } from '../modules/enquiry/enquiryRoutes';
import { CSRFAQRouter } from '../modules/csrFaq/faqRoutes';
import { JobApplicationRouter } from '../modules/jobApplications/applicationRoutes';
import { booksRouter } from '../modules/books/booksRoutes';
import { applnProcessRouter } from '../modules/applProcess/applProcessRoutes';
import { becomePartnerRouter } from '../modules/salesPartner/partnerRoutes';
import { becomePartnerFormRouter } from '../modules/becomePartnerForm/formRoutes';
import { commentRouter } from '../modules/comments/commentRoutes';
import { IncludedRouter } from '../modules/toursIncluded/toursIncludedRoutes';
import { bookingRouter } from '../modules/bookPackage/bookingRoutes';
const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },

  {
    path: '/categories',
    route: categoryRouter,
  },

  {
    path: '/contracts',
    route: contractRouter,
  },

  {
    path: '/banners',
    route: bannerRouter,
  },

  {
    path: '/header-banners',
    route: headerBannerRouter,
  },

  {
    path: '/discount-offers',
    route: discountOfferRouter,
  },

  {
    path: '/offer-banners',
    route: offerBannerRouter,
  },

  {
    path: '/about',
    route: aboutRouter,
  },

  {
    path: '/footer-widgets',
    route: footerWidgetRouter,
  },

  {
    path: '/general-settings',
    route: generalSettingsRouter,
  },

  {
    path: '/faqs',
    route: faqRouter,
  },

  {
    path: '/privacy-policy',
    route: privacyPolicyRouter,
  },

  {
    path: '/shipping-policy',
    route: shippingPolicyRouter,
  },

  {
    path: '/payment-policy',
    route: paymentPolicyRouter,
  },

  {
    path: '/disclaimer',
    route: disclaimerRouter,
  },

  {
    path: '/site-security',
    route: siteSecurityRouter,
  },

  {
    path: '/vendor-policy',
    route: vendorPolicyRouter,
  },

  {
    path: '/terms-conditions',
    route: TermsConditionRouter,
  },

  {
    path: '/help-support',
    route: helpSupportRouter,
  },

  {
    path: '/blog-categories',
    route: blogCategoryRouter,
  },

  // {
  //   path: '/blogs',
  //   route: blogRouter,
  // },

  {
    path: '/upload',
    route: uploadRouter,
  },

  {
    path: '/products',
    route: productRouter,
  },
  {
    path: '/productsCategory',
    route: productCategoryRouter,
  },
  {
    path: '/cart',
    route: cartRouter,
  },

  {
    path: '/orders',
    route: orderRouter,
  },

  {
    path: '/payments',
    route: paymentRouter,
  },

  {
    path: '/wishlist',
    route: wishlistRouter,
  },
  {
    path: '/subscriptions',
    route: subscriptionRouter,
  },
  {
    path: '/subscription-includes',
    route: subscriptionIncludeRouter,
  },
  {
    path: '/vendors',
    route: vendorRouter,
  },
  {
    path: '/addresses',
    route: addressRouter,
  },
  {
    path: '/coupons',
    route: couponRouter,
  },
  {
    path: '/teams',
    route: teamRouter,
  },
  {
    path: '/aboutus',
    route: aboutusRouter,
  },
  {
    path: '/counter',
    route: counterRouter,
  },
  {
    path: '/hero-banner',
    route: heroBannerRouter,
  },
  {
    path: '/gallery',
    route: galleryRouter,
  },
  {
    path: '/principles',
    route: principleRouter,
  },
  {
    path: '/services',
    route: servicesRouter,
  },
  {
    path: '/joinUs',
    route: joinUsRouter,
  },
  {
    path: '/contact-us',
    route: contactRouter,
  },
  {
    path: '/footer-info',
    route: footerInfoRouter,
  },
  {
    path: '/reviews',
    route: reviewsRouter,
  },
  {
    path: '/csr-preamble',
    route: preambleRouter,
  },
  {
    path: '/csr-management',
    route: philosophyRouter,
  },
  {
    path: '/csr-purpose-policy',
    route: purposePolicyRouter,
  },
  {
    path: '/contact-office',
    route: contactOfficeRouter,
  },
  {
    path: '/contact-city',
    route: contactCitiesRouter,
  },
  {
    path: '/tour-manager',
    route: tourManagerRouter,
  },
  {
    path: '/tour-manager-team',
    route: tourManagerTeamRouter,
  },
  {
    path: '/tour-package',
    route: tourPackageRouter,
  },
  {
    path: '/offer-banner',
    route: offerBannerRouter,
  },
  {
    path: '/trending-destinations',
    route: trendingDestinationsRouter,
  },
  {
    path: '/podcasts',
    route: podcastRouter,
  },
  {
    path: '/tours-gallery',
    route: toursGalleryRouter,
  },
  {
    path: '/reviews-feedback',
    route: FeedbackRouter,
  },
  {
    path: '/careers-header',
    route: careersRouter,
  },
  {
    path: '/careers-department',
    route: DepartmentRouter,
  },
  {
    path: '/careers-location',
    route: LocationRouter,
  },
  {
    path: '/careers-jobs',
    route: JobRouter,
  },
  {
    path: '/hiring-process',
    route: howWeHireRouter,
  },
  {
    path: '/empowering-women',
    route: EmpoweringRouter,
  },
  {
    path: '/excited-to-work',
    route: excitedToWorkRouter,
  },
  {
    path: '/tab-cards',
    route: tabCardRouter,
  },
  {
    path: '/contact-info-box',
    route: contactInfoBoxRouter,
  },
  {
    path: '/travel-deal',
    route: travelDealBannerRouter,
  },
  {
    path: '/travel-deal-heading',
    route: travelDealsHeadingRouter,
  },
  {
    path: '/travel-deal-offer-banners',
    route: celebrateRouter,
  },
  {
    path: '/visa-info',
    route: visaInfoRouter,
  },
  {
    path: '/annual-return',
    route: annualReturnRouter,
  },
  {
    path: '/online-booking',
    route: onlineBookingRouter,
  },
  {
    path: '/blogs',
    route: blogsRouter,
  },
  {
    path: '/video-blogs',
    route: videoBlogRouter,
  },
  {
    path: '/enquiry',
    route: enquiryRouter,
  },
  {
    path: '/csr-faq',
    route: CSRFAQRouter,
  },
  {
    path: '/job-applications',
    route: JobApplicationRouter,
  },
  {
    path: '/books',
    route: booksRouter,
  },
  {
    path: '/application-process',
    route: applnProcessRouter,
  },
  {
    path: '/become-partner',
    route: becomePartnerRouter,
  },
  {
    path: '/become-partner-form',
    route: becomePartnerFormRouter,
  },
  {
    path: '/comment',
    route: commentRouter,
  },
  {
    path: '/includes',
    route: IncludedRouter,
  },
  {
    path: '/register',
    route: authRouter,
  },
  {
    path: '/booking',
    route: bookingRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
