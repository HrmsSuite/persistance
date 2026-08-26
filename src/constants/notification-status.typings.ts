/**
 * Notification constants.
 *
 * IMPORTANT:
 * These constants represent infrastructure-level concepts.
 *
 * Business modules should NOT require changes to the notification
 * service whenever a new business feature is introduced.
 */

/* -------------------------------------------------------------------------- */
/* Notification Types                                                         */
/* -------------------------------------------------------------------------- */

export const NOTIFICATION_TYPES = [
  "INFORMATION",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "ALERT",
  "REMINDER",
  "ANNOUNCEMENT",
  "ACTION_REQUIRED",
  "SYSTEM",
] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

/* -------------------------------------------------------------------------- */
/* Notification Channels                                                      */
/* -------------------------------------------------------------------------- */

export const NOTIFICATION_CHANNELS = [
  "IN_APP",
  "EMAIL",
  "SMS",
  "PUSH",
  "WHATSAPP",
  "WEBHOOK",
] as const;

export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number];

/* -------------------------------------------------------------------------- */
/* Notification Priority                                                      */
/* -------------------------------------------------------------------------- */

export const NOTIFICATION_PRIORITIES = [
  "LOW",
  "NORMAL",
  "HIGH",
  "URGENT",
] as const;

export type NotificationPriority = (typeof NOTIFICATION_PRIORITIES)[number];

/* -------------------------------------------------------------------------- */
/* Notification Lifecycle Status                                              */
/* -------------------------------------------------------------------------- */

export const NOTIFICATION_STATUSES = [
  "PENDING",
  "SCHEDULED",
  "PROCESSING",
  "COMPLETED",
  "PARTIALLY_COMPLETED",
  "FAILED",
  "CANCELLED",
  "EXPIRED",
] as const;

export type NotificationStatus = (typeof NOTIFICATION_STATUSES)[number];

/* -------------------------------------------------------------------------- */
/* Delivery Status                                                            */
/* -------------------------------------------------------------------------- */

export const NOTIFICATION_DELIVERY_STATUSES = [
  "PENDING",
  "PROCESSING",
  "SENT",
  "DELIVERED",
  "READ",
  "FAILED",
  "CANCELLED",
  "EXPIRED",
] as const;

export type NotificationDeliveryStatus =
  (typeof NOTIFICATION_DELIVERY_STATUSES)[number];

/* -------------------------------------------------------------------------- */
/* Recipient Types                                                            */
/* -------------------------------------------------------------------------- */

export const NOTIFICATION_RECIPIENT_TYPES = [
  "USER",
  "EMPLOYEE",
  "STUDENT",
  "CUSTOMER",
  "ADMIN",
  "MANAGER",
  "ROLE",
  "GROUP",
  "EXTERNAL",
] as const;

export type NotificationRecipientType =
  (typeof NOTIFICATION_RECIPIENT_TYPES)[number];

/* -------------------------------------------------------------------------- */
/* Entity Types                                                               */
/* -------------------------------------------------------------------------- */

export const NOTIFICATION_ENTITY_TYPES = [
  "COMPANY",
  "USER",
  "EMPLOYEE",
  "STUDENT",
  "CUSTOMER",

  "ATTENDANCE",
  "LEAVE",
  "PAYROLL",

  "ASSET",
  "PROCUREMENT",
  "PURCHASE_ORDER",

  "TICKET",
  "TASK",

  "EVENT",
  "DOCUMENT",
  "APPROVAL",
  "WORKFLOW",

  "SYSTEM",
  "OTHER",
] as const;

export type NotificationEntityType = (typeof NOTIFICATION_ENTITY_TYPES)[number];

/* -------------------------------------------------------------------------- */
/* Audit Actions                                                              */
/* -------------------------------------------------------------------------- */

export const NOTIFICATION_AUDIT_ACTIONS = [
  "CREATED",
  "SCHEDULED",
  "PROCESSING_STARTED",
  "SENT",
  "DELIVERED",
  "READ",
  "FAILED",
  "RETRIED",
  "CANCELLED",
  "EXPIRED",
] as const;

export type NotificationAuditAction =
  (typeof NOTIFICATION_AUDIT_ACTIONS)[number];

/* -------------------------------------------------------------------------- */
/* Defaults                                                                   */
/* -------------------------------------------------------------------------- */

export const NOTIFICATION_DEFAULTS = {
  TYPE: "INFORMATION",
  PRIORITY: "NORMAL",
  STATUS: "PENDING",
  DELIVERY_STATUS: "PENDING",
  ATTEMPT_COUNT: 0,
  MAX_ATTEMPTS: 3,
  IS_VISIBLE: true,
  IS_READ: false,
} as const satisfies {
  TYPE: NotificationType;
  PRIORITY: NotificationPriority;
  STATUS: NotificationStatus;
  DELIVERY_STATUS: NotificationDeliveryStatus;
  ATTEMPT_COUNT: number;
  MAX_ATTEMPTS: number;
  IS_VISIBLE: boolean;
  IS_READ: boolean;
};
/* -------------------------------------------------------------------------- */
/* Limits                                                                     */
/* -------------------------------------------------------------------------- */

export const NOTIFICATION_LIMITS = {
  TITLE_MAX_LENGTH: 300,
  MESSAGE_MAX_LENGTH: 5000,
  BODY_MAX_LENGTH: 50000,

  SOURCE_SERVICE_MAX_LENGTH: 100,
  SOURCE_MODULE_MAX_LENGTH: 100,
  SOURCE_EVENT_MAX_LENGTH: 200,

  IDEMPOTENCY_KEY_MAX_LENGTH: 255,
  CORRELATION_ID_MAX_LENGTH: 255,
  CAUSATION_ID_MAX_LENGTH: 255,
  REQUEST_ID_MAX_LENGTH: 255,

  PROVIDER_MAX_LENGTH: 100,
  PROVIDER_MESSAGE_ID_MAX_LENGTH: 500,

  ERROR_MESSAGE_MAX_LENGTH: 5000,

  ACTION_LABEL_MAX_LENGTH: 100,
  ACTION_URL_MAX_LENGTH: 2000,
  ACTION_ID_MAX_LENGTH: 100,

  RECIPIENT_EXTERNAL_ID_MAX_LENGTH: 255,
  RECIPIENT_NAME_MAX_LENGTH: 300,
  RECIPIENT_EMAIL_MAX_LENGTH: 320,
  RECIPIENT_PHONE_MAX_LENGTH: 30,
  RECIPIENT_PUSH_TOKEN_MAX_LENGTH: 1000,

  MAX_ACTIONS: 10,
  MAX_CHANNELS: 10,
  MAX_RECIPIENTS: 100,

  MAX_ATTEMPTS: 10,
} as const;
