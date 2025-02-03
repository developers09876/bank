import { Router } from "express";
import {
  createLead,
  getallLead,
  getById,
  updateLead,
  getByUserId,
  deleteRemark,
  updateNotificationStatus,
  updateLeadAssign,
  getByEmployeeId,
  getByLeadId,
} from "../Controller/LeadGenerationController.js";

const router = Router();

router.post("/createlead", createLead);
router.get("/getall", getallLead);
router.get("/getById/:id", getById);
router.get("/getByLeadId/:id", getByLeadId);

router.put("/notification-status/:leadId", updateNotificationStatus);
router.get("/getByMail/:email", getByUserId);
router.delete("/delete/:leadId/remark/:remarkId", deleteRemark);
router.put("/updatelead/:id", updateLead);
router.put("/updateleadassign/:id", updateLeadAssign);
router.get("/getbyEmployeeid/:employeeId", getByEmployeeId);

export default router;
