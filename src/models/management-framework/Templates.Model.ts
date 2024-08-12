import mongoose, { Schema, Document, Model } from "mongoose";

interface IQnaPair {
  q: string;
  opt: string[];
  type: "E" | "S" | "G";
  id: number;
  subtype: string;
}

export interface ITemplate extends Document {
  name: string;
  qna_pair: IQnaPair[];
  responseIds: mongoose.Types.ObjectId[];
  endDate: Date;
}

const qnaPairSchema: Schema<IQnaPair> = new Schema({
  q: { type: String, required: true },
  opt: [{ type: String }],
  type: { type: String, required: true },
  id: { type: Number, required: true },
  subtype: { type: String, requied: true },
});

const assessmentTemplateSchema: Schema<ITemplate> = new Schema(
  {
    name: { type: String, required: true },
    qna_pair: { type: [qnaPairSchema], required: true },
    responseIds: [{ type: Schema.Types.ObjectId, ref: "Response" }],
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Template: Model<ITemplate> =
  mongoose.models.Template ||
  mongoose.model<ITemplate>("Template", assessmentTemplateSchema);

export { Template };
