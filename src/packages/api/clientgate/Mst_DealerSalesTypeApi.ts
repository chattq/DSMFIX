import {
  ApiResponse,
  Mst_DealerSalesType,
  SearchParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_DealerSalesTypeApi = (apiBase: AxiosInstance) => {
  return {
    Mst_DealerSalesType_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_DealerSalesType>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_DealerSalesType>>(
        "/MstDealerSalesType/Search",
        {
          ...params,
        }
      );
    },
    Mst_DealerSalesType_GetBySalesGroupType: async (
      SalesType: string
    ): Promise<ApiResponse<Mst_DealerSalesType>> => {
      return await apiBase.post<string, ApiResponse<Mst_DealerSalesType>>(
        "/MstDealerSalesType/GetBySalesType",
        {
          SalesType: SalesType,
        }
      );
    },

    Mst_DealerSalesType_Update: async (
      key: any[],
      data: Partial<Mst_DealerSalesType>
    ): Promise<ApiResponse<Mst_DealerSalesType>> => {
      return await apiBase.post<
        Partial<Mst_DealerSalesType>,
        ApiResponse<Mst_DealerSalesType>
      >("/MstDealerSalesType/Update", {
        strJson: JSON.stringify({
          ...key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_DealerSalesType_Create: async (
      DealerSalesType: Partial<Mst_DealerSalesType>
    ): Promise<ApiResponse<Mst_DealerSalesType>> => {
      return await apiBase.post<
        Partial<Mst_DealerSalesType>,
        ApiResponse<Mst_DealerSalesType>
      >("/MstDealerSalesType/Create", {
        strJson: JSON.stringify(DealerSalesType),
      });
    },

    Mst_DealerSalesType_Delete: async (SalesType: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_DealerSalesType>>(
        "/MstDealerSalesType/Delete",
        {
          ...SalesType,
        }
      );
    },

    Mst_DealerSalesType_DeleteMultiple: async (listDealerSalesType: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_DealerSalesType>>(
        "/MstDealerSalesType/DeleteMultiple",
        {
          strJson: JSON.stringify(listDealerSalesType),
        }
      );
    },

    Mst_DealerSalesType_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstDealerSalesType/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_DealerSalesType_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_DealerSalesType>,
        ApiResponse<string>
      >("/MstDealerSalesType/ExportTemplate", {});
    },

    Mst_DealerSalesType_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_DealerSalesType>,
          ApiResponse<string>
        >("/MstDealerSalesType/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_DealerSalesType_ExportByListSalesType: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_DealerSalesType>,
          ApiResponse<string>
        >("/MstDealerSalesType/ExportByListSalesType", {
          ListSalesType: keys.join(","),
        });
      }
    },
  };
};
