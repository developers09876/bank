import AreaDb from "../../model/areaModel/Area.js";

export async function createArea(req, res, next) {
  try {
    const data = req.body;
    console.log("fasf", data);
    const details = {
      areaName: data.areaName,
      cityId: data.cityId,
    };
    const createArea = await AreaDb.create(details);
    res.status(201).json({
      message: "Area Created Successfully",
      data: createArea,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}
export async function getAllArea(req, res, next) {
  try {
    const getArealist = await AreaDb.find();
    res.status(200).json({
      message: "get successfully",
      data: getArealist,
    });
  } catch (err) {
    next();
  }
}

export async function getAreaById(req, res, next) {
  try {
    const cityId = req.params.cityId;
    const getArealist = await AreaDb.find({ cityId });
    res.status(200).json({
      message: "get successfully",
      data: getArealist,
    });
  } catch (err) {
    next();
  }
}

export async function updateArea(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const details = {
      AreaName: data.AreaName,
      cityId: data.cityId,
    };
    const updateArea = await AreaDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.status(200).json({
      message: "create successfully",
      data: updateArea,
    });
  } catch (err) {
    next();
  }
}

export async function deleteArea(req, res, next) {
  try {
    const data = req.params;
    const AreaId = data.id;
    const deleteArea = await AreaDb.findByIdAndDelete(AreaId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: deleteArea,
    });
  } catch (error) {
    next();
  }
}
