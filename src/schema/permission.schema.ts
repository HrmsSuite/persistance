import { Schema } from "mongoose";
import { IPermission } from "../types";
import {
  PERMISSION_MODULES,
  PERMISSION_ACTIONS,
} from "../constants";


export const PermissionSchema =
new Schema<IPermission>(

{
  
  key: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },


  module: {
    type: String,
    enum: PERMISSION_MODULES,
    required: true,
  },


  action: {
    type: String,
    enum: PERMISSION_ACTIONS,
    required: true,
  },


  name: {
    type: String,
    required: true,
    trim: true,
  },


  description: {
    type: String,
    trim: true,
    default: null,
  },


  isSystem: {
    type: Boolean,
    default: true,
  },


  isActive: {
    type: Boolean,
    default: true,
  },


  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },


  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },


},

{
  timestamps:true,
  versionKey:false,
}

);



// Prevent duplicate permissions

PermissionSchema.index(
{
 key:1,
},
{
 unique:true,
}
);


// Faster module filtering

PermissionSchema.index({
 module:1,
 isActive:1,
});