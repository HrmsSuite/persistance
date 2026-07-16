import { PERMISSIONS } from "./permissions";

export const ROLE_TYPES = [
  "SYSTEM",
  "CUSTOM",
] as const;

export type RoleType = (typeof ROLE_TYPES)[number];

type NestedValues<T> = T extends object
  ? NestedValues<T[keyof T]>
  : T;

export type Permission =  NestedValues<typeof PERMISSIONS>;