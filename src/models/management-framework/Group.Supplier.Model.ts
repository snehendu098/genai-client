import mongoose, { Schema, Document, Model } from "mongoose";

interface ISupplierGroup extends Document {
  name: string;
  supplierIds: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
}

const supplierSchema: Schema<ISupplierGroup> = new Schema(
  {
    name: { type: String, required: true },
    supplierIds: [{ type: Schema.Types.ObjectId, ref: "Supplier" }],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Group: Model<ISupplierGroup> =
  mongoose.models.Group || mongoose.model("Group", supplierSchema);

export { Group };
