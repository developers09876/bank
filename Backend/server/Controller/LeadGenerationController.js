import Lead from "../model/LeadGeneration.js";

export async function createLead(req,res,next) {
    try{
        const data = req.body;
        const details ={
            firstname: data.firstname,
            lastname:data.lastname,
            userId: data.userId ,
            phone: data.phone ,
            email: data.email,
            aadhar: data.aadhar,
            purpose: data.purpose,
            amount: data.amount,
            howimidiate: data.howimidiate,
            previouslyapplied: data.previouslyapplied,
            panno: data.panno,
        }
        const lead = await Lead.create(details);
        if(lead){
            res.status(201).json({
                message : "Lead created Successfully",
                data : lead,
            })
        }
    }
    catch(err){
        console.log("error", err)
        next();
    }
}

export async function updateLead(req, res, next) {
    try {
        const leadId = req.params.id; 
        const data = req.body;

        const updatedDetails = {
            firstname: data.firstname,
            lastname: data.lastname,
            userId: data.userId,
            phone: data.phone,
            email: data.email,
            aadhar: data.aadhar,
            purpose: data.purpose,
            amount: data.amount,
            howimidiate: data.howimidiate,
            previouslyapplied: data.previouslyapplied,
            panno: data.panno,
            date: data.date,
            remarks: data.remarks,
            status: data.status,
        };

        const updatedLead = await Lead.findByIdAndUpdate(leadId, updatedDetails, { 
            new: true, 
            runValidators: true 
        });

        if (updatedLead) {
            res.status(200).json({
                message: "Lead updated successfully",
                data: updatedLead,
            });
        } else {
            res.status(404).json({
                message: "Lead not found",
            });
        }
    } catch (err) {
        console.log("error", err);
        next(err); 
    }
}



export async function getallLead(req, res, next) {
    try {
      const jobs = await Lead.find();
      res.status(200).json(jobs);
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }



export async function getById(req, res, next) {
  try {
      const { id } = req.params; 
      const leads = await Lead.find({ userId: id }); 
      
      if (leads && leads.length > 0) {
          res.status(200).json({
              message: "Leads fetched successfully",
              data: leads,
          });
      } else {
          res.status(404).json({
              message: "No leads found for the given user ID",
          });
      }
  } catch (error) {
      console.error("Error fetching leads by ID:", error);
      res.status(500).json({
          message: "An error occurred while fetching leads",
          error: error.message,
      });
  }
}
  