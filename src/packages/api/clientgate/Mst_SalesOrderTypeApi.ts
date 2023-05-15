import { ApiResponse, Mst_SalesOrderType, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_SalesOrderTypeApi = (apiBase: AxiosInstance) => {
  return {
    Mst_SalesOrderType_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_SalesOrderType>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_SalesOrderType>>(
        "/MstSalesOrderType/Search",
        {
          ...params,
        }
      );
    },
    Mst_SalesOrderType_GetBySOType: async (
      SOType: string
    ): Promise<ApiResponse<Mst_SalesOrderType>> => {
      return await apiBase.post<string, ApiResponse<Mst_SalesOrderType>>(
        "/MstSalesOrderType/GetAreaByCode",
        {
          SOType: SOType,
        }
      );
    },

    Mst_SalesOrderType_Update: async (
      key: string,
      data: Partial<Mst_SalesOrderType>
    ): Promise<ApiResponse<Mst_SalesOrderType>> => {
      return await apiBase.post<
        Partial<Mst_SalesOrderType>,
        ApiResponse<Mst_SalesOrderType>
      >("/MstSalesOrderType/Update", {
        strJson: JSON.stringify({
          SOType: key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_SalesOrderType_Create: async (
      salesOrderType: Partial<Mst_SalesOrderType>
    ): Promise<ApiResponse<Mst_SalesOrderType>> => {
      return await apiBase.post<
        Partial<Mst_SalesOrderType>,
        ApiResponse<Mst_SalesOrderType>
      >("/MstSalesOrderType/Create", {
        strJson: JSON.stringify(salesOrderType),
      });
    },

    Mst_SalesOrderType_Delete: async (SOType: string) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_SalesOrderType>>(
        "/MstSalesOrderType/Delete",
        {
          SOType: SOType,
        }
      );
    },

    Mst_SalesOrderType_DeleteMultiple: async (listSalesOrderType: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_SalesOrderType>>(
        "/MstSalesOrderType/DeleteMultiple",
        {
          strJson: JSON.stringify(listSalesOrderType),
        }
      );
    },

    Mst_SalesOrderType_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstSalesOrderType/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_SalesOrderType_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_SalesOrderType>,
        ApiResponse<string>
      >("/MstSalesOrderType/ExportTemplate", {});
    },

    Mst_SalesOrderType_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_SalesOrderType>,
        ApiResponse<string>
      >("/MstSalesOrderType/Export", {
        KeyWord: keyword,
        FlagActive: "",
      });
    },

    Mst_SalesOrderType_ExportByListSOType: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_SalesOrderType>,
        ApiResponse<string>
      >("/MstSalesOrderType/ExportByListSOType", {
        ListSOType: keys.join(","),
      });
    },
  };
};
