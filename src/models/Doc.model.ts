import mongoose, { Schema, Document, Model } from "mongoose";
import { IResponse as Response, responseSchema } from "./Response.model";

export interface Doc extends Document {
  url: string;
  responses: Response[];
  owner: mongoose.Types.ObjectId;
  name: string;
  chatId?: mongoose.Types.ObjectId;
}

const docSchema: Schema<Doc> = new Schema({
  url: {
    type: String,
    required: true,
  },
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
  chatId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
});

const DocModel: Model<Doc> =
  mongoose.models.Doc || mongoose.model("Doc", docSchema);

export default DocModel;
