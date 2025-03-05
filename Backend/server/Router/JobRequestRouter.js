import { Router } from "express";
import { createJobRequest, getallJobRequests,updateJobRequestStatus ,deleteJobRequestStatus} from "../Controller/JobRequestController.js";


const router = Router();

router.post("/createjobrequest", createJobRequest);
router.get("/getall", getallJobRequests);
router.put("/update/:id", updateJobRequestStatus);
router.delete("/delete/:id", deleteJobRequestStatus);
export default router