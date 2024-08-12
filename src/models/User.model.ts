import mongoose, { Schema, Document, Model } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  forgotPasswordCode?: string;
  forgotPasswordCodeExpiry?: Date;
  verifyCode: string;
  verifyCodeExpiry: Date;
  docsGenerated: mongoose.Types.ObjectId[];
  isVerified: boolean;
  isApproved: boolean;
  supplierIds: mongoose.Types.ObjectId[];
}

const userSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  forgotPasswordCode: String,
  forgotPasswordCodeExpiry: Date,
  verifyCode: String,
  verifyCodeExpiry: Date,
  docsGenerated: [{ type: Schema.Types.ObjectId, ref: "Doc" }],
  isVerified: { type: Boolean, default: false },
  supplierIds: [{ type: Schema.Types.ObjectId, ref: "Supplier" }],
  isApproved: { type: Boolean, default: false },
});

const UserModel: Model<User> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
