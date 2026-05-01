export interface Company {
  // ── existing ──
  name: string;
  email: string;
  password: string;

  // ── new: basic info ──
  phone?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  logoUrl?: string;

  // ── new: address ──
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  // ── new: status ──
  isActive: boolean;
  isVerified: boolean;

  // ── new: payroll settings ──
  payrollSettings?: {
    currency: string;
    payrollCycle: "Monthly" | "Bi-weekly";
    payDayOfMonth?: number;
  };

  // ── new: leave policy ──
  leavePolicy?: {
    annualLeave: number;
    sickLeave: number;
    casualLeave: number;
  };

  // ── new: working schedule ──
  workingDays?: string[];
  workingHours?: {
    start: string;
    end: string;
  };

  // ── new: meta ──
  meta: {
    version: number;
    isDeleted: boolean;
  };
}