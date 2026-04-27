import { Schema } from "mongoose";
import { Address } from "../types";

export const AddressSchema = new Schema<Address>(
  {
    currentAddress: { type: String, required: true, trim: true },
    permanentAddress: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
  },
  { _id: false }, // embedded sub-schema, no need for separate _id
);
