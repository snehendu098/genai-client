import mongoose, { Schema, Document, Model } from "mongoose";
import { IResponse as Response, responseSchema } from "./Response.model";

export interface Doc extends Document {
  docs: SingleDoc[];
  responses: Response[];
  owner: mongoose.Types.ObjectId;
  name: string;
  chatId: mongoose.Types.ObjectId[] | null;
  chatInitiate: boolean;
}

export type SingleDoc = {
  url: string;
  name: string;
  id: string;
};

const docSchema: Schema<Doc> = new Schema({
  docs: [
    {
      type: Object,
      required: true,
    },
  ],
  responses: [responseSchema],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    requried: true,
  },
  chatId: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  chatInitiate: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const DocModel: Model<Doc> =
  mongoose.models.Doc || mongoose.model("Doc", docSchema);

export default DocModel;
