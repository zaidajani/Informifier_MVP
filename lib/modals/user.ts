import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    clerkUserId: { type: String, required: true, unique: true },
    apikey: { type: String, required: true, unique: true },
    usages: {type: Number },
    projects: { type: Number },
    events: { type: Number },
    Occurrences: { type: Number }
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
