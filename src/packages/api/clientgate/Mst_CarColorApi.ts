import { ApiResponse, Mst_CarColor } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_CarColorApi = (apiBase: AxiosInstance) => {
  return {
    Mst_CarColor_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_CarColor>,
        ApiResponse<Mst_CarColor>
      >("/MstCarColor/GetAllActive");
    },
  };
};
