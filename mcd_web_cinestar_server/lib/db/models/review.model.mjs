import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const reviewSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  created: { type: Date, default: Date.now },
});

export default mongoose.models.review || mongoose.model("review", reviewSchema);
