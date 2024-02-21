import { useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";

export const getBoardData = async () => {
    return axios.get("/board").then((res) => res.data);
};

export function useGetBoardData(config) {
    return useQuery({
        queryKey: ["boardData"],
        queryFn: () => getBoardData(),
        ...config,
    });
}