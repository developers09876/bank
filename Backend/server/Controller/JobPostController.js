import career from "../model/JobPostModel.js";


export async function createJob(req,res,next) {
    try{
        const data = req.body;
        const details = {
            jobTitle: data.jobTitle,
            jobType: data.jobType,
            company: data.company,
            location: data.location,
            description: data.description,
            designation: data.designation,
            requirements: data.requirements,
            salary: data.salary,
        }
        const job = await career.create(details);
        if(job){
            res.status(201).json({
                message:"Job Created Successfully",
                data: job,
            })
        }
    } catch (err) {
        console.log(err);
        next();
      
    }
}

export async function getallJobs(req,res,next) {
    try{
        const jobs = await career.find();
        res.status(200).json(jobs);
    }
 catch (error) {
    res.status(500).json({ message: error.message });
  }
}