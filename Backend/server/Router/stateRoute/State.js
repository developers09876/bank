import { Router } from "express";
const router = Router();

import {
  createState,
  getAllState,
  updateState,
  deleteState,
  getStateById,
} from "../../controller/stateController/State.js";

router.route("/createstate").post(createState);
router.route("/getallstate").get(getAllState);
router.route("/stateById/:country_id").get(getStateById);
router.route("/updatestate/:id").put(updateState);
router.route("/deletestate/:id").delete(deleteState);

export default router;
