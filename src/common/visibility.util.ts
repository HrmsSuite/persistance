// persistence/src/utils/visibility.util.ts

import type { Model } from "mongoose";

export type VisibilityParams = {
  companyId: string;
  employeeId: string | null;
  role: string;
  // Optional: if you want to pass hierarchyService from outside
  getAllReports?: (companyId: string, employeeId: string) => Promise<string[]>;
};

/**
 * Returns list of employee IDs that the current user is allowed to see.
 * - Admin: all employees in the company
 * - Non-admin: self + all direct/indirect reports
 *
 * This function does NOT call any DB directly; it expects you to pass
 * a function to fetch reports. This keeps it flexible across services.
 */
export async function getVisibleEmployeeIds(
  params: VisibilityParams,
): Promise<string[]> {
  const { companyId, employeeId, role, getAllReports } = params;

  // Admin: see everyone
  if (role === "admin") {
    // For admin, we don't need hierarchy; caller can decide to fetch all IDs or not.
    // Here we just return a marker; actual "all IDs" logic can be done in service.
    // But if you want, you can also accept an EmployeeModel and fetch here.
    return []; // special marker: "no restriction"
  }

  if (!employeeId) {
    return [];
  }

  if (!getAllReports) {
    throw new Error("getAllReports is required for non-admin visibility");
  }

  const reports = await getAllReports(companyId, employeeId);
  return [employeeId, ...reports];
}

/**
 * Helper to apply visibility filter to a Mongoose query.
 * Usage:
 *   const visibleIds = await getVisibleEmployeeIds({...});
 *   const query = applyVisibilityFilter(LeaveModel.find({ companyId }), visibleIds, "employeeId");
 */
export function applyVisibilityFilter<T>(
  query: ReturnType<Model<T>["find"]>,
  visibleEmployeeIds: string[],
  field = "employeeId",
) {
  return query.where({ [field]: { $in: visibleEmployeeIds } });
}
