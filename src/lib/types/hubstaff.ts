import { ClientData } from "@/interfaces/clients";

export type HubstaffMember = {
  name: string;
  user_id: HubstaffUser["id"];
  membership_role: "viewer" | "manager" | "user";
  // Stringified ISO Date
  created_at: string;
  // Stringified ISO Date
  updated_at: string;
  // Stringified ISO Date
  last_client_activity: string;
  trackable: boolean;
  effective_role: "project_user";
  profile?: {
    job_type: string;
    job_title: string;
    started_on: string;
  };
  metadata: Record<string, unknown>;
  pay_rate: number;
};

export interface VaHistory {
  id?: string;
  client_name: string;
  client_id: string;
  pay_rate: string;
  bill_rate: string;
  va_id: string;
  va_fullname: string;
  rate_period: BillingPeriodEnum;
  work_type: WorkTypeEnum;
  profile?: {
    job_type: string;
    job_title: string;
    started_on: string;
  };
  deployment_date: string;
  termination_date: string;
  senior_case: string;
  case: string;
  senior_practice_consultant: string;
  whatsapp_number: string;
  personal_email: string;
  language: string;
  practice_area: string;
  role: string;
  tenure: string;
  account_type: string;
  category: string;
  reason: string;
  separation_type: string;
  replacement_status: string;
  policy: string;
  root_cause: string;
  description: string;
  local_spc_action: string;
  csm_management: string;
  agent_management: string;
  recommendation: string;
  reason_for_recommendation: string;
  cancellation_proof_file: string;
  coaching_log_file: string;
  submitted_by: string;
  team_leader_email: string;
  approved_by: string;
}

export type HubstaffUser = {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  time_zone: string;
  status: "active";
  // Stringified ISO Date
  created_at: string;
  // Stringified ISO Date
  updated_at: string;
};

export interface HubstaffStaffMember extends HubstaffUser {
  membership_role: "viewer" | "manager" | "user";
  // Stringified ISO Date
  created_at: string;
  clientId: string;
  // Stringified ISO Date
  updated_at: string;
  updatedAt: string;
  // Stringified ISO Date
  last_client_activity: string;
  trackable: boolean;
  effective_role: "project_user";
  profile?: {
    job_type: string;
    job_title: string;
    started_on: string;
  };
  metadata: Record<string, unknown>;
  pay_rate: number;
  bill_rate: number;
  online?: boolean;
  phone?: string;
  department?: string;
  birthday?: string;
  performance?: number;
  role?: string;
  rate_period: BillingPeriodEnum;
  historical_engagements?: VaHistory[];
  hire_date?: string;
  deployment_date?: string;
  owner?: ClientData;
  user_id?: string;
  work_type: WorkTypeEnum;
}

export enum BillingPeriodEnum {
  HOURLY = "hr",
  MONTHLY = "mo",
}

export enum WorkTypeEnum {
  PT = "part-time",
  FT = "full-time",
}

// Define the attributes for the User model
export interface UserAttributes {
  user_id: number;
  clientId: string;
  rate_period: BillingPeriodEnum;
  pay_rate: number;
  bill_rate: number;
  currency: string;
  membership_role: string;
  membership_status: string;
  created_at: Date;
  updated_at: Date;
  last_client_activity: Date;
  pay_period: string;
  trackable: boolean;
  effective_role: string;
  profile?: {
    job_type: string;
    job_title: string;
    started_on: string;
  };
  metadata: Record<string, unknown>;
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  time_zone: string;
  ip_address: string;
  status: string;
  phone?: string;
  hire_date?: string;
  deployment_date?: string;
  birthday?: string;
  department?: string;
  online?: boolean;
  role?: string;
  performance?: number;
  work_type: WorkTypeEnum;
}

export type HubstaffProject = {
  billable: boolean;
  // Stringified ISO Date
  created_at: string;
  id: number;
  metadata: Record<string, unknown>;
  name: string;
  status: "active";
  // Stringified ISO Date
  updated_at: string;
};

export type HubstaffClient = {
  address: string;
  // Stringified ISO Date
  created_at: string;
  emails: string[];
  id: number;
  inherit_invoice_notes: boolean;
  inherit_net_terms: boolean;
  metadata: Record<string, unknown>;
  name: string;
  organization_id: number;
  phone: string;
  project_ids: number[];
  status: "active";
  // Stringified ISO Date
  updated_at: string;
};

export type HubstaffActivity = {
  id: number;
  // Stringified ISO date
  date: string;
  // Stringified ISO date
  created_at: string;
  // Stringified ISO date
  updated_at: string;
  // Stringified ISO date
  time_slot: string;
  // Stringified ISO date
  starts_at: string;
  user_id: number;
  project_id: number;
  task_id: number | null;
  keyboard: number;
  mouse: number;
  overall: number;
  tracked: number;
  input_tracked: number;
  tracks_input: boolean;
  billable: number;
  paid: boolean;
  client_invoiced: boolean;
  team_invoiced: boolean;
  immutable: boolean;
  timesheet_id: number;
  timesheet_locked: boolean;
  time_type: string;
  client: string;
};

export interface Screenshot {
  full_url: string;
  thumb_url: string;
  time_slot: string;
  date: string;
}
// Define the attributes for the User model
export interface ActivityAttributes {
  id: string;
  user_id: number;
  clientId: number;
  day: string;
  screenshots: Screenshot[];
  total_time_logged: number;
  performance: number;
  created_at: Date;
  updated_at: Date;
}
