import mongoose, { Schema, Document, Model } from "mongoose";

export interface IChat extends Document {
  question: string;
  answer: string;
  helpful: boolean | null;
  doc: mongoose.Types.ObjectId;
}

const chatSchema: Schema<IChat> = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    helpful: {
      type: Boolean,
      default: null,
    },
    doc: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const ChatModel: Model<IChat> =
  mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default ChatModel;
