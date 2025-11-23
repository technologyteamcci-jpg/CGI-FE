import {
  Account,
  LoginPayloadInterface,
  LoginResultInterface,
  LogoutPayloadInterface,
  PaginationResult,
  TwoFATypesEnum,
} from "@/interfaces/auth";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import http from "./base";

export const useLogin = () =>
  useMutation<LoginResultInterface, string, LoginPayloadInterface>({
    mutationFn: async (props) =>
      (
        await http.post({
          url: "/auth/login",
          body: props,
        })
      ).data,
  });

export const useUpdateAccount = () =>
  useMutation<
    Account,
    string,
    Pick<
      Account,
      | "firstName"
      | "lastName"
      | "phone"
      | "department"
      | "timeZone"
      | "title"
      | "email"
    >
  >({
    mutationFn: async (props) =>
      (
        await http.put({
          url: "/accounts",
          body: props,
        })
      ).data,
  });

export const useUpdateAccountPassword = () =>
  useMutation<
    Account,
    string,
    {
      newPassword: string;
      currentPassword: string;
      passwordConfirmation: string;
    }
  >({
    mutationFn: async (props) =>
      (
        await http.post({
          url: "/accounts/change-password",
          body: props,
        })
      ).data,
  });

export const useUpdateAccountPin = () =>
  useMutation<Account, string, { newPin: string; oldPin: string }>({
    mutationFn: async (props) =>
      (
        await http.patch({
          url: "/accounts",
          body: props,
        })
      ).data,
  });

export const useInitiateTwoFa = () =>
  useMutation<string, string, { type: TwoFATypesEnum }>({
    mutationFn: async (props) =>
      (
        await http.post({
          url: `/accounts/one-time-password/initialize/${props.type}`,
        })
      ).data,
  });

export const useVerifyTwoFa = () =>
  useMutation<{ isValid: boolean }, string, { otp: string }>({
    mutationFn: async (props) =>
      (
        await http.post({
          url: `/accounts/one-time-password/verify`,
          body: { otp: props.otp },
        })
      ).data,
  });

export const useResendTwoFa = () =>
  useMutation<any, string, any>({
    mutationFn: async (props) =>
      (
        await http.post({
          url: `/accounts/one-time-password/resend`,
        })
      ).data,
  });

export const useFinishTwoFa = () =>
  useMutation<{ isValid: boolean; secret: string }, string, { otp: string }>({
    mutationFn: async (props) =>
      (
        await http.post({
          url: `/accounts/one-time-password/finish`,
          body: { otp: props.otp },
        })
      ).data,
  });



export const useGetAuthedAccount = (isAuthenticated: boolean) =>
  useQuery<LoginResultInterface>({
    queryKey: ["authenticated-user"],
    queryFn: async () => (await http.get({ url: "/accounts" })).data,
    enabled: isAuthenticated,
  });
export const useLogout = () =>
  useMutation<any, string, LogoutPayloadInterface>({
    mutationFn: async (props) =>
      await http.post({
        url: "/accounts/logout",
        body: props,
      }),
  });

export const useGetUserToken = (
  email: string,
  options?: Omit<
    UseQueryOptions<string, Error, string>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery<string, Error, string>({
    queryKey: ["user-token", email],
    queryFn: async () => {
      const response = await http.get({
        url: `/accounts/get-user-reset-token/${email}`,
      });
      return response.data.token;
    },
    enabled: false,
    ...options,
  });




