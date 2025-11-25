// import { Permission } from "@/interfaces/auth";
// import { useAuthStore } from "@/stores/auth.store";
// import { useState, useEffect } from "react";

// export function useAccessControl(): {
//   role?: "client" | "internal";
//   access: Permission[];
//   permissions?:
//     | "superadmin"
//     | "admin"
//     | "spc"
//     | "sales"
//     | "billing"
//     | "staffing"
//     | "csm"
//     | null;
// } {
//   const { account } = useAuthStore();
//   const [role, setRole] = useState<"client" | "internal">();
//   const [access, setAccess] = useState<Permission[]>([]);
//   const [permissions, setPermissions] = useState<
//     | "superadmin"
//     | "admin"
//     | "spc"
//     | "sales"
//     | "billing"
//     | "staffing"
//     | "csm"
//     | null
//   >(null);
//   useEffect(() => {
//     if (account) {
//       setRole(account.role);
//       setPermissions(account.permissions);
//       setAccess(account.access || []);
//     }
//   }, [account]);

//   return {
//     role,
//     access,
//     permissions,
//   };
// }
