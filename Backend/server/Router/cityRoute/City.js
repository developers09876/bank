import { Router } from "express";
const router = Router();

import {
  createCity,
  getAllCity,
  updateCity,
  deleteCity,
  getCityById,
} from "../../Controller/cityController/City.js";

router.route("/createCity").post(createCity);
router.route("/getallCity").get(getAllCity);
router.route("/cityById/:districtId").get(getCityById);
router.route("/updateCity/:id").put(updateCity);
router.route("/deleteCity/:id").delete(deleteCity);

export default router;
