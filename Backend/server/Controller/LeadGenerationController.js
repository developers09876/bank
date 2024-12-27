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


export async function getallLead(req, res, next) {
    try {
      const jobs = await Lead.find();
      res.status(200).json(jobs);
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

  
export async function getLeadbyId(req, res, next) {
    try {
      const jobs = await Lead.findById(req.params.id);
      res.status(200).json(jobs);
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  