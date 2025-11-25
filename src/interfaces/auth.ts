
export interface Permission {
  title: string;
  value: string;
}
export interface PermissionGroup extends Permission {
  client?: boolean;
  admin: boolean;
  superadmin: boolean;
  csm: boolean;
  spc: boolean;
  staffing: boolean;
  sales: boolean;
  billing: boolean;
  children?: PermissionGroup[];
}

export enum PermissionActions {
  VIEW_INVOICES = "invoice-management",
  VIEW_VA_ACTIVITY = "va-staff-activity-page",
  GIVE_RAISE = "give-raise",
  GIVE_BONUS = "give-bonus",
  CREATE_CLIENT = "create-client",
  REASSIGN_VAS = "re-assign-vas",
  REMOVE_VAS = "remove-vas",
  EDIT_CLIENT = "edit-client",
  EDIT_CLIENT_DETAILS = "edit-client-details",
  EDIT_CLIENT_CASE_MANAGER = "edit-client-case-manager",
  EDIT_CLIENT_HOLIDAYS = "edit-client-holidays",
  EDIT_CLIENT_TALENT_POOL = "edit-client-talent-pool",
  EDIT_CLIENT_INVOICE_SETTINGS = "edit-client-invoice-settings",
  EDIT_CLIENT_INVOICE_CREDITS_DEBITS = "edit-client-invoice-credits-debits",
  EDIT_VA_NAME_ROLE = "edit-va-name-role",
  UPDATE_TICKET_STATUS = "update-ticket-status",
  UPDATE_TICKET_STAFF_MANAGEMENT = "update-staff-management-ticket-status",
  UPDATE_TICKET_BILLING = "update-billing-ticket-status",
  UPDATE_TICKET_ACH = "update-ach-ticket-status",
  UPDATE_TICKET_COMPENSATION = "update-compensation-ticket-status",
  UPDATE_TICKET_HIRE_NEW_STAFF = "update-hire-new-staff-ticket-status",
  UPDATE_TICKET_OTHER = "update-other-ticket-status",
  ASSIGN_CSMS = "assign-csms",
  UPDATE_BILL_RATE = "update-bill-rate",
  MANAGE_ACCESS = "manage-access",
  VIEW_DRAFT_INVOICES = "view-draft-invoices",
  GENERATE_INVOICES = "generate-invoices",
  CONNECT_STRIPE_CUSTOMER = "connect-stripe-customer",
  VIEW_CLIENTS = "view-clients",
}

export const accessPermissions: PermissionGroup[] = [
  {
    title: "View invoices",
    value: "invoice-management",
    client: true,
    admin: true,
    superadmin: true,
    csm: true,
    spc: true,
    staffing: false,
    sales: true,
    billing: true,
  },
  {
    title: "View VA staff activity",
    value: "va-staff-activity-page",
    client: true,
    admin: true,
    superadmin: true,
    csm: true,
    spc: true,
    staffing: false,
    sales: false,
    billing: true,
  },
  {
    title: "Submit a raise request",
    value: "give-raise",
    client: true,
    admin: true,
    superadmin: true,
    csm: true,
    spc: true,
    staffing: false,
    sales: false,
    billing: true,
  },
  {
    title: "Submit bonus request",
    value: "give-bonus",
    client: true,
    admin: true,
    superadmin: true,
    csm: true,
    spc: true,
    staffing: false,
    sales: false,
    billing: true,
  },
  {
    title: "Add new law firm",
    value: "create-client",
    admin: false,
    superadmin: true,
    csm: false,
    spc: true,
    staffing: false,
    sales: true,
    billing: false,
  },
  {
    title: "Re-assign VAs",
    value: "re-assign-vas",
    admin: false,
    superadmin: true,
    csm: false,
    spc: false,
    staffing: false,
    sales: false,
    billing: false,
  },
  {
    title: "Remove VAs",
    value: "remove-vas",
    admin: false,
    superadmin: true,
    csm: true,
    spc: true,
    staffing: false,
    sales: false,
    billing: false,
  },
  {
    title: "Edit law firm profile",
    value: "edit-client",
    admin: true,
    superadmin: true,
    csm: true,
    spc: true,
    staffing: true,
    sales: true,
    billing: true,
    children: [
      {
        title: "Details",
        value: "edit-client-details",
        admin: false,
        superadmin: true,
        csm: true,
        spc: true,
        staffing: false,
        sales: true,
        billing: false,
      },
      {
        title: "Case Manager",
        value: "edit-client-case-manager",
        admin: false,
        superadmin: true,
        csm: true,
        spc: true,
        staffing: false,
        sales: true,
        billing: true,
      },
      {
        title: "Holidays",
        value: "edit-client-holidays",
        admin: false,
        superadmin: true,
        csm: true,
        spc: true,
        staffing: false,
        sales: false,
        billing: true,
      },
      {
        title: "Talent Pool",
        value: "edit-client-talent-pool",
        admin: true,
        superadmin: true,
        csm: true,
        spc: true,
        staffing: true,
        sales: true,
        billing: false,
      },
      {
        title: "Invoice Settings",
        value: "edit-client-invoice-settings",
        admin: false,
        superadmin: true,
        csm: false,
        spc: false,
        staffing: false,
        sales: false,
        billing: true,
      },
      {
        title: "Invoice Credits/Debits",
        value: "edit-client-invoice-credits-debits",
        admin: false,
        superadmin: true,
        csm: false,
        spc: false,
        staffing: false,
        sales: false,
        billing: true,
      },
    ],
  },
  {
    title: "Edit VA name & role",
    value: "edit-va-name-role",
    admin: false,
    superadmin: true,
    csm: false,
    spc: false,
    staffing: false,
    sales: false,
    billing: true,
  },
  {
    title: "Update support ticket status",
    value: "update-ticket-status",
    admin: true,
    superadmin: true,
    csm: true,
    spc: true,
    staffing: true,
    sales: true,
    billing: true,
    children: [
      {
        title: "Virtual Assistant Tickets",
        value: "update-staff-management-ticket-status",
        admin: false,
        superadmin: true,
        csm: true,
        spc: true,
        staffing: false,
        sales: true,
        billing: false,
      },
      {
        title: "Billing Tickets",
        value: "update-billing-ticket-status",
        admin: false,
        superadmin: true,
        csm: true,
        spc: true,
        staffing: false,
        sales: true,
        billing: true,
      },
      {
        title: "ACH Request Tickets",
        value: "update-ach-ticket-status",
        admin: false,
        superadmin: true,
        csm: true,
        spc: true,
        staffing: false,
        sales: true,
        billing: true,
      },
      {
        title: "Compensation Tickets",
        value: "update-compensation-ticket-status",
        admin: false,
        superadmin: true,
        csm: false,
        spc: false,
        staffing: false,
        sales: false,
        billing: true,
      },
      {
        title: "Hire New Staff Tickets",
        value: "update-hire-new-staff-ticket-status",
        admin: false,
        superadmin: true,
        csm: true,
        spc: true,
        staffing: true,
        sales: true,
        billing: false,
      },
      {
        title: "Other Tickets",
        value: "update-other-ticket-status",
        admin: false,
        superadmin: true,
        csm: true,
        spc: true,
        staffing: false,
        sales: true,
        billing: false,
      },
    ],
  },
  {
    title: "Assign CSMs to clients",
    value: "assign-csms",
    admin: false,
    superadmin: true,
    csm: false,
    spc: true,
    staffing: false,
    sales: true,
    billing: false,
  },
  {
    title: "Update VA bill rate",
    value: "update-bill-rate",
    admin: false,
    superadmin: true,
    csm: false,
    spc: false,
    staffing: false,
    sales: false,
    billing: true,
  },
  {
    title: "Invite/remove/edit admins",
    value: "manage-access",
    client: true,
    admin: false,
    superadmin: true,
    csm: false,
    spc: false,
    staffing: false,
    sales: false,
    billing: false,
  },
  {
    title: "View draft invoices",
    value: "view-draft-invoices",
    admin: false,
    superadmin: true,
    csm: false,
    spc: false,
    staffing: false,
    sales: false,
    billing: true,
  },
  {
    title: "Generate invoices",
    value: "generate-invoices",
    admin: false,
    superadmin: true,
    csm: false,
    spc: false,
    staffing: false,
    sales: false,
    billing: true,
  },
  {
    title: "Connect client to stripe",
    value: "connect-stripe-customer",
    admin: false,
    superadmin: true,
    csm: false,
    spc: false,
    staffing: false,
    sales: false,
    billing: true,
  },
  {
    title: "View all clients",
    value: "view-clients",
    admin: true,
    superadmin: true,
    csm: false,
    spc: false,
    staffing: true,
    sales: true,
    billing: true,
  },
];
export interface LoginPayloadInterface {
  email: string;
  password: string;
}

export interface LoginResultInterface {
  generalOptions?: IGeneralOptions;
  account: Account;
  credentials: Access;
}

export interface RefreshTokensPayloadInterface {
  refreshToken: string;
}

export interface ForgotPasswordPayloadInterface {
  email: string;
}

export interface ResetPasswordPayloadInterface {
  password: string;
  code: string;
}

export interface LogoutPayloadInterface {
  refreshToken: string;
}

export interface Client {
  id: string;
  name: string;
  stripe_customer: any | null;
  logoUrl?: string;
}

export interface INotificationProfile {
  email: string[];
  dashboard: string[];
}

export enum TwoFATypesEnum {
  TOTP = "totp",
  AUTHENTICATOR = "authenticator",
}

export interface TwoFAData {
  enabled: boolean;
  secret: string;
  type: TwoFATypesEnum;
}

export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  permissions: string;
  timeZone?: string;
  role: string;
  email: string;
  phone?: string;
  password: string;
  pin?: string;
  department?: string;
  twoFA?: TwoFAData;
  title?: string;
  isVerified?: boolean;
  isApproved?: boolean;
  isRemoved?: boolean;
  imageFile?: string;
  campusId?: string;
  gender?: string;
  maritalStatus?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  DateOfBirth?: Date;
  DateJoined?: Date;
  ServiceUnit?: string;
  MembershipClassStatus?: string;
  MAPGroup?: string;
  nextOfKin?: {
    name?: string;
    relationship?: string;
    phone?: string;
    address?: string;
  };
  professionalDetails?: {
    industry?: string;
    organization?: string;
    role?: string;
    yearJoin?: string;
    location?: string;
  };
  resetPasswordToken?: string;
  resetPasswordTokenExpiration?: Date;
  notificationsProfile?: INotificationProfile;
  createdAt?: Date;
  updatedAt?: Date;
}



export interface QueryResult {
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
export interface TokenPayload {
  token: string;
  expires: Date;
}

export interface Access {
  access: TokenPayload;
  refresh: TokenPayload;
}

export interface IGeneralOptions {
  showHireVABanner: boolean;
}

export interface authStore {
  access?: TokenPayload;
  refresh?: TokenPayload;
  account?: Account;
  hydrated?: boolean;
}

export interface IAuthStore extends authStore {
  setAccount: (payload: Account) => void;
  setAccess: (payload: Access) => void;
  logoutAccount: () => Promise<void>;
  setHydrated: () => void;
}


export interface PaginationResult<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
  online?: number;
}