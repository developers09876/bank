import { Router } from "express";
import {
  createLead,
  getallLead,
  getById,
  updateLead,
  getByUserId,
  deleteRemark,
  updateNotificationStatus,
} from "../Controller/LeadGenerationController.js";

const router = Router();

router.post("/createlead", createLead);
router.get("/getall", getallLead);
router.get("/getById/:id", getById);
router.put("/notification-status/:leadId", updateNotificationStatus);
router.get("/getByMail/:email", getByUserId);
router.delete("/delete/:leadId/remark/:remarkId", deleteRemark);
router.put("/updatelead/:id", updateLead);

export default router;
