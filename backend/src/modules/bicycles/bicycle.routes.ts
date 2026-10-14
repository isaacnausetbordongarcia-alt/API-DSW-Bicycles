import { Router } from "express";
import { BicycleController } from "./bicycle.controller.js";

const router = Router();

router.get("/", BicycleController.getAll);

router.get("/greater-price", BicycleController.getGreaterPrice);
router.get("/eagerly/frame-material/:frameMaterial", BicycleController.getAllEagerlyByFrameMaterial);
router.get("/eagerly/:id", BicycleController.getEagerlyById);

router.get("/:id", BicycleController.getById);

router.post("/", BicycleController.create);
router.put("/:id", BicycleController.update);
router.delete("/:id", BicycleController.delete);

export default router;