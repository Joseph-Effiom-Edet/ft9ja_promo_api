import mongoose from "mongoose";

//MONGOOSE SCHEMA THAT WILL BE USED TO INTERACT WITH THE USER COLLECTION IN THE DATABASE.
const ParticipantSchema = new mongoose.Schema(
  {
    proofOfAdvocacy: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    nationality: { type: String, required: true },
  },
  { timestamps: true }
);

export const Participant = mongoose.model("Participant", ParticipantSchema);
