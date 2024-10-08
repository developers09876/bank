import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Signup = new Schema({
  name: String,
  email: String,
  phonenumber:Number,
  password:String,
  confirmpassword:String
  
});

Signup.set("autoIndex", true);

const SignupDB = model("Signup", Signup);
SignupDB.createIndexes();

export default SignupDB;
