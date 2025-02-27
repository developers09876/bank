import nodemailer from "nodemailer";
import User from "../model/signupModel.js";
import jwt from "jsonwebtoken";

export async function forgetPassword(req, res, next) {
  try {
    const data = req.body;
    console.log("data", data);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ferilcrosshurdle@gmail.com",
        pass: "ntjlgqizfbebdshd",
      },
      tls: {
        rejectUnauthorized: false, // Ignore self-signed certificate errors
      },
    });

    const otp = Math.floor(Math.random() * 9000 + 1000);
    console.log("Generated OTP:", otp);

    const mailOptions = {
      from: "ferilcrosshurdle@gmail.com",
      to: data.email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP for password reset is: <b>${otp}</b></p>`,
    };

    const checkEmail = await User.findOne({ email: data.email });
    if (!checkEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Email error:", error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);

        const updateCode = await User.findByIdAndUpdate(
          checkEmail._id,
          { forgetPasswordCode: otp },
          { new: true }
        );

        console.log("Updated user with OTP:", updateCode);
        return res.status(200).json({
          message: "OTP sent successfully",
          data: updateCode,
        });
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function checkVerifivationCode(req, res, next) {
  try {
    const data = req.body;
    console.log("first", data);

    const checkEmail = await User.findOne({ email: data.email });
    console.log("checkEmail", checkEmail);

    if (checkEmail) {
      const matchVerificationCode = checkEmail.forgetPasswordCode === data.code;
      const token = jwt.sign({ userId: checkEmail._id }, "your_jwt_secret", {
        expiresIn: "1h",
      });

      if (matchVerificationCode) {
        res.status(200).json({
          message: "verification code matched",
          data: { checkEmail, token },
        });
      } else {
        res.status(400).json({
          message: "verification code mismatched",
        });
      }
    } else {
      res.status(400).json({
        message: "Email doesnot exist try again !!!",
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}
