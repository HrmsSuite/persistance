import { Types } from "mongoose";

/**
 * Defines how the salary component behaves.
 */
export type SalaryComponentType =
  | "EARNING"
  | "DEDUCTION"
  | "REIMBURSEMENT"
  | "BENEFIT"
  | "CONTRIBUTION"
  | "TAX";

/**
 * Defines how the component amount is calculated.
 */
export type SalaryCalculationType =
  | "FIXED"
  | "PERCENTAGE"
  | "FORMULA"
  | "UNIT_BASED"
  | "ATTENDANCE_BASED"
  | "MANUAL";

/**
 * Defines the base used for percentage calculations.
 *
 * Example:
 * HRA = 50% of BASIC
 * PF  = 12% of BASIC
 * Bonus = 10% of GROSS
 */
export type SalaryCalculationBase =
  | "BASIC"
  | "GROSS"
  | "CTC"
  | "NET"
  | "COMPONENT"
  | "CUSTOM";

/**
 * Determines where the component participates
 * in salary calculations.
 */
export type SalaryComponentInclusion = "GROSS" | "CTC" | "NET" | "NONE";

/**
 * Tax treatment of the component.
 */
export type SalaryTaxability = "TAXABLE" | "NON_TAXABLE" | "PARTIALLY_TAXABLE";

/**
 * Lifecycle status of a salary component.
 */
export type SalaryComponentStatus =
  | "DRAFT"
  | "ACTIVE"
  | "INACTIVE"
  | "ARCHIVED";

/**
 * Configuration for unit-based salary components.
 *
 * Examples:
 * Overtime = hours × rate
 * Travel = kilometers × rate
 * Meal Allowance = meals × rate
 */
export interface SalaryUnitConfig {
  unit: "HOUR" | "DAY" | "KM" | "MEAL" | "SHIFT" | "ITEM" | "CUSTOM";

  rate: number;

  customUnitName?: string;

  minimumUnits?: number;

  maximumUnits?: number;
}

/**
 * Salary Component
 *
 * Examples:
 * BASIC
 * HRA
 * TRANSPORT_ALLOWANCE
 * BONUS
 * PF
 * ESI
 * COMMISSION
 * OVERTIME
 *
 * Components are company-specific and configurable.
 */
export interface SalaryComponent {
  _id?: Types.ObjectId;
  /**
   * Multi-tenant company reference.
   */
  companyId: Types.ObjectId;
  /**
   * Unique code within a company.
   *
   * Example:
   * BASIC
   * HRA
   * PF
   * SPECIAL_ALLOWANCE
   */
  code: string;
  /**
   * Display name.
   */
  name: string;
  /**
   * Optional explanation of the component.
   */
  description?: string;
  /**
   * EARNING / DEDUCTION / BENEFIT etc.
   */
  type: SalaryComponentType;
  /**
   * FIXED / PERCENTAGE / FORMULA etc.
   */
  calculationType: SalaryCalculationType;
  /**
   * Used for percentage calculations.
   */
  calculationBase?: SalaryCalculationBase;
  /**
   * Used when calculationBase = COMPONENT.
   */
  baseComponentId?: Types.ObjectId;
  /**
   * Used for FIXED calculation.
   */
  fixedAmount?: number;
  /**
   * Used for PERCENTAGE calculation.
   */
  percentage?: number;
  /**
   * Used for FORMULA calculation.
   *
   * Example:
   * BASIC * 0.50
   * GROSS * 0.10
   */
  formula?: string;
  /**
   * Used for UNIT_BASED calculation.
   */
  unitConfig?: SalaryUnitConfig;
  /**
   * Determines whether the component contributes
   * to gross, CTC, net or none.
   */
  inclusion: SalaryComponentInclusion;
  /**
   * Tax treatment.
   */
  taxability: SalaryTaxability;
  /**
   * Whether this is a statutory component.
   *
   * Examples:
   * PF
   * ESI
   * Professional Tax
   */
  isStatutory: boolean;
  /**
   * Country/state/company-specific statutory configuration.
   *
   * Kept flexible because statutory rules vary by jurisdiction.
   */
  statutoryConfig?: Record<string, unknown>;
  /**
   * Whether an employee-specific salary can override
   * the calculated value.
   */
  allowManualOverride: boolean;
  /**
   * Whether this component can be added to
   * salary structures.
   */
  isConfigurable: boolean;
  /**
   * Current lifecycle state.
   */
  status: SalaryComponentStatus;
  /**
   * Controls UI/display ordering.
   */
  displayOrder?: number;
  /**
   * Allows future company-specific configuration
   * without changing the schema every time.
   */
  metadata?: Record<string, unknown>;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
