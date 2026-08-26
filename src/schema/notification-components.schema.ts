import { Schema } from "mongoose";
import { NOTIFICATION_LIMITS } from "../constants";
export const NotificationActionSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: NOTIFICATION_LIMITS.ACTION_LABEL_MAX_LENGTH,
    },

    url: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.ACTION_URL_MAX_LENGTH,
    },

    actionId: {
      type: String,
      trim: true,
      maxlength: NOTIFICATION_LIMITS.ACTION_ID_MAX_LENGTH,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    _id: false,
    strict: true,
  },
);
export const NotificationTemplateSchema = new Schema(
  {
    templateId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    templateVersion: {
      type: Number,
      required: true,
      min: 1,
    },

    variables: {
      type: Schema.Types.Mixed,
    },
  },
  {
    _id: false,
    strict: true,
  },
);
