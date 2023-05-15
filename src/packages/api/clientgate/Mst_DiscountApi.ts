import { ApiResponse, Mst_Discount, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_DiscountApi = (apiBase: AxiosInstance) => {
  return {
    Mst_Discount_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_Discount>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Discount>>(
        "/MstDiscount/Search",
        {
          ...params,
        }
      );
    },
  };
};
