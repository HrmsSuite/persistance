import { ACCESS_SCOPES } from "../constants/access_Scope";

export type AccessScope = (typeof ACCESS_SCOPES)[keyof typeof ACCESS_SCOPES];

export interface AccessScopeResult {
  scope: AccessScope;
  employeeIds?: string[];
}
