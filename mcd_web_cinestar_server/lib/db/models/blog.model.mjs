import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const blogSchema = new Schema({
  title: { type: String, required: true },
  teaser: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  created: { type: Date, default: Date.now },
});

export default mongoose.models.blog || mongoose.model("blog", blogSchema);
