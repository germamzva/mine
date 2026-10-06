import mongoose from "mongoose";

const preferrenceSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Preferrence", preferrenceSchema);
