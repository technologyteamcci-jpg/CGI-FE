export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface BreadcrumbConfig {
  [key: string]: {
    breadcrumbs: BreadcrumbItem[];
    title?: string;
  };
}

export const breadcrumbConfig: BreadcrumbConfig = {
  // Dashboard
  "/": {
    breadcrumbs: [{ label: "Dashboard", href: "/", isActive: true }],
    title: "Dashboard",
  },
  "/reports": {
    breadcrumbs: [{ label: "Dashboard", href: "/reports", isActive: true }],
    title: "Dashboard",
  },

  // Clients
  "/clients": {
    breadcrumbs: [{ label: "Clients", href: "/clients", isActive: true }],
    title: "Clients",
  },
  "/clients/[id]": {
    breadcrumbs: [
      { label: "Clients", href: "/clients" },
      { label: "Client Details", href: "/clients/[id]", isActive: true },
    ],
    title: "Client Details",
  },
  "/clients/[id]/staff": {
    breadcrumbs: [
      { label: "Clients", href: "/clients" },
      { label: "Client Details", href: "/clients/[id]" },
      {
        label: "Staff Management",
        href: "/clients/[id]/staff",
        isActive: true,
      },
    ],
    title: "Staff Management",
  },
  "/clients/[id]/staff/[staff_id]": {
    breadcrumbs: [
      { label: "Clients", href: "/clients" },
      { label: "Client Details", href: "/clients/[id]" },
      { label: "Staff Management", href: "/clients/[id]/staff" },
      {
        label: "Agent Profile",
        href: "/clients/[id]/staff/[staff_id]",
        isActive: true,
      },
    ],
    title: "Agent Profile",
  },
  "/clients/[id]/billing": {
    breadcrumbs: [
      { label: "Clients", href: "/clients" },
      { label: "Client Details", href: "/clients/[id]" },
      { label: "Billing", href: "/clients/[id]/billing", isActive: true },
    ],
    title: "Billing",
  },
  "/clients/[id]/surveys": {
    breadcrumbs: [
      { label: "Clients", href: "/clients" },
      { label: "Client Details", href: "/clients/[id]" },
      { label: "Surveys", href: "/clients/[id]/surveys", isActive: true },
    ],
    title: "Surveys",
  },

  "/clients/[id]/activity": {
    breadcrumbs: [
      { label: "Clients", href: "/clients" },
      { label: "Client Details", href: "/clients/[id]" },
      { label: "Activity", href: "/clients/[id]/activity", isActive: true },
    ],
    title: "Activity",
  },

  // Client Administrators (Users)
  "/clients/[id]/users": {
    breadcrumbs: [
      { label: "Clients", href: "/clients" },
      { label: "Client Details", href: "/clients/[id]" },
      { label: "Users", href: "/clients/[id]/users", isActive: true },
    ],
    title: "Users",
  },

  // Billing
  "/billing": {
    breadcrumbs: [{ label: "Billing", href: "/billing", isActive: true }],
    title: "Billing",
  },
  "/billing/[id]": {
    breadcrumbs: [
      { label: "Billing", href: "/billing" },
      { label: "Invoice Details", href: "/billing/[id]", isActive: true },
    ],
    title: "Invoice Details",
  },

  // Talent
  "/talent": {
    breadcrumbs: [{ label: "Talent Pool", href: "/talent", isActive: true }],
    title: "Talent Pool",
  },

  // Talent → Interviews → Details
  "/talent/interviews/[id]": {
    breadcrumbs: [
      { label: "Talent Pool", href: "/talent" },
      // The interviews list lives under the Talent page as a tab
      { label: "Interviews", href: "/talent?tab=Interviews" },
      {
        label: "Interview Details",
        href: "/talent/interviews/[id]",
        isActive: true,
      },
    ],
    title: "Interview Details",
  },

  // Staff
  "/staff": {
    breadcrumbs: [
      { label: "Staff Management", href: "/staff", isActive: true },
    ],
    title: "Staff Management",
  },
  "/staff/[id]": {
    breadcrumbs: [
      { label: "Staff Management", href: "/staff" },
      { label: "Agent Profile", href: "/staff/[id]", isActive: true },
    ],
    title: "Agent Profile",
  },
  "/staff/[id]/[client]": {
    breadcrumbs: [
      { label: "Staff Management", href: "/staff" },
      { label: "Agent Profile", href: "/staff/[id]" },
    ],
    title: "Agent Profile",
  },
  "/staff/[id]/activity": {
    breadcrumbs: [
      { label: "Staff Management", href: "/staff" },
      { label: "Agent Profile", href: "/staff/[id]" },
      { label: "Screenshots", href: "/staff/[id]/activity", isActive: true },
    ],
    title: "Screenshots",
  },
  "/staff/[id]/[client]/activity": {
    breadcrumbs: [
      { label: "Staff Management", href: "/staff" },
      { label: "Agent Profile", href: "/staff/[id]" },
      { label: "Client View", href: "/staff/[id]/[client]" },
      {
        label: "Screenshots",
        href: "/staff/[id]/[client]/activity",
        isActive: true,
      },
    ],
    title: "Screenshots",
  },
  "/clients/[id]/staff/[staff_id]/activity": {
    breadcrumbs: [
      { label: "Clients", href: "/clients" },
      { label: "Client Details", href: "/clients/[id]" },
      { label: "Staff Management", href: "/clients/[id]/staff" },
      { label: "Agent Profile", href: "/clients/[id]/staff/[staff_id]" },
      {
        label: "Screenshots",
        href: "/clients/[id]/staff/[staff_id]/activity",
        isActive: true,
      },
    ],
    title: "Screenshots",
  },

  // Hire
  "/hire": {
    breadcrumbs: [
      { label: "Hire a Virtual Staff Member", href: "/hire", isActive: true },
    ],
    title: "Hire a Virtual Staff Member",
  },
  "/hire/[id]": {
    breadcrumbs: [
      { label: "Hire a Virtual Staff Member", href: "/hire" },
      { label: "Hire Details", href: "/hire/[id]", isActive: true },
    ],
    title: "Hire Details",
  },

  // Support
  "/support": {
    breadcrumbs: [{ label: "Support", href: "/support", isActive: true }],
    title: "Support",
  },
  "/support/[id]": {
    breadcrumbs: [
      { label: "Support", href: "/support" },
      { label: "Ticket Details", href: "/support/[id]", isActive: true },
    ],
    title: "Ticket Details",
  },

  // Alliance
  "/alliance": {
    breadcrumbs: [
      { label: "Alliance Partner Network", href: "/alliance", isActive: true },
    ],
    title: "Alliance Partner Network",
  },
  "/alliance/onboarding": {
    breadcrumbs: [
      { label: "Alliance Partner Network", href: "/alliance" },
      { label: "Onboarding", href: "/alliance/onboarding", isActive: true },
    ],
    title: "Alliance Onboarding",
  },
  "/alliance/onboarding/[step]": {
    breadcrumbs: [
      { label: "Alliance Partner Network", href: "/alliance" },
      { label: "Onboarding", href: "/alliance/onboarding" },
      { label: "Step", href: "/alliance/onboarding/[step]", isActive: true },
    ],
    title: "Alliance Onboarding",
  },
  "/alliance/add-referral": {
    breadcrumbs: [
      { label: "Alliance Partner Network", href: "/alliance" },
      {
        label: "Add New Referral",
        href: "/alliance/add-referral",
        isActive: true,
      },
    ],
    title: "Add New Referral",
  },
  "/alliance/partners": {
    breadcrumbs: [
      { label: "Alliance Partner Network", href: "/alliance" },
      { label: "Partners", href: "/alliance/partners", isActive: true },
    ],
    title: "Partners",
  },

  // Settings
  "/settings": {
    breadcrumbs: [
      { label: "Personal Information", href: "/settings", isActive: true },
    ],
    title: "Personal Information",
  },

  // Preferences
  "/preferences": {
    breadcrumbs: [
      { label: "Preferences", href: "/preferences", isActive: true },
    ],
    title: "Preferences",
  },

  // Manage Access
  "/manage-access": {
    breadcrumbs: [
      { label: "Manage Access", href: "/manage-access", isActive: true },
    ],
    title: "Manage Access",
  },

  // Surveys
  "/surveys": {
    breadcrumbs: [{ label: "Surveys", href: "/surveys", isActive: true }],
    title: "Surveys",
  },

  // TP (Time & Pay)
  "/tp": {
    breadcrumbs: [{ label: "Time & Pay", href: "/tp", isActive: true }],
    title: "Time & Pay",
  },

  // Unauthorized
  "/unauthorized": {
    breadcrumbs: [
      { label: "Unauthorized", href: "/unauthorized", isActive: true },
    ],
    title: "Unauthorized",
  },

  // Reset Password
  "/reset-password": {
    breadcrumbs: [
      { label: "Reset Password", href: "/reset-password", isActive: true },
    ],
    title: "Reset Password",
  },

  // Unauthenticated routes
  "/login": {
    breadcrumbs: [{ label: "Login", href: "/login", isActive: true }],
    title: "Login",
  },
  "/sign-up": {
    breadcrumbs: [{ label: "Sign Up", href: "/sign-up", isActive: true }],
    title: "Sign Up",
  },
  "/forgot-password": {
    breadcrumbs: [
      { label: "Forgot Password", href: "/forgot-password", isActive: true },
    ],
    title: "Forgot Password",
  },
  "/verify-otp": {
    breadcrumbs: [{ label: "Verify OTP", href: "/verify-otp", isActive: true }],
    title: "Verify OTP",
  },
  "/set-password-first-time": {
    breadcrumbs: [
      {
        label: "Set Password",
        href: "/set-password-first-time",
        isActive: true,
      },
    ],
    title: "Set Password",
  },
  "/password-changed": {
    breadcrumbs: [
      { label: "Password Changed", href: "/password-changed", isActive: true },
    ],
    title: "Password Changed",
  },
  "/link-expired": {
    breadcrumbs: [
      { label: "Link Expired", href: "/link-expired", isActive: true },
    ],
    title: "Link Expired",
  },
  "/terms-of-use": {
    breadcrumbs: [
      { label: "Terms of Use", href: "/terms-of-use", isActive: true },
    ],
    title: "Terms of Use",
  },
  "/accounts": {
    breadcrumbs: [{ label: "Accounts", href: "/accounts", isActive: true }],
    title: "Accounts",
  },
  "/approvals": {
    breadcrumbs: [{ label: "Approvals", href: "/approvals", isActive: true }],
    title: "Approvals",
  },
  "/initiate-client-view": {
    breadcrumbs: [
      { label: "Client View", href: "/initiate-client-view", isActive: true },
    ],
    title: "Client View",
  },
  "/logout": {
    breadcrumbs: [{ label: "Logout", href: "/logout", isActive: true }],
    title: "Logout",
  },
};
