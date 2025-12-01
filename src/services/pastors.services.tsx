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


export const useUpdatePastor = () =>
    useMutation<
        any,
        string,
        { pastorId: string; payload: Partial<IPastor> }
    >({
        onSuccess: (_, { pastorId }) => {
            queryClient.invalidateQueries({
                queryKey: ["pastor", { pastorId }],

            });
            queryClient.invalidateQueries({
                queryKey: ["pastors-list"],

            });
        },
        mutationFn: async (props) =>
            await http.patch({
                url: `/pastors/${props.pastorId}`,
                body: props.payload,
            }),
    });


export const useDeletePastor = () =>
    useMutation<any, string, { id: string; }>({
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({
                queryKey: ["pastors-list"],
            });
        },
        mutationFn: async (props) =>
            await http.delete({
                url: `/pastors/${props.id}`,
            }),
    });