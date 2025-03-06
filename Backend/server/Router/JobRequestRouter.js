import { Router } from "express";
import { createJobRequest, getallJobRequests,updateJobRequestStatus } from "../Controller/JobRequestController.js";


const router = Router();

router.post("/createjobrequest", createJobRequest);
router.get("/getall", getallJobRequests);
router.put("/update/:id", updateJobRequestStatus);

export default router