import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import http from "./base";
import { CreateCampusPayload, ICampus } from "@/interfaces/campus";
import { queryClient } from "@/config/ReactQueryClient";


export const useGetCampus = () =>
    useQuery<ICampus[]>({
        queryKey: ["campus-list"],
        queryFn: async () =>
            (await http.get({ url: "/campus" })).data,
    });


export const useCreateCampus = () =>
    useMutation<any, string, { payload: CreateCampusPayload }>({
        mutationFn: async ({ payload }) =>
            await http.post({
                url: `/campus`,
                body: payload,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["campus-list"],
            });
        },
    });