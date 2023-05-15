import { ApiResponse, Mst_UnitPriceAVN, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_UnitPriceAVN = (apiBase: AxiosInstance) => {
  return {
    Mst_UnitPriceAVN_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_UnitPriceAVN>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_UnitPriceAVN>>(
        "/MstUnitPriceAVN/Search",
        {
          ...param,
        }
      );
    },

    Mst_UnitPriceAVN_Delete: async (
      key: Partial<Mst_UnitPriceAVN>
    ): Promise<ApiResponse<Mst_UnitPriceAVN>> => {
      console.log("key: ", key);
      return await apiBase.post<string, ApiResponse<Mst_UnitPriceAVN>>(
        "/MstUnitPriceAVN/Delete",
        {
          AVNCode: key.AVNCode,
        }
      );
    },

    Mst_UnitPriceAVN_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_UnitPriceAVN>>(
        "/MstUnitPriceAVN/DeleteMultiple",
        {
          strJson: JSON.stringify(
            data.map((item: any) => {
              return {
                AVNCode: item.AVNCode,
              };
            })
          ),
        }
      );
    },

    Mst_UnitPriceAVN_Create: async (
      data: Partial<Mst_UnitPriceAVN>
    ): Promise<ApiResponse<Partial<Mst_UnitPriceAVN>>> => {
      return apiBase.post<
        Partial<Mst_UnitPriceAVN>,
        ApiResponse<Mst_UnitPriceAVN>
      >("/MstUnitPriceAVN/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_UnitPriceAVN_Update: async (
      key: Object,
      data: Partial<Mst_UnitPriceAVN>
    ): Promise<ApiResponse<Mst_UnitPriceAVN>> => {
      return await apiBase.post("/MstUnitPriceAVN/Update", {
        strJson: JSON.stringify({
          ...key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_UnitPriceAVN_ExportExcel: async (
      keys: any[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_UnitPriceAVN>,
          ApiResponse<string>
        >("/MstUnitPriceAVN/ExportByListAVNCode", {
          ListAVNCode: keys
            .map((item: Mst_UnitPriceAVN) => {
              return item.AVNCode;
            })
            .join(","),
        });
      }

      return await apiBase.post<Partial<Mst_UnitPriceAVN>, ApiResponse<string>>(
        "/MstUnitPriceAVN/Export",
        {
          KeyWord: keyword,
          FlagActive: "",
        }
      );
    },

    Mst_UnitPriceAVN_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_UnitPriceAVN>, ApiResponse<string>>(
        "/MstUnitPriceAVN/ExportTemplate"
      );
    },

    Mst_UnitPriceAVN_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstUnitPriceAVN/Import",
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
