import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    excerpt: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Story",
    },

    coverImage: {
      type: String,
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Story =
  mongoose.models.Story ||
  mongoose.model("Story", StorySchema);

export default Story;