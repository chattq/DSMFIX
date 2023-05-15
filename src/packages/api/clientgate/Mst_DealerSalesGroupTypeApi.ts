import {
  ApiResponse,
  Mst_DealerSalesGroupType,
  SearchParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_DealerSalesGroupTypeApi = (apiBase: AxiosInstance) => {
  return {
    Mst_DealerSalesGroupType_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_DealerSalesGroupType>> => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_DealerSalesGroupType>
      >("/MstDealerSalesGroupType/Search", {
        ...params,
      });
    },

    Mst_DealerSalesGroupType_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_DealerSalesGroupType>,
        ApiResponse<Mst_DealerSalesGroupType>
      >("/MstDealerSalesGroupType/GetAllActive");
    },

    Mst_DealerSalesGroupType_GetBySalesGroupType: async (
      SalesGroupType: string
    ): Promise<ApiResponse<Mst_DealerSalesGroupType>> => {
      return await apiBase.post<string, ApiResponse<Mst_DealerSalesGroupType>>(
        "/MstDealerSalesGroupType/GetBySalesGroupType",
        {
          SalesGroupType: SalesGroupType,
        }
      );
    },

    Mst_DealerSalesGroupType_Update: async (
      key: string,
      data: Partial<Mst_DealerSalesGroupType>
    ): Promise<ApiResponse<Mst_DealerSalesGroupType>> => {
      return await apiBase.post<
        Partial<Mst_DealerSalesGroupType>,
        ApiResponse<Mst_DealerSalesGroupType>
      >("/MstDealerSalesGroupType/Update", {
        strJson: JSON.stringify({
          SalesGroupType: key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_DealerSalesGroupType_Create: async (
      DealerSalesGroupType: Partial<Mst_DealerSalesGroupType>
    ): Promise<ApiResponse<Mst_DealerSalesGroupType>> => {
      return await apiBase.post<
        Partial<Mst_DealerSalesGroupType>,
        ApiResponse<Mst_DealerSalesGroupType>
      >("/MstDealerSalesGroupType/Create", {
        strJson: JSON.stringify(DealerSalesGroupType),
      });
    },

    Mst_DealerSalesGroupType_Delete: async (SalesGroupType: string) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_DealerSalesGroupType>
      >("/MstDealerSalesGroupType/Delete", {
        SalesGroupType: SalesGroupType,
      });
    },

    Mst_DealerSalesGroupType_DeleteMultiple: async (
      listDealerSalesGroupType: any[]
    ) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_DealerSalesGroupType>
      >("/MstDealerSalesGroupType/DeleteMultiple", {
        strJson: JSON.stringify(listDealerSalesGroupType),
      });
    },

    Mst_DealerSalesGroupType_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstDealerSalesGroupType/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_DealerSalesGroupType_ExportTemplate: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_DealerSalesGroupType>,
        ApiResponse<string>
      >("/MstDealerSalesGroupType/ExportTemplate", {});
    },

    Mst_DealerSalesGroupType_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_DealerSalesGroupType>,
          ApiResponse<string>
        >("/MstDealerSalesGroupType/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_DealerSalesGroupType_ExportByListSalesGroupType: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_DealerSalesGroupType>,
          ApiResponse<string>
        >("/MstDealerSalesGroupType/ExportByListSalesGroupType", {
          ListSalesGroupType: keys.join(","),
        });
      }
    },
  };
};
