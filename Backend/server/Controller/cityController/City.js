import CityDb from "../../model/cityModel/City.js";

export async function createCity(req, res, next) {
  try {
    const data = req.body;
    const details = {
      cityName: data.cityName,
      districtId: data.districtId,
    };
    const createCity = await CityDb.create(details);
    res.status(201).json({
      message: "City Created Successfully",
      data: createCity,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}
export async function getAllCity(req, res, next) {
  try {
    const getCitylist = await CityDb.find();
    res.status(200).json({
      message: "get successfully",
      data: getCitylist,
    });
  } catch (err) {
    next();
  }
}

export async function getCityById(req, res, next) {
  try {
    const districtId = req.params.districtId;
    const getCitylist = await CityDb.find({ districtId });
    res.status(200).json({
      message: "get successfully",
      data: getCitylist,
    });
  } catch (err) {
    next();
  }
}

export async function updateCity(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const details = {
      cityName: data.cityName,
      districtId: data.districtId,
    };
    const updateCity = await CityDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.status(200).json({
      message: "create successfully",
      data: updateCity,
    });
  } catch (err) {
    next();
  }
}

export async function deleteCity(req, res, next) {
  try {
    const data = req.params;
    const cityId = data.id;
    const deleteCity = await CityDb.findByIdAndDelete(cityId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: deleteCity,
    });
  } catch (error) {
    next();
  }
}
