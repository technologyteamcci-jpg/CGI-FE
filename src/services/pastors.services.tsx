import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import http from "./base";
import { IPastor } from "@/interfaces/pastors";
import { queryClient } from "@/config/ReactQueryClient";

export const useGetPastors = () =>
    useQuery<IPastor[]>({
        queryKey: ["pastors-list"],
        queryFn: async () =>
            (await http.get({ url: "/Pastors" })).data,
    });


export const useCreatePastor = () =>
    useMutation<any, string, { payload: Partial<IPastor> }>({
        mutationFn: async ({ payload }) =>
            await http.post({
                url: `/pastors`,
                body: payload,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["pastors-list"],
            });
        },
    });