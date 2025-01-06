import {createcontactus, getcontactus} from "../Controller/ContactusController.js";
import express from "express";


const router = express.Router();

router.post("/create", createcontactus);

router.get("/getallcontactus", getcontactus);

export default router;
