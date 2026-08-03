import { Router } from "express";
import * as coachController from "../controllers/coachController.js";
import authenticate from "../middleware/auth.js";

const router = Router();

router.post("/coach", authenticate, coachController.getCoaching);

export default router;
