import { PermissionGroup, PermissionActions, Account } from "@/interfaces/auth";
import { TicketCategories } from "@/interfaces/tickets";

/**
 * Check if a user has permission to perform an action.
 *
 * @param action - the value of the permission (e.g. "edit-client", "give-raise")
 * @param role - the user role (e.g. "admin", "superadmin", "csm", etc.)
 * @param accessList - the user's granted permissions (from the user record)
 * @param isInternal - whether the user is an internal account or client-side account
 * @returns boolean
 */
export function hasPermission(
  action: PermissionActions,
  role: keyof PermissionGroup,
  accessList: { value: string }[],
  isInternal: boolean,
): boolean {
  // 1️⃣ First check if the user explicitly has this in their access list
  if (accessList.some((p) => p.value === action)) return true;
  return false;
  // 2️⃣ Otherwise check the default permissions for their role from the matrix
  //   const searchPermission = (perms: PermissionGroup[]): boolean => {
  //     for (const perm of perms) {
  //       if (perm.value === action) {
  //         const isAdminLike = ["admin", "superadmin"].includes(role);
  //         const isClientFacing = !isInternal && isAdminLike;

  //         if (isClientFacing && perm.client) return true;
  //         if (perm[role]) return true;
  //       }

  //       // recursively check children
  //       if (perm.children?.length && searchPermission(perm.children)) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   };

  //   return searchPermission(accessPermissions);
}

/**
 * All permission wrappers.
 * Each returns true/false for a given user.
 */

export function canViewInvoices(user: Account) {
  return hasPermission(
    PermissionActions.VIEW_INVOICES,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function isBillingAdmin(user: Account) {
  return user.permissions === "billing" || user.permissions === "superadmin";
}

export function allowBillingAdjustment(user: Account) {
  return (
    user.permissions !== "csm" &&
    user.permissions !== "spc" &&
    user.permissions !== "sales"
  );
}

export function canViewVAStaffActivity(user: Account) {
  return hasPermission(
    PermissionActions.VIEW_VA_ACTIVITY,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canGiveRaise(user: Account) {
  return hasPermission(
    PermissionActions.GIVE_RAISE,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canGiveBonus(user: Account) {
  return hasPermission(
    PermissionActions.GIVE_BONUS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canCreateClient(user: Account) {
  return hasPermission(
    PermissionActions.CREATE_CLIENT,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canReassignVAs(user: Account) {
  return hasPermission(
    PermissionActions.REASSIGN_VAS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canRemoveVAs(user: Account) {
  return hasPermission(
    PermissionActions.REMOVE_VAS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canEditClient(user: Account) {
  return hasPermission(
    PermissionActions.EDIT_CLIENT,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canEditClientDetails(user: Account) {
  return hasPermission(
    PermissionActions.EDIT_CLIENT_DETAILS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canEditClientCaseManager(user: Account) {
  return hasPermission(
    PermissionActions.EDIT_CLIENT_CASE_MANAGER,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canEditClientHolidays(user: Account) {
  return hasPermission(
    PermissionActions.EDIT_CLIENT_HOLIDAYS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canEditClientTalentPool(user: Account) {
  return hasPermission(
    PermissionActions.EDIT_CLIENT_TALENT_POOL,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canEditClientInvoiceSettings(user: Account) {
  return hasPermission(
    PermissionActions.EDIT_CLIENT_INVOICE_SETTINGS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canEditClientInvoiceCreditsDebits(user: Account) {
  return hasPermission(
    PermissionActions.EDIT_CLIENT_INVOICE_CREDITS_DEBITS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canEditVANameRole(user: Account) {
  return hasPermission(
    PermissionActions.EDIT_VA_NAME_ROLE,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canUpdateTicketStatus(user: Account) {
  return hasPermission(
    PermissionActions.UPDATE_TICKET_STATUS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canUpdateStaffManagementTickets(user: Account) {
  return hasPermission(
    PermissionActions.UPDATE_TICKET_STAFF_MANAGEMENT,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canUpdateBillingTickets(user: Account) {
  return hasPermission(
    PermissionActions.UPDATE_TICKET_BILLING,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canUpdateACHTickets(user: Account) {
  return hasPermission(
    PermissionActions.UPDATE_TICKET_ACH,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canUpdateCompensationTickets(user: Account) {
  return hasPermission(
    PermissionActions.UPDATE_TICKET_COMPENSATION,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canUpdateHireNewStaffTickets(user: Account) {
  return hasPermission(
    PermissionActions.UPDATE_TICKET_HIRE_NEW_STAFF,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canUpdateOtherTickets(user: Account) {
  return hasPermission(
    PermissionActions.UPDATE_TICKET_OTHER,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canAssignCSMs(user: Account) {
  return hasPermission(
    PermissionActions.ASSIGN_CSMS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canUpdateVABillRate(user: Account) {
  return hasPermission(
    PermissionActions.UPDATE_BILL_RATE,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canManageAccess(user: Account) {
  return hasPermission(
    PermissionActions.MANAGE_ACCESS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canViewDraftInvoices(user: Account) {
  return hasPermission(
    PermissionActions.VIEW_DRAFT_INVOICES,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canGenerateInvoices(user: Account) {
  return hasPermission(
    PermissionActions.GENERATE_INVOICES,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canConnectClientToStripe(user: Account) {
  return hasPermission(
    PermissionActions.CONNECT_STRIPE_CUSTOMER,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canViewAllClients(user: Account) {
  return hasPermission(
    PermissionActions.VIEW_CLIENTS,
    user.permissions,
    user.access,
    user.role !== "client",
  );
}

export function canUpdateTicketCategory(
  user: Account,
  category: TicketCategories,
) {
  if (category === TicketCategories.STAFF)
    return canUpdateStaffManagementTickets(user);

  if (category === TicketCategories.BILLING)
    return canUpdateBillingTickets(user);

  if (category === TicketCategories.ACH_REQUEST)
    return canUpdateACHTickets(user);

  if (category === TicketCategories.COMPENSATION)
    return canUpdateCompensationTickets(user);

  if (category === TicketCategories.HIRE)
    return canUpdateHireNewStaffTickets(user);

  return canUpdateOtherTickets(user); // default fallback
}
