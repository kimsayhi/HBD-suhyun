import mongoose from "mongoose";

const LetterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
});

export default mongoose.models.Letter || mongoose.model("Letter", LetterSchema);
