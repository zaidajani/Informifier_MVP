import { Schema, model, models } from "mongoose";

// Sub-schema for event occurrences
const EventOccurredSchema = new Schema(
  {
    eventId: { type: String },
    discordUserId: { type: String },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }, // Auto-generated timestamp
  },
  { _id: false } // Optional: disables _id for each occurrence object
);

// Define an Event sub-schema
const EventSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    service: { type: String },
    color: { type: String },
    eventOccurred: [EventOccurredSchema], 
  },
  { _id: true }
);

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: { type: String, required: true },
    events: [EventSchema]
  },
  { timestamps: true }
);

ProjectSchema.index({ name: 1, userId: 1 }, { unique: true });

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
