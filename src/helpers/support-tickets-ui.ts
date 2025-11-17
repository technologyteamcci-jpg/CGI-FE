import {
  TicketCategories,
  TicketStatus as TicketStatusEnum,
} from "@/interfaces/tickets";

export const generateCategory = function (cat: TicketCategories) {
  switch (cat) {
    case TicketCategories.BILLING:
      return "billing";

    case TicketCategories.STAFF:
      return "employee";
    case TicketCategories.HIRE:
      return "hire";

    case TicketCategories.USER:
      return "user";

    case TicketCategories.COMPENSATION:
      return "compensation";

    case TicketCategories.ACH_REQUEST:
      return "ach request";

    default:
      return "other";
  }
};

export const generateStatus = function (cat: TicketStatusEnum) {
  switch (cat) {
    case TicketStatusEnum.ADMIN_RESPONSE:
      return "Waiting for support";

    case TicketStatusEnum.CLIENT_RESPONSE:
      return "Waiting for client";

    case TicketStatusEnum.INPROGRESS:
      return "In progress";

    case TicketStatusEnum.OPEN:
      return "Open";

    default:
      return "Closed";
  }
};
