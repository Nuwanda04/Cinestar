import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

export default mongoose.models.faq || mongoose.model("faq", faqSchema);
