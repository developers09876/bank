import subscriptionPriceDb from "../model/SubscriptionPriceModel.js";

export async function createSubscriptionPrice(req, res, next) {
  try {
    const data = req.body;
    const details = {
        subsriptionPrice: data.subsriptionPrice,
      offerPrice: data.offerPrice,
    };
    const newsubscriptionPrice = await subscriptionPriceDb.create(details);
    if (newsubscriptionPrice) {
      res.status(201).json({
        message: "Price Created Successfully",
        data: newsubscriptionPrice,
      });
    }
  } catch (error) {
    console.log("error", error);
    next();
  }
}


export async function updateSubscriptionPrice(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updateDetails = {
        subsriptionPrice: data.subsriptionPrice,
      offerPrice: data.offerPrice,
      };
  
      const updatedRecord = await subscriptionPriceDb.findByIdAndUpdate(
        id,
        updateDetails,
        {
          new: true,
          runValidators: true,
        }
      );
  
      if (updatedRecord) {
        res.status(200).json({
          message: "Subscription Price Updated Successfully",
          data: updatedRecord,
        });
      } else {
        res.status(404).json({
          message: "Record not found",
        });
      }
    } catch (err) {
      console.error("Error updating Subscription Price record:", err);
      res.status(500).json({
        message: "Failed to update Subscription Price record",
      });
      next(err);
    }
  }

  export const getAllSubscriptionPrice = async (req, res) => {
    try {
      const getSubscriptions = await subscriptionPriceDb.find();
      res.status(200).json(getSubscriptions);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  };