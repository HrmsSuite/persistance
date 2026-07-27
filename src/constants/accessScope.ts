export const ACCESS_SCOPES = {
  ALL: "ALL",
  HIERARCHY: "HIERARCHY",
  SELF: "SELF",
} as const;

export type AccessScope =
  (typeof ACCESS_SCOPES)[keyof typeof ACCESS_SCOPES];