import SignupDB from "../Module/SignupModule.js";

export async function createSignupFields(req, res, next) {
  try {
    const data = req.body;
    console.log('first')
    const details = {
      name: data.name,
      email: data.email,
      phonenumber: data.phonenumber,
      password: data.password,
      confirmpassword: data.confirmpassword,
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(data.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (data.password != data.confirmpassword) {
      // return res.status(400).send({
      //   status: "error",
      //   message: "Password is not same",
        return res.status(400).json({ error: "Password is not same" });
      // });
    }
    const emailExists = await SignupDB.findOne({ email: data.email });

    if (emailExists) {
      return res.status(400).json({ error: "Email already used" });
    }

    const phoneNumberExists = await SignupDB.findOne({
      phonenumber: data.phonenumber,
    });

    if (phoneNumberExists) {
      return res.status(400).json({ error: "Phone Number already used" });
    }
    const createSignupField = await SignupDB.create(details);
    res.status(201).json({
      message: "Signup field Created Successfully",
      data: createSignupField,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}

//login
export async function createLoginFields(req, res, next) {
  try {
    const data = req.body;

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(data.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const emailExists = await SignupDB.findOne({ email: data.email });

    if (emailExists) {
      if (emailExists.password === data.password) {
        res.status(201).json({
          message: "Login Successfully",
          data: emailExists,
        });
      } else {
        return res.status(400).json({ error: "password mismatch" });
      }
    } else {
      return res.status(400).json({ error: "Email not found" });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}
