import { Schema } from "mongoose";

export interface IResponse extends Document {
  response: string; // assuming response is of JSON type
  type: number;
}

// AI Response Schema
export const responseSchema: Schema<IResponse> = new Schema({
  response: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
});
