import { Router } from "express";
const router = Router();

import {
  createDistrict,
  getAllDistrict,
  updateDistrict,
  deleteDistrict,
  getDistrictById,
} from "../../controller/districtController/District.js";

router.route("/createdistrict").post(createDistrict);
router.route("/getalldistrict").get(getAllDistrict);
router.route("/districtById/:state_id").get(getDistrictById);
router.route("/updatedistrict/:id").put(updateDistrict);
router.route("/deletedistrict/:id").delete(deleteDistrict);

export default router;
