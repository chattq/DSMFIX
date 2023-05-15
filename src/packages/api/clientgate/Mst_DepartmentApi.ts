import { ApiResponse, Mst_Department, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_Department = (apiBase: AxiosInstance) => {
  return {
    Mst_Department_Search: async (
      params: Partial<SearchParam>
    ): Promise<ApiResponse<Mst_Department>> => {
      return await apiBase.post<
        Partial<SearchParam>,
        ApiResponse<Mst_Department>
      >("/MstDepartment/Search", {
        ...params,
      });
    },

    Mst_Department_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_Department>,
        ApiResponse<Mst_Department>
      >("/MstDepartment/GetAllActive");
    },



  };
};
