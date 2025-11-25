import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import http from "./base";
import { ICampus } from "@/interfaces/campus";


export const useGetCampus = () =>
    useQuery<ICampus[]>({
        queryKey: ["campus-list"],
        queryFn: async () =>
            (await http.get({ url: "/campus" })).data,
    });