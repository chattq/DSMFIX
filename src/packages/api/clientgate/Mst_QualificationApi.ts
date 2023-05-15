import { ApiResponse, Mst_Qualification, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_Qualification = (apiBase: AxiosInstance) => {
  return {
    Mst_Qualification_Search: async (
      params: Partial<SearchParam>
    ): Promise<ApiResponse<Mst_Qualification>> => {
      return await apiBase.post<
        Partial<SearchParam>,
        ApiResponse<Mst_Qualification>
      >("/MstQualification/Search", {
        ...params,
      });
    },

    Mst_Qualification_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_Qualification>,
        ApiResponse<Mst_Qualification>
      >("/MstQualification/GetAllActive");
    },



  };
};
