import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISupplier extends Document {
  username: string;
  password: string;
  owner: string;
  responseIds: mongoose.Types.ObjectId[];
  identifier: string;
}

const supplierSchema: Schema<ISupplier> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    owner: { type: String, required: true },
    responseIds: [{ type: Schema.Types.ObjectId, ref: "Response" }],
    identifier: { type: String, required: true },
  },
  { timestamps: true }
);

const Supplier: Model<ISupplier> =
  mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema);

export { Supplier };
