export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  time_zone: string;
  // Stringified ISO Date
  created_at: string;
  // Stringified ISO Date
  updated_at: string;
  permissions: "superadmin" | "admin" | null;
  title?: string;
  is_removed?: boolean;
  is_verified?: boolean;
};

export type ClientUser = User & {
  role: "client";
  client_id: string;
  department?: string;
};

export type InternalUser = User & {
  role: "internal";
  hubstaff_id?: string;
  senior_csm_id?: string;
};

// type Contact = {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   client_id: Client["id"];
// };

export type Client = {
  id: string;
  name: string;
  hubstaff_id?: string;
  website?: string;
  address?: string;
  is_active?: boolean;
  is_enterprise?: boolean;
  logo_url?: string;
  csm_id?: InternalUser["id"];
  alternate_csms?: InternalUser["id"][];
  pc_id?: InternalUser["id"];
  practice_area?: string;
  // Stringified ISO Date
  created_at: string;
  // Stringified ISO Date
  updated_at: string;
};

type EmailVerification = {
  id: string;
  user_id: string;
  date_created: Date;
};

type UserCreated = {
  id: string;
  new_user_id: string;
  created_by_id: string;
  date_created: string;
};

export type SupportTicket = {
  id?: string;
};

export type Event = UserCreated | EmailVerification;
