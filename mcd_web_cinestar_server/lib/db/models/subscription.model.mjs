import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const subscriptionSchema = new Schema({
  email: { type: String, required: true, unique: true },
  created: { type: Date, default: Date.now },
});

export default mongoose.models.subscription ||
  mongoose.model("subscription", subscriptionSchema);
