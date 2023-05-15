import { ApiResponse, Mst_CarOCN, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_CarOCNApi = (apiBase: AxiosInstance) => {
  return {
    Mst_CarOCN_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_CarOCN>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarOCN>>(
        "/MstCarOCN/Search",
        {
          ...params,
        }
      );
    },
    Mst_CarOCN_GetAllActive: async () => {
      return await apiBase.post<Partial<Mst_CarOCN>, ApiResponse<Mst_CarOCN>>(
        "/MstCarOCN/GetAllActive"
      );
    },
    Mst_CarOCN_GetByCode: async (
      ModelCode: string
    ): Promise<ApiResponse<Mst_CarOCN>> => {
      return await apiBase.post<string, ApiResponse<Mst_CarOCN>>(
        "/MstCarOCN/GetByCode",
        {
          ModelCode: ModelCode,
        }
      );
    },

    Mst_CarOCN_Update: async (
      key: any,
      data: Partial<Mst_CarOCN>
    ): Promise<ApiResponse<Mst_CarOCN>> => {
      return await apiBase.post<Partial<Mst_CarOCN>, ApiResponse<Mst_CarOCN>>(
        "/MstCarOCN/Update",
        {
          strJson: JSON.stringify({
            ...key,
            ...data,
          }),
          ColsUpd: Object.keys(data).join(","),
        }
      );
    },

    Mst_CarOCN_Create: async (
      CarOCN: Partial<Mst_CarOCN>
    ): Promise<ApiResponse<Mst_CarOCN>> => {
      return await apiBase.post<Partial<Mst_CarOCN>, ApiResponse<Mst_CarOCN>>(
        "/MstCarOCN/Create",
        {
          strJson: JSON.stringify(CarOCN),
        }
      );
    },

    Mst_CarOCN_Delete: async (CarOCN: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarOCN>>(
        "/MstCarOCN/Delete",
        { ...CarOCN }
      );
    },

    Mst_CarOCN_DeleteMultiple: async (listCarOCN: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarOCN>>(
        "/MstCarOCN/DeleteMultiple",
        {
          strJson: JSON.stringify(listCarOCN),
        }
      );
    },

    Mst_CarOCN_ImportExcel: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstCarOCN/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_CarOCN_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_CarOCN>, ApiResponse<string>>(
        "/MstCarOCN/ExportTemplate",
        {}
      );
    },

    Mst_CarOCN_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<Partial<Mst_CarOCN>, ApiResponse<string>>(
          "/MstCarOCN/Export",
          {
            KeyWord: keyword,
            FlagActive: "",
          }
        );
      }
    },

    Mst_CarOCN_ExportByListCode: async (
      object: any
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<Partial<Mst_CarOCN>, ApiResponse<string>>(
          "/MstCarOCN/ExportByListCode",
          object
        );
      }
    },
  };
};
