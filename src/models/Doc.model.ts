import mongoose, { Schema, Document, Model } from "mongoose";

export interface Doc extends Document {
  url: string;
  responseId: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
}

const docSchema: Schema<Doc> = new Schema({
  url: {
    type: String,
    required: true,
  },
  responseId: {
    type: Schema.Types.ObjectId,
    ref: "Responses",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const DocModel: Model<Doc> =
  mongoose.models.Doc || mongoose.model("Doc", docSchema);

export default DocModel;
