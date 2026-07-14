import { Router } from "express";

import * as habitController from "../controllers/habitController.js";

import { habitRules, handlehabitValidation } from "../validators/habitValidator.js";
const router = Router();

router.get("/habits", habitController.gethabits);
router.post("/habits", habitRules, handlehabitValidation, habitController.addHabit);
router.put("/habits/:id", habitController.updateHabit);

export default router;