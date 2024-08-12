import mongoose, { Schema, Document, Model } from "mongoose";

interface IQnaOption {
  [id: string]: string;
}

export interface IResponse extends Document {
  qna_responses: IQnaOption;
  owner: mongoose.Types.ObjectId;
  quesionnareId: mongoose.Types.ObjectId;
  score: number;
}

const responseSchema: Schema<IResponse> = new Schema(
  {
    qna_responses: { type: Object, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quesionnareId: {
      type: Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

const Response: Model<IResponse> =
  mongoose.models.Response ||
  mongoose.model<IResponse>("QnaResponse", responseSchema);

export { Response };
