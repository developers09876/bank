import CountryDb from "../../model/countryModel/Country.js";

export async function createCountry(req, res, next) {
  try {
    const data = req.body;
    const details = {
      name: data.name,
    };
    console.log("data.name", data);
    const createCountry = await CountryDb.create(details);
    res.status(201).json({
      message: "Country Created Successfully",
      data: createCountry,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}
export async function getAllCountry(req, res, next) {
  try {
    const getCountrylist = await CountryDb.find();
    res.status(200).json({
      message: "get successfully",
      data: getCountrylist,
    });
  } catch (err) {
    next();
  }
}

export async function updateCountry(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const details = {
      countryName: data.countryName,
    };
    const updateCountry = await CountryDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.status(200).json({
      message: "create successfully",
      data: updateCountry,
    });
  } catch (err) {
    next();
  }
}

export async function deleteCountry(req, res, next) {
  try {
    const data = req.params;
    const countryId = data.id;
    const deleteCountry = await CountryDb.findByIdAndDelete(countryId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: deleteCountry,
    });
  } catch (error) {
    next();
  }
}
