import express from "express";
import {
  createManager,
  getManager,
  getMangerProperties,
  updateManager,
} from "../controllers/managerControllers";

const router = express.Router();

router.get("/:cognitoId", getManager);
router.put("/:cognitoId", updateManager);
router.get("/:cognitoId/properties", getMangerProperties);
router.post("/", createManager);

export default router;
