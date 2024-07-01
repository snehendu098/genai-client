import mongoose, { Schema, Model } from "mongoose";

export interface Response extends Document {
  response: any; // assuming response is of JSON type
  docId: mongoose.Types.ObjectId;
  type: number;
}

// AI Response Schema
const responseSchema: Schema<Response> = new Schema({
  response: {
    type: Schema.Types.Mixed,
    required: true,
  },
  docId: {
    type: Schema.Types.ObjectId,
    ref: "Doc",
  },
  type: {
    type: Number,
    required: true,
  },
});

const ResponsesModel: Model<Response> =
  mongoose.models.Responses || mongoose.model("Response", responseSchema);

export default ResponsesModel;
