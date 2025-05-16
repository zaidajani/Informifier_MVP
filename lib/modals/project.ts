import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

// 👇 Compound index: ensures project name is unique *per user*
ProjectSchema.index({ name: 1, userId: 1 }, { unique: true });

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
