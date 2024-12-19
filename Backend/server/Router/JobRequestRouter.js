import { Router } from "express";
import { createJobRequest } from "../Controller/JobRequestController.js";


const router = Router();

router.post("createjobrequest",createJobRequest);

export default router