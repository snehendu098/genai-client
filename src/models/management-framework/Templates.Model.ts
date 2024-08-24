import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITemplate extends Document {
  name: string;
  questionJson: object;
  responseIds: mongoose.Types.ObjectId[];
  endDate: Date;
  published: boolean;
  description: string;
}

const assessmentTemplateSchema: Schema<ITemplate> = new Schema(
  {
    name: { type: String, required: true },
    questionJson: { type: Object },
    responseIds: [{ type: Schema.Types.ObjectId, ref: "Response" }],
    endDate: { type: Date },
    published: { type: Boolean, required: true, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

const Template: Model<ITemplate> =
  mongoose.models.Template ||
  mongoose.model<ITemplate>("Template", assessmentTemplateSchema);

export { Template };
