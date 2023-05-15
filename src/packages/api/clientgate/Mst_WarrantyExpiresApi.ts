import { ApiResponse, Mst_WarrantyExpires, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_WarrantyExpires = (apiBase: AxiosInstance) => {
  return {
    Mst_WarrantyExpires_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_WarrantyExpires>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_WarrantyExpires>>(
        "/MstWarrantyExpires/Search",
        {
          ...param,
        }
      );
    },

    Mst_WarrantyExpires_Delete: async (
      key: Partial<Mst_WarrantyExpires>
    ): Promise<ApiResponse<Mst_WarrantyExpires>> => {
      return await apiBase.post<string, ApiResponse<Mst_WarrantyExpires>>(
        "/MstWarrantyExpires/Delete",
        {
          ...key,
        }
      );
    },

    Mst_WarrantyExpires_Create: async (
      data: Partial<Mst_WarrantyExpires>
    ): Promise<ApiResponse<Partial<Mst_WarrantyExpires>>> => {
      return apiBase.post<
        Partial<Mst_WarrantyExpires>,
        ApiResponse<Mst_WarrantyExpires>
      >("/MstWarrantyExpires/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_WarrantyExpires_Update: async (
      key: Partial<Mst_WarrantyExpires>,
      data: Partial<Mst_WarrantyExpires>
    ): Promise<ApiResponse<Mst_WarrantyExpires>> => {
      return await apiBase.post("/MstWarrantyExpires/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_WarrantyExpires_ExportExcel: async (
      keys: Partial<Mst_WarrantyExpires>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_WarrantyExpires>,
          ApiResponse<string>
        >("/MstWarrantyExpires/ExportByListModelCode", {
          ListModelCode: keys
            .map((item: Partial<Mst_WarrantyExpires>) => item.ModelCode)
            .join(","),
        });
      }

      return await apiBase.post<
        Partial<Mst_WarrantyExpires>,
        ApiResponse<string>
      >("/MstWarrantyExpires/Export", {
        KeyWord: keyword,
        FlagActive: "",
      });
    },

    Mst_WarrantyExpires_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_WarrantyExpires>,
        ApiResponse<string>
      >("/MstWarrantyExpires/ExportTemplate");
    },

    Mst_WarrantyExpires_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_WarrantyExpires>>(
        "/MstWarrantyExpires/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mst_WarrantyExpires_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstWarrantyExpires/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  };
};
