import Lead from "../model/LeadGeneration.js";

export async function createLead(req,res,next) {
    try{
        const data = req.body;
        const details ={
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