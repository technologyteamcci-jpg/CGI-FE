import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAuthStore } from "@/interfaces/auth";
export const cookieKey = "AUTH_TOKEN_CGI";

export const useAuthStore = create(
  persist<IAuthStore>(
    (set, get) => ({
      hydrated: false,
      setAccount: (obj) => set({ account: obj }),
      setAccess: (obj) => {
        set({ ...obj });
      },

      setHydrated() {
        set({ hydrated: true });
      },
      async logoutAccount() {
        set({
          access: undefined,
          refresh: undefined,
          account: undefined,
        });
      },
    }),
    {
      name: "cgi-auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
