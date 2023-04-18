import mongoose from "mongoose";

//MONGOOSE SCHEMA THAT WILL BE USED TO INTERACT WITH THE USER COLLECTION IN THE DATABASE.
const ProtectSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, dafault: false },
  },
  { timestamps: true }
);

export const Protect = mongoose.model("Protect", ProtectSchema);
