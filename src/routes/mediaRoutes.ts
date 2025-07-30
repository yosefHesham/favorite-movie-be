import { Router } from "express";
import { mediaController } from "../controllers/mediaController";

const router = Router();

router.post("/", mediaController.createMedia);
router.get("/", mediaController.getAllMedia);
router.put("/:id", mediaController.updateMedia);
router.delete("/:id", mediaController.deleteMedia);

export default router;
