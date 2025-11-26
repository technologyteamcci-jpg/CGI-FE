import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import http from "./base";
import { IPastor } from "@/interfaces/pastors";

export const useGetPastors = () =>
    useQuery<IPastor[]>({
        queryKey: ["pastors-list"],
        queryFn: async () =>
            (await http.get({ url: "/pastor" })).data,
    });
