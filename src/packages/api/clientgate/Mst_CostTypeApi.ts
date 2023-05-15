import { ApiResponse, Mst_CostType } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_CostTypeApi = (apiBase: AxiosInstance) => {
  return {
    Mst_CostType_GetByContractUpdateType: async (): Promise<
      ApiResponse<Mst_CostType>
    > => {
      return await apiBase.post<string, ApiResponse<Mst_CostType>>(
        "/MstCostType/GetAllActive"
      );
    },
  };
};
