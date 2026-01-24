import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  returnOrder,
  updatePaymentStatus,
  getOrderSummary,
  getVendorOrders,
  getVendorOrderSummary,
  createDelhiveryShipmentForOrder,
  scheduleDelhiveryPickupForOrder,
  getDelhiveryLabelForOrder,
  trackDelhiveryForOrder,
  getDelhiveryQuote,
} from "./order.controller";
import { auth } from "../../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /v1/api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Order created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (invalid data, insufficient stock, etc.)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.post("/", auth("user"), createOrder);
/**
 * @swagger
 * /v1/api/orders/my-orders:
 *   get:
 *     summary: Get current user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of orders per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, processing, shipped, delivered, cancelled, returned]
 *         description: Filter by order status
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: [pending, paid, failed, refunded]
 *         description: Filter by payment status
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter orders from this date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter orders to this date
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: "-orderDate"
 *         description: Sort field and order
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdersListResponse'
 *       401:
 *         description: Unauthorized
 */
router.get("/my-orders", auth("user"), getUserOrders);

/**
 * @swagger
 * /v1/api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of orders per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, processing, shipped, delivered, cancelled, returned]
 *         description: Filter by order status
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: [pending, paid, failed, refunded]
 *         description: Filter by payment status
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter orders from this date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter orders to this date
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: "-orderDate"
 *         description: Sort field and order
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdersListResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.get("/", auth("admin"), getAllOrders);

/**
 * @swagger
 * /v1/api/orders/{id}:
 *   get:
 *     summary: Get single order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Order retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
// Place summary BEFORE parameterized routes to avoid capture by "/:id"
router.get("/summary", auth("admin"), getOrderSummary);
// Vendor-specific summary
router.get("/summary/vendor", auth("vendor"), getVendorOrderSummary);

// Vendor orders: list orders that include vendor's products
router.get("/vendor", auth("vendor"), getVendorOrders);

// Quote should come before parameterized routes
router.post("/quote/delhivery", auth("user", "admin", "vendor"), getDelhiveryQuote);

router.get("/:id", auth(), getOrderById);

// Delhivery operations
router.post("/:id/delhivery/shipment", auth("admin", "vendor"), createDelhiveryShipmentForOrder);
router.post("/:id/delhivery/pickup", auth("admin", "vendor"), scheduleDelhiveryPickupForOrder);
router.get("/:id/delhivery/label", auth("admin", "vendor"), getDelhiveryLabelForOrder);

/**
 * @swagger
 * /v1/api/orders/{id}/delhivery/track:
 *   get:
 *     summary: Track shipment for an order
 *     description: |
 *       Get real-time tracking information for a shipment using Delhivery tracking API.
 *       Returns current status, location, and delivery timeline for the order.
 *       
 *       
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID (MongoDB ObjectId)
 *         example: "6543210987654321abcdef12"
 *     responses:
 *       200:
 *         description: Tracking information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Tracking fetched"
 *                 data:
 *                   type: object
 *                   description: Delhivery tracking response (structure varies by shipment status)
 *                   properties:
 *                     ShipmentData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           Shipment:
 *                             type: object
 *                             properties:
 *                               Status:
 *                                 type: object
 *                                 properties:
 *                                   Status:
 *                                     type: string
 *                                     description: Current shipment status
 *                                     example: "Delivered"
 *                                     enum: [Pending, Manifested, Dispatched, InTransit, OutForDelivery, Delivered, RTO, Cancelled]
 *                                   StatusDateTime:
 *                                     type: string
 *                                     format: date-time
 *                                     description: Date and time of current status
 *                                     example: "2024-11-08T12:30:00"
 *                                   Instructions:
 *                                     type: string
 *                                     description: Delivery instructions or remarks
 *                                     example: "Out for delivery"
 *                                   StatusLocation:
 *                                     type: string
 *                                     description: Current location of shipment
 *                                     example: "Dubai - Al Barsha DC"
 *                                   StatusType:
 *                                     type: string
 *                                     example: "Delivered"
 *                               AWB:
 *                                 type: string
 *                                 description: Air Waybill / Tracking number
 *                                 example: "DLH123456789"
 *                               OrderID:
 *                                 type: string
 *                                 description: Order reference number
 *                                 example: "ORD-2024-001"
 *                               DestReceiveName:
 *                                 type: string
 *                                 description: Recipient name
 *                                 example: "John Doe"
 *                               DestRecieveAddress:
 *                                 type: string
 *                                 description: Delivery address
 *                                 example: "123 Main St, Dubai"
 *                               DestRecievePinCode:
 *                                 type: string
 *                                 description: Delivery pincode
 *                                 example: "12345"
 *                               PickUpDate:
 *                                 type: string
 *                                 format: date-time
 *                                 description: Pickup date and time
 *                                 example: "2024-11-05T10:00:00"
 *                               ExpectedDeliveryDate:
 *                                 type: string
 *                                 format: date-time
 *                                 description: Expected delivery date
 *                                 example: "2024-11-08T18:00:00"
 *                               Scans:
 *                                 type: array
 *                                 description: Scan history of shipment movement
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     ScanDateTime:
 *                                       type: string
 *                                       format: date-time
 *                                       example: "2024-11-06T14:30:00"
 *                                     ScanType:
 *                                       type: string
 *                                       example: "In-Transit"
 *                                     Scan:
 *                                       type: string
 *                                       example: "In-Transit"
 *                                     StatusDateTime:
 *                                       type: string
 *                                       format: date-time
 *                                       example: "2024-11-06T14:30:00"
 *                                     ScannedLocation:
 *                                       type: string
 *                                       example: "Dubai - Jebel Ali DC"
 *                                     Instructions:
 *                                       type: string
 *                                       example: "Shipment in transit"
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Tracking fetched"
 *               data:
 *                 ShipmentData:
 *                   - Shipment:
 *                       Status:
 *                         Status: "OutForDelivery"
 *                         StatusDateTime: "2024-11-08T09:00:00"
 *                         Instructions: "Out for delivery"
 *                         StatusLocation: "Dubai - Al Barsha DC"
 *                         StatusType: "OutForDelivery"
 *                       AWB: "DLH123456789"
 *                       OrderID: "ORD-2024-001"
 *                       DestReceiveName: "John Doe"
 *                       DestRecieveAddress: "123 Main St, Al Barsha, Dubai"
 *                       DestRecievePinCode: "12345"
 *                       PickUpDate: "2024-11-05T10:00:00"
 *                       ExpectedDeliveryDate: "2024-11-08T18:00:00"
 *                       Scans:
 *                         - ScanDateTime: "2024-11-05T10:30:00"
 *                           ScanType: "Pickup"
 *                           Scan: "Pickup"
 *                           ScannedLocation: "Dubai - Warehouse"
 *                           Instructions: "Shipment picked up"
 *                         - ScanDateTime: "2024-11-06T14:30:00"
 *                           ScanType: "In-Transit"
 *                           Scan: "In-Transit"
 *                           ScannedLocation: "Dubai - Jebel Ali DC"
 *                           Instructions: "Shipment in transit"
 *                         - ScanDateTime: "2024-11-08T09:00:00"
 *                           ScanType: "OutForDelivery"
 *                           Scan: "Out for Delivery"
 *                           ScannedLocation: "Dubai - Al Barsha DC"
 *                           Instructions: "Out for delivery"
 *       400:
 *         description: Bad request - No tracking number found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "No tracking number found for this order"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Delhivery tracking fetch failed"
 */
router.get("/:id/delhivery/track", auth(), trackDelhiveryForOrder);

/**
 * @swagger
 * /v1/api/orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderStatusRequest'
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Order status updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Order not found
 */
router.put("/:id/status", auth("admin", "vendor"), updateOrderStatus);

/**
 * @swagger
 * /v1/api/orders/{id}/cancel:
 *   put:
 *     summary: Cancel order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 description: Reason for cancellation
 *                 example: "Changed my mind"
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Order cancelled successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (order cannot be cancelled)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.put("/:id/cancel", auth("user"), cancelOrder);

/**
 * @swagger
 * /v1/api/orders/{id}/return:
 *   put:
 *     summary: Return order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 description: Reason for return
 *                 example: "Product defective"
 *     responses:
 *       200:
 *         description: Order returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Order returned successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (only delivered orders can be returned)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.put("/:id/return", auth("user"), returnOrder);

/**
 * @swagger
 * /v1/api/orders/{id}/payment:
 *   put:
 *     summary: Update payment status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePaymentStatusRequest'
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Payment status updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Order not found
 */
router.put("/:id/payment", auth("admin", "vendor"), updatePaymentStatus);

/**
 * @swagger
 * /v1/api/orders/summary:
 *   get:
 *     summary: Get order summary/statistics (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Order summary retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/OrderSummary'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
// (moved above)

export const orderRouter = router;
