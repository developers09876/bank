import { Router } from "express";

import { createJob, getallJobs } from "../Controller/JobPostController.js";
const router = Router();

router.post("/createjob",createJob);
router.get("/getall",getallJobs);

export default router;
