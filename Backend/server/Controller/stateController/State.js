import StateDb from "../../model/stateModel/State.js";

export async function createState(req, res, next) {
  console.log("aaaa", req.body);

  try {
    const data = req.body;
    const details = {
      name: data.name,
      country_id: data.country_id,
    };
    console.log("data", data);

    const createState = await StateDb.create(details);
    res.status(201).json({
      message: "Statey Created Successfully",
      data: createState,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}
export async function getAllState(req, res, next) {
  try {
    const getStatelist = await StateDb.find();
    res.status(200).json({
      message: "get successfully",
      data: getStatelist,
    });
  } catch (err) {
    next();
  }
}

export async function getStateById(req, res, next) {
  console.log("req.params", req.params.country_id);

  try {
    const country_id = req.params.country_id;

    const getStatelist = await StateDb.find({ country_id: country_id });
    if (getStatelist) {
      res.status(200).json({
        message: "get successfully",
        data: getStatelist,
      });
    }
  } catch (err) {
    console.log(err?.message);
  }
}

export async function updateState(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const details = {
      stateName: data.stateName,
      countryId: data.countryId,
    };
    const updateState = await StateDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.status(200).json({
      message: "create successfully",
      data: updateState,
    });
  } catch (err) {
    next();
  }
}

export async function deleteState(req, res, next) {
  try {
    const data = req.params;
    const stateId = data.id;
    const deleteState = await StateDb.findByIdAndDelete(stateId);
    res.status(200).json({
      message: "State Successfully",
      data: deleteState,
    });
  } catch (error) {
    next();
  }
}
