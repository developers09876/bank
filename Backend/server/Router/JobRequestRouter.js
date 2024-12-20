import { Router } from "express";
import { createJobRequest, getallJobRequests } from "../Controller/JobRequestController.js";


const router = Router();

router.post("createjobrequest",createJobRequest);
router.get("getall",getallJobRequests);

export default router