import { ApiResponse, Mst_CarCancelType, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_CarCancelTypeApi = (apiBase: AxiosInstance) => {
  return {
    Mst_CarCancelType_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_CarCancelType>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarCancelType>>(
        "/MstCarCancelType/Search",
        {
          ...params,
        }
      );
    },
    Mst_CarCancelType_GetByCarCancelType: async (
      CarCancelType: string
    ): Promise<ApiResponse<Mst_CarCancelType>> => {
      return await apiBase.post<string, ApiResponse<Mst_CarCancelType>>(
        "/MstCarCancelType/GetByCarCancelType",
        {
          CarCancelType: CarCancelType,
        }
      );
    },

    Mst_CarCancelType_Update: async (
      key: string,
      data: Partial<Mst_CarCancelType>
    ): Promise<ApiResponse<Mst_CarCancelType>> => {
      return await apiBase.post<
        Partial<Mst_CarCancelType>,
        ApiResponse<Mst_CarCancelType>
      >("/MstCarCancelType/Update", {
        strJson: JSON.stringify({
          CarCancelType: key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_CarCancelType_Create: async (
      CarCancelType: Partial<Mst_CarCancelType>
    ): Promise<ApiResponse<Mst_CarCancelType>> => {
      return await apiBase.post<
        Partial<Mst_CarCancelType>,
        ApiResponse<Mst_CarCancelType>
      >("/MstCarCancelType/Create", {
        strJson: JSON.stringify(CarCancelType),
      });
    },

    Mst_CarCancelType_Delete: async (CarCancelType: string) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarCancelType>>(
        "/MstCarCancelType/Delete",
        {
          CarCancelType: CarCancelType,
        }
      );
    },

    Mst_CarCancelType_DeleteMultiple: async (listCarCancelType: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarCancelType>>(
        "/MstCarCancelType/DeleteMultiple",
        {
          strJson: JSON.stringify(listCarCancelType),
        }
      );
    },

    Mst_CarCancelType_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstCarCancelType/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_CarCancelType_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_CarCancelType>,
        ApiResponse<string>
      >("/MstCarCancelType/ExportTemplate", {});
    },

    Mst_CarCancelType_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_CarCancelType>,
          ApiResponse<string>
        >("/MstCarCancelType/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_CarCancelType_ExportByListCarCancelType: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_CarCancelType>,
        ApiResponse<string>
      >("/MstCarCancelType/ExportByListCarCancelType", {
        ListCarCancelType: keys.join(","),
      });
    },
  };
};
