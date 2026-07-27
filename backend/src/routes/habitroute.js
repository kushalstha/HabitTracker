import { Router } from "express";
import * as habitController from "../controllers/habitController.js";
import {
  habitRules,
  handlehabitValidation,
} from "../validators/habitValidator.js";
import authenticate from "../middleware/auth.js";

const router = Router();

router.get("/habits", habitController.getAll);
router.post("/habits", authenticate, habitRules, handlehabitValidation, habitController.addHabit);
router.put("/habits/:id", authenticate, habitController.updateHabit);
router.delete("/habits/:id", authenticate, habitController.deleteHabit);

export default router;