import { Router } from "express";
import bicycleRoutes from "../modules/bicycles/bicycle.routes";
import brandRoutes from "../modules/brands/brand.routes";
import bicycleDetailRoutes from "../modules/bicycle-details/bicycle-detail.routes";
import customerRoutes from "../modules/customer/customer.routes";
import orderRoutes from "../modules/order/order.routes";
import orderItemRoutes from "../modules/order-item/order-item.routes";

const router = Router();

router.use("/bicycles", bicycleRoutes);
router.use("/brands", brandRoutes);
router.use("/bicycle-details", bicycleDetailRoutes);
router.use("/customers", customerRoutes);
router.use("/orders", orderRoutes);
router.use("/order-item", orderItemRoutes);

export default router;