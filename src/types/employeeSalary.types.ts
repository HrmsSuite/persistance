import { Types } from "mongoose"; 
import { SalaryPayFrequency } from "./SalaryStructureComponent.types";
import { SalaryCalculationBase } from "./salaryComponent.types";

/**
 * Lifecycle of an employee salary record.
 */
export type EmployeeSalaryStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "ACTIVE"
  | "INACTIVE"
  | "REJECTED"
  | "CANCELLED"
  | "ARCHIVED";

/**
 * How the employee salary was created.
 */
export type EmployeeSalarySource =
  | "STRUCTURE"
  | "CUSTOM"
  | "PROMOTION"
  | "REVISION"
  | "TRANSFER"
  | "JOINING"
  | "ADJUSTMENT"
  | "SYSTEM";

/**
 * Individual salary value assigned to an employee.
 *
 * This is intentionally separate from SalaryComponent because
 * the same component can have different values for different
 * employees.
 */
export interface EmployeeSalaryComponent {
  /**
   * Reference to salary_components._id
   */
  componentId: Types.ObjectId;

  /**
   * Actual calculated/assigned amount for this employee.
   */
  amount: number;

  /**
   * Optional percentage used for this employee.
   */
  percentage?: number;

  /**
   * Optional calculation base.
   */
  calculationBase?: SalaryCalculationBase;

  /**
   * Whether this value was manually overridden.
   */
  isOverridden: boolean;

  /**
   * Optional reason for overriding the component.
   */
  overrideReason?: string;

  /**
   * Display/calculation order.
   */
  displayOrder: number;

  /**
   * Additional employee/company-specific data.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Snapshot of important salary totals.
 *
 * These values are stored so historical salary records
 * remain accurate even if salary components or structures
 * are changed later.
 */
export interface EmployeeSalaryTotals {
  /**
   * Total earnings before deductions.
   */
  gross: number;

  /**
   * Total deductions.
   */
  totalDeductions: number;

  /**
   * Total employer contributions/benefits.
   */
  totalEmployerContributions: number;

  /**
   * Total cost to company.
   */
  ctc: number;

  /**
   * Net salary before payroll-specific adjustments.
   */
  net: number;
}

/**
 * Employee Salary
 *
 * Represents an actual salary assignment/revision
 * for one employee.
 */
export interface EmployeeSalary {
  _id?: Types.ObjectId;

  /**
   * Multi-tenant company reference.
   */
  companyId: Types.ObjectId;

  /**
   * Employee receiving this salary.
   */
  employeeId: Types.ObjectId;

  /**
   * Optional salary structure used as the base.
   *
   * Null/undefined when the employee has a completely
   * custom salary.
   */
  salaryStructureId?: Types.ObjectId;

  /**
   * Version of the salary structure used when
   * this salary was created.
   */
  salaryStructureVersion?: number;

  /**
   * Salary payment frequency.
   */
  payFrequency: SalaryPayFrequency;

  /**
   * Actual salary components assigned to the employee.
   */
  components: EmployeeSalaryComponent[];

  currency: string;

  /**
   * Calculated salary totals.
   */
  totals: EmployeeSalaryTotals;

  /**
   * Date from which this salary becomes effective.
   */
  effectiveFrom: Date;

  /**
   * Date until which this salary is valid.
   *
   * Null means currently valid/open-ended.
   */
  effectiveTo?: Date | null;

  /**
   * Salary lifecycle status.
   */
  status: EmployeeSalaryStatus;

  /**
   * How this salary assignment originated.
   */
  source: EmployeeSalarySource;

  /**
   * Revision number for this employee's salary.
   *
   * Example:
   *
   * Revision 1 → ₹5,00,000
   * Revision 2 → ₹6,00,000
   * Revision 3 → ₹7,00,000
   */
  revisionNumber: number;

  /**
   * Optional reason for salary revision.
   */
  revisionReason?: string;

  /**
   * Optional approval information.
   */
  approvedBy?: Types.ObjectId;

  approvedAt?: Date;

  /**
   * Optional rejection information.
   */
  rejectedBy?: Types.ObjectId;

  rejectedAt?: Date;

  rejectionReason?: string;

  /**
   * User who created the salary record.
   */
  createdBy?: Types.ObjectId;

  /**
   * User who last updated the salary record.
   */
  updatedBy?: Types.ObjectId;

  /**
   * Company/employee-specific extension data.
   */
  metadata?: Record<string, unknown>;

  createdAt?: Date;

  updatedAt?: Date;
}
