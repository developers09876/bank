import { Router } from "express";
const router = Router();

import {
  createCountry,
  getAllCountry,
  updateCountry,
  deleteCountry,
} from "../../controller/countryController/Country.js";

router.route("/createcountry").post(createCountry);
router.route("/getallcountry").get(getAllCountry);
router.route("/updatecountry/:id").put(updateCountry);
router.route("/deletecountry/:id").delete(deleteCountry);

export default router;
