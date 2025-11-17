import { useHeaderContext } from "@/app/ui/components/Header/useHeaderContext";
import { BreadcrumbItem } from "../config/breadcrumbs";

export function useSetBreadcrumbs() {
  const { dispatch } = useHeaderContext();

  const setBreadcrumbs = (breadcrumbs: BreadcrumbItem[]) => {
    dispatch({
      type: "SET_BREADCRUMBS",
      payload: breadcrumbs,
    });
  };

  const clearBreadcrumbs = () => {
    dispatch({
      type: "SET_BREADCRUMBS",
      payload: undefined,
    });
  };

  return { setBreadcrumbs, clearBreadcrumbs };
}

export function useSetHeader() {
  const { dispatch } = useHeaderContext();

  const setHeader = (config: {
    message?: string;
    displayHireButton?: boolean;
    displayVSSettingsButton?: boolean;
    vsSettingsPayload?: {
      clientId: string;
      staffId: string;
    };
    breadcrumbs?: BreadcrumbItem[];
  }) => {
    dispatch({
      type: "SET_HEADER",
      payload: config,
    });
  };

  return { setHeader };
}
