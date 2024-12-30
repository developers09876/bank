import DistrictDb from "../../model/districtModel/District.js";

export async function createDistrict(req, res, next) {
  try {
    const data = req.body;
    const details = {
      districtName: data.districtName,
      stateId: data.stateId,
    };
    const createDistrict = await DistrictDb.create(details);
    res.status(201).json({
      message: "District Created Successfully",
      data: createDistrict,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}
export async function getAllDistrict(req, res, next) {
  try {
    const getDistrictlist = await DistrictDb.find();
    res.status(200).json({
      message: "get successfully",
      data: getDistrictlist,
    });
  } catch (err) {
    next();
  }
}

export async function getDistrictById(req, res, next) {
  console.log("req.params", req.params.state_id);

  try {
    const state_id = req.params.state_id;
    const getDistrictlist = await DistrictDb.find({ state_id: state_id });
    res.status(200).json({
      message: "get successfully",
      data: getDistrictlist,
    });
  } catch (err) {
    next();
  }
}

export async function updateDistrict(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const details = {
      districtName: data.districtName,
      stateId: data.stateId,
    };
    const updateDistrict = await DistrictDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.status(200).json({
      message: "create successfully",
      data: updateDistrict,
    });
  } catch (err) {
    next();
  }
}

export async function deleteDistrict(req, res, next) {
  try {
    const data = req.params;
    const districtId = data.id;
    const deleteDistrict = await DistrictDb.findByIdAndDelete(districtId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: deleteDistrict,
    });
  } catch (error) {
    next();
  }
}
