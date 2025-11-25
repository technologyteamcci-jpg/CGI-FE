// "use client";

// import { usePathname, useParams, useSearchParams } from "next/navigation";
// import { useMemo } from "react";
// import { breadcrumbConfig, BreadcrumbItem } from "../config/breadcrumbs";
// import { useGetClientInfo } from "@/services/clients.services";
// import { useGetClientStaffData } from "@/services/hubstaff.services";
// import { useGetSingleTalentsInterview } from "@/services/talent.services";
// import { useGetSingleTicket } from "@/services/tickets";

// export function useBreadcrumbs(clientId?: string) {
//   const pathname = usePathname();
//   const params = useParams();
//   const searchParams = useSearchParams();

//   // Fetch client data if we have a client ID
//   const { data: clientData } = useGetClientInfo(clientId);

//   // Fetch staff data if we have a staff ID
//   const staffId = (params.staff_id as string) || (params.id as string);
//   const { data: staffData } = useGetClientStaffData(
//     Boolean(clientId && staffId),
//     clientId,
//     staffId,
//   );

//   // Fetch interview data if on interview details route
//   const isInterviewDetailsRoute = pathname.includes("/talent/interviews/");
//   const interviewId = (params.id as string) || undefined;
//   const { data: interviewData } = useGetSingleTalentsInterview({
//     id: isInterviewDetailsRoute ? interviewId : undefined,
//   });

//   // Fetch ticket data if on ticket details route
//   const isTicketDetailsRoute =
//     pathname.startsWith("/support/") && pathname.split("/").length === 3;
//   const ticketId = (params.id as string) || "";
//   const { data: ticketData } = useGetSingleTicket(
//     isTicketDetailsRoute && ticketId ? ticketId : "",
//   );

//   const breadcrumbs = useMemo(() => {
//     // Find the best matching route configuration
//     let bestMatch = "";
//     let bestMatchScore = 0;

//     for (const route of Object.keys(breadcrumbConfig)) {
//       const routeSegments = route.split("/").filter(Boolean);
//       const pathSegments = pathname.split("/").filter(Boolean);

//       if (routeSegments.length === pathSegments.length) {
//         let score = 0;
//         let isMatch = true;

//         for (let i = 0; i < routeSegments.length; i++) {
//           const routeSegment = routeSegments[i];
//           const pathSegment = pathSegments[i];

//           if (routeSegment.startsWith("[") && routeSegment.endsWith("]")) {
//             // Dynamic parameter
//             score += 1;
//           } else if (routeSegment === pathSegment) {
//             // Exact match
//             score += 2;
//           } else {
//             isMatch = false;
//             break;
//           }
//         }

//         if (isMatch && score > bestMatchScore) {
//           bestMatch = route;
//           bestMatchScore = score;
//         }
//       }
//     }

//     if (!bestMatch) {
//       // Fallback: create breadcrumbs from pathname
//       const segments = pathname.split("/").filter(Boolean);
//       const fallbackBreadcrumbs: BreadcrumbItem[] = [];

//       let currentPath = "";
//       segments.forEach((segment, index) => {
//         currentPath += `/${segment}`;
//         const label =
//           segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
//         fallbackBreadcrumbs.push({
//           label,
//           href: index === segments.length - 1 ? undefined : currentPath,
//           isActive: index === segments.length - 1,
//         });
//       });

//       return {
//         breadcrumbs: fallbackBreadcrumbs,
//         title:
//           segments[segments.length - 1]?.charAt(0).toUpperCase() +
//             segments[segments.length - 1]?.slice(1).replace(/-/g, " ") ||
//           "Page",
//       };
//     }

//     const config = breadcrumbConfig[bestMatch];
//     if (!config) {
//       return { breadcrumbs: [], title: "Page" };
//     }

//     // Replace dynamic parameters in breadcrumbs with actual names
//     const processedBreadcrumbs = config.breadcrumbs.map((breadcrumb) => {
//       let processedHref = breadcrumb.href;
//       let processedLabel = breadcrumb.label;

//       if (processedHref) {
//         // Replace dynamic parameters
//         Object.keys(params).forEach((key) => {
//           const paramValue = params[key] as string;
//           processedHref = processedHref?.replace(`[${key}]`, paramValue);

//           // Replace labels with actual names
//           if (key === "id" && clientData?.name) {
//             // Replace "Client Details" with actual client name
//             if (processedLabel === "Client Details") {
//               processedLabel = clientData.name;
//             }
//           }

//           if (key === "staff_id" && staffData?.staff?.name) {
//             // Replace "Agent Profile" with actual staff name
//             if (processedLabel === "Agent Profile") {
//               processedLabel = staffData.staff.name;
//             }
//           }

//           if (key === "id" && staffData?.staff?.name && !clientData) {
//             // For direct staff routes, replace "Agent Profile" with actual staff name
//             if (processedLabel === "Agent Profile") {
//               processedLabel = staffData.staff.name;
//             }
//           }

//           // Handle client parameter in staff routes
//           if (key === "client" && clientData?.name) {
//             // Replace "Client View" with actual client name
//             if (processedLabel === "Client View") {
//               processedLabel = clientData.name;
//             }
//           }
//         });
//       }

//       // Handle ticket details label replacement outside of param loop
//       if (
//         isTicketDetailsRoute &&
//         processedLabel === "Ticket Details" &&
//         ticketData?.ticket_reference
//       ) {
//         processedLabel = `Ticket #${ticketData.ticket_reference}`;
//       }

//       // Handle interview details label replacement outside of param loop
//       if (
//         isInterviewDetailsRoute &&
//         processedLabel === "Interview Details" &&
//         interviewData?.requestingClient?.name
//       ) {
//         processedLabel = `Interview Request: ${interviewData.requestingClient.name}`;
//       }

//       return {
//         ...breadcrumb,
//         href: processedHref,
//         label: processedLabel,
//       };
//     });

//     // Add search parameters to the last breadcrumb if it has an href
//     if (processedBreadcrumbs.length > 0) {
//       const lastBreadcrumb =
//         processedBreadcrumbs[processedBreadcrumbs.length - 1];
//       if (lastBreadcrumb.href && !lastBreadcrumb.isActive) {
//         const page = searchParams.get("page");
//         const search = searchParams.get("search");

//         if (page || search) {
//           const url = new URL(lastBreadcrumb.href, window.location.origin);
//           if (page) url.searchParams.set("page", page);
//           if (search) url.searchParams.set("search", search);
//           lastBreadcrumb.href = url.pathname + url.search;
//         }
//       }
//     }

//     return {
//       breadcrumbs: processedBreadcrumbs,
//       title: config.title,
//     };
//   }, [
//     pathname,
//     params,
//     searchParams,
//     clientData,
//     staffData,
//     interviewData,
//     isInterviewDetailsRoute,
//     ticketData,
//     isTicketDetailsRoute,
//   ]);

//   return breadcrumbs;
// }
