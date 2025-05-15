import nodemailer from "nodemailer";
import contactusDb from "../model/ContactusModel.js";

// export async function createcontactus(req, res, next){
//     try{
//         const data = req.body;
//         const details = {
//             email: data.email,
//             phonenumber: data.phonenumber,
//             subject: data.subject,
//             message: data.message,
//         };
//         const createcontactus = await contactusDb.create(details);
//         if (createcontactus){
//             res.status(201).json({
//                 message: "contactus Created Successfully",
//                 data: createcontactus,
//             });
//         }
//     } catch (err){
//         console.log(err);
//         next();
//     }
// }
// export async function createcontactus(req, res, next){
//     try{
//         const data = req.body;

//         const details = {
//             email: data.email,
//             phonenumber: data.phonenumber,
//             subject: data.subject,
//             message: data.message,
//         };
//         const createcontactus = await contactusDb.create(details);
//         if (createcontactus){
//             res.status(201).json({
//                 message: "contactus Created Successfully",
//                 data: createcontactus,
//             });
//         }
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//               user: "asajithkumar17@gmail.com",
//               pass: "yszfzogykciywlid",
//             },
//           });

//           const mailOptions = {
//             from: details.email,
//             to: "subithasubi489@gmail.com",
//             subject: "User quires",
//             html: ` <p>${details.message}</p>`,
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.error("Error sending email:", error);
//               return res.status(500).json({
//                 message: "Failed to send email notification",
//               });
//             } else {
//               console.log("Email sent:", info.response);
//               res.status(201).json({
//                 message: "contactus Created Successfully",
//                 data: createcontactus,
//               });
//             }
//           });
//     } catch (err){
//         console.log(err);
//         next();
//     }
// }

export async function createcontactus(req, res, next) {
  try {
    const data = req.body;

    const details = {
      email: data.email,
      phonenumber: data.phonenumber,
      subject: data.subject,
      message: data.message,
      serviceType: data.serviceType,
    };

    const createcontactus = await contactusDb.create(details);
    if (createcontactus) {
      res.status(201).json({
        message: "Contact Us entry created successfully",
        data: createcontactus,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "asajithkumar17@gmail.com",
        pass: "yszfzogykciywlid",
      },
    });

    const mailOptions = {
      from: "User Query <${details.email}>",
      to: "asajithkumar17@gmail.com",
      subject: details.subject || "User Queries",
      html: `<p>${details.message}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending emails:", error);
        return res.status(500).json({
          message: "Failed to send email notification",
        });
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).json({
          message: "Email sent successfully",
          data: createcontactus,
        });
      }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function getcontactus(req, res, next) {
  try {
    const getcontactus = await contactusDb.find();
    res.status(200).json({
      message: "get successfully",
      data: getcontactus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    // next();
  }
}
