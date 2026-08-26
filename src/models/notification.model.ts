import { model, type Model } from "mongoose";

import { NotificationSchema } from "../schema/notification.schema";
import type { Notification } from "../types";

/**
 * Mongoose model for the generic notification entity.
 *
 * The model has no dependency on HRMS-specific business models,
 * allowing the notification domain to be extracted into a standalone
 * notification service in the future.
 */
export const NotificationModel: Model<Notification> = model<Notification>(
  "Notification",
  NotificationSchema,
  "notifications",
);
