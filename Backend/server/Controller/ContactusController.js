import contactusDb from "../model/ContactusModel.js"
 
export async function createcontactus(req, res, next){
    try{
        const data = req.body;
        const details = {
            email: data.email,
            phonenumber: data.phonenumber,
            subject: data.subject,
            message: data.message,
        };
        const createcontactus = await contactusDb.create(details);
        if (createcontactus){
            res.status(201).json({
                message: "contactus Created Successfully",
                data: createcontactus,
            });
        }
    } catch (err){
        console.log(err);
        next();
    }
}

export async function getcontactus(req, res, next){
    try{
        const getcontactus = await contactusDb.find();
        res.status(200).json({
            message:"get successfully",
            data:getcontactus,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        // next();
    }
}