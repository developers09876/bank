import { Router } from "express";
import {
  createArea,
  deleteArea,
  getAllArea,
  getAreaById,
  updateArea,
} from "../../Controller/areaController/Area.js";
const router = Router();

router.route("/createArea").post(createArea);
router.route("/getallArea").get(getAllArea);
router.route("/AreaById/:cityId").get(getAreaById);
router.route("/updateArea/:id").put(updateArea);
router.route("/deleteArea/:id").delete(deleteArea);

export default router;
