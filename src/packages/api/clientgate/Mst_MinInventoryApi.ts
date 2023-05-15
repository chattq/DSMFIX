// Mst_MinInventory
import { ApiResponse, Mst_MinInventory, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_MinInventory = (apiBase: AxiosInstance) => {
  return {
    Mst_MinInventory_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_MinInventory>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_MinInventory>>(
        "/MstMinInventory/Search",
        {
          ...param,
        }
      );
    },

    Mst_MinInventory_Delete: async (
      key: Partial<Mst_MinInventory>
    ): Promise<ApiResponse<Mst_MinInventory>> => {
      return await apiBase.post<string, ApiResponse<Mst_MinInventory>>(
        "/MstMinInventory/Delete",
        {
          ...key,
        }
      );
    },

    Mst_MinInventory_Create: async (
      data: Partial<Mst_MinInventory>
    ): Promise<ApiResponse<Partial<Mst_MinInventory>>> => {
      return apiBase.post<
        Partial<Mst_MinInventory>,
        ApiResponse<Mst_MinInventory>
      >("/MstMinInventory/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_MinInventory_Update: async (
      key: Partial<Mst_MinInventory>,
      data: Partial<Mst_MinInventory>
    ): Promise<ApiResponse<Mst_MinInventory>> => {
      return await apiBase.post("/MstMinInventory/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_MinInventory_ExportExcel: async (
      keys: Partial<Mst_MinInventory>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_MinInventory>,
          ApiResponse<string>
        >("/MstMinInventory/ExportByListCode", {
          ListModelCode: keys
            .map((item: Partial<Mst_MinInventory>) => {
              return item.ModelCode;
            })
            .join(","),
          ListSpecCode: keys
            .map((item: Partial<Mst_MinInventory>) => {
              return item.SpecCode;
            })
            .join(","),
        });
      } else {
        return await apiBase.post<
          Partial<Mst_MinInventory>,
          ApiResponse<string>
        >("/MstMinInventory/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_MinInventory_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<Mst_MinInventory>, ApiResponse<string>>(
        "/MstMinInventory/ExportTemplate"
      );
    },

    Mst_MinInventory_DeleteMultiple: async (
      data: Partial<Mst_MinInventory>[]
    ) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_MinInventory>>(
        "/MstMinInventory/DeleteMultiple",
        {
          strJson: JSON.stringify(
            data.map((item: Partial<Mst_MinInventory>) => ({
              ModelCode: item.ModelCode,
              SpecCode: item.SpecCode,
            }))
          ),
        }
      );
    },

    Mst_MinInventory_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstMinInventory/Import",
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
