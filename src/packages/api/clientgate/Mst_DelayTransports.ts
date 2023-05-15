import { ApiResponse, Mst_DelayTransports, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_DelayTransports = (apiBase: AxiosInstance) => {
  return {
    Mst_DelayTransports_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_DelayTransports>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_DelayTransports>>(
        "/MstDelayTransports/Search",
        {
          ...param,
        }
      );
    },

    Mst_DelayTransports_Delete: async (
      key: Object
    ): Promise<ApiResponse<Mst_DelayTransports>> => {
      return await apiBase.post<string, ApiResponse<Mst_DelayTransports>>(
        "/MstDelayTransports/Delete",
        {
          ...key,
        }
      );
    },

    Mst_DelayTransports_Create: async (
      data: Partial<Mst_DelayTransports>
    ): Promise<ApiResponse<Partial<Mst_DelayTransports>>> => {
      return apiBase.post<
        Partial<Mst_DelayTransports>,
        ApiResponse<Mst_DelayTransports>
      >("/MstDelayTransports/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_DelayTransports_Update: async (
      key: Object,
      data: Partial<Mst_DelayTransports>
    ): Promise<ApiResponse<Mst_DelayTransports>> => {
      console.log("Object.keys ", Object.keys(data));
      return await apiBase.post("/MstDelayTransports/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_DelayTransports_ExportExcel: async (
      keys: any[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_DelayTransports>,
          ApiResponse<string>
        >("/MstDelayTransports/ExportByListCode", {
          ListStorageCode: keys
            .map((item: Partial<Mst_DelayTransports>) => item.StorageCode)
            .join(","),
          ListDealerCode: keys
            .map((item: Partial<Mst_DelayTransports>) => item.DealerCode)
            .join(","),
        });
      }

      return await apiBase.post<
        Partial<Mst_DelayTransports>,
        ApiResponse<string>
      >("/MstDelayTransports/Export", {
        KeyWord: keyword,
        FlagActive: "",
      });
    },

    Mst_DelayTransports_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_DelayTransports>,
        ApiResponse<string>
      >("/MstDelayTransports/ExportTemplate");
    },

    Mst_DelayTransports_DeleteMultiple: async (
      data: Partial<Mst_DelayTransports>[]
    ) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_DelayTransports>>(
        "/MstDelayTransports/DeleteMultiple",
        {
          strJson: JSON.stringify(
            data.map((item) => ({
              ...item,
            }))
          ),
        }
      );
    },

    Mst_DelayTransports_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstDelayTransports/Import",
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
