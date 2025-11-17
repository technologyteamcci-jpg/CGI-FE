import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

const restrictedRoutes = [
  {
    urlMatch: new RegExp("hire"),
    allowedRoles: ["client"],
  },
  {
    urlMatch: new RegExp("clients"),
    allowedRoles: ["internal"],
  },
  {
    urlMatch: new RegExp("manage-access"),
    allowedRoles: ["internal", "client"],
    allowedPermissions: ["superadmin"],
  },
];

function isRestrictedRoute({
  request,
  token,
}: {
  request: NextRequest;
  token: JWT;
}) {
  return restrictedRoutes.some((route) => {
    const matchesUrl = request.url.match(route.urlMatch);
    if (!matchesUrl) {
      return false;
    }

    const roleRestricted =
      route.allowedRoles && !route.allowedRoles.includes(token.role as string);

    const permissionRestricted =
      route.allowedPermissions &&
      !route.allowedPermissions.includes(token.permissions as string);

    return roleRestricted || permissionRestricted;
  });
}

export function isAuthorized({
  request,
  token,
}: {
  request: NextRequest;
  token: JWT;
}) {
  if (isRestrictedRoute({ request, token })) {
    return false;
  }

  return true;
}
