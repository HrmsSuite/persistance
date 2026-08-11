import { Types } from "mongoose";
import { SalaryCalculationBase } from "./salaryComponent.types";

/**
 * Salary structure lifecycle status.
 */
export type SalaryStructureStatus =
  | "DRAFT"
  | "ACTIVE"
  | "INACTIVE"
  | "ARCHIVED";

/**
 * Salary payment frequency.
 */
export type SalaryPayFrequency =
  | "MONTHLY"
  | "WEEKLY"
  | "BI_WEEKLY"
  | "QUARTERLY"
  | "HALF_YEARLY"
  | "YEARLY";

/**
 * How a component behaves inside a particular
 * salary structure.
 *
 * The component itself defines its default behavior,
 * but the structure can override configurable values.
 */
export interface SalaryStructureComponent {
  /**
   * Reference to salary_components._id
   */
  componentId: Types.ObjectId;

  /**
   * Display/calculation order.
   */
  displayOrder: number;

  /**
   * Whether this component must exist
   * in this salary structure.
   */
  isRequired: boolean;

  /**
   * Whether employee-specific salary assignment
   * can override this component.
   */
  allowOverride: boolean;

  /**
   * Structure-level calculation override.
   *
   * If omitted, the configuration from
   * SalaryComponent is used.
   */
  fixedAmount?: number;

  /**
   * Structure-level percentage override.
   */
  percentage?: number;

  /**
   * Structure-level calculation base override.
   */
  calculationBase?: SalaryCalculationBase;

  /**
   * Structure-level formula override.
   */
  formula?: string;

  /**
   * Optional minimum allowed amount.
   */
  minimumAmount?: number;

  /**
   * Optional maximum allowed amount.
   */
  maximumAmount?: number;

  /**
   * Optional metadata for company-specific configuration.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Salary Structure
 *
 * Example:
 *
 * Software Engineer
 * Manager
 * Executive
 * Contractor
 * Intern
 *
 * A structure is company-specific and consists
 * of reusable salary components.
 */
export interface SalaryStructure {
  _id?: Types.ObjectId;

  /**
   * Multi-tenant company reference.
   */
  companyId: Types.ObjectId;

  /**
   * Unique structure code within a company.
   *
   * Example:
   * ENGINEER_MONTHLY
   * MANAGER_MONTHLY
   * CONTRACTOR
   */
  code: string;

  /**
   * Display name.
   */
  name: string;

  currency: string;

  /**
   * Optional description.
   */
  description?: string;

  /**
   * Optional business/category grouping.
   *
   * Example:
   * Engineering
   * Management
   * Contract
   * Executive
   */
  category?: string;

  /**
   * Salary payment frequency.
   */
  payFrequency: SalaryPayFrequency;

  /**
   * Components included in this structure.
   */
  components: SalaryStructureComponent[];

  /**
   * Structure lifecycle status.
   */
  status: SalaryStructureStatus;

  /**
   * Version of this structure.
   *
   * Example:
   * v1 → old structure
   * v2 → revised structure
   */
  version: number;

  /**
   * Date from which this structure is applicable.
   */
  effectiveFrom: Date;

  /**
   * Optional date until which this structure is applicable.
   */
  effectiveTo?: Date | null;

  /**
   * Whether this is the company's default structure.
   */
  isDefault?: boolean;

  isDeleted: boolean;

  /**
   * Company-specific extension data.
   */
  metadata?: Record<string, unknown>;

  createdBy?: Types.ObjectId;

  updatedBy?: Types.ObjectId;

  createdAt?: Date;

  updatedAt?: Date;
}