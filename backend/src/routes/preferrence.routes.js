import { Router } from "express";
import { getPreferrences, createPreferrence, updatePreferrence, deletePreferrence } from "../controllers/preferrence.controller.js";

const router = Router();

router.get("/", getPreferrences);
router.post("/create", createPreferrence);
router.put("/edit/:id", updatePreferrence);
router.delete("/delete/:id", deletePreferrence);

export default router;