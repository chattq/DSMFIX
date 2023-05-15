import { ApiResponse, Mst_UnitPriceGPS, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_UnitPriceGPS = (apiBase: AxiosInstance) => {
  return {
    Mst_UnitPriceGPS_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_UnitPriceGPS>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_UnitPriceGPS>>(
        "/MstUnitPriceGPS/Search",
        {
          ...param,
        }
      );
    },

    Mst_UnitPriceGPS_Delete: async (
      key: string
    ): Promise<ApiResponse<Mst_UnitPriceGPS>> => {
      return await apiBase.post<string, ApiResponse<Mst_UnitPriceGPS>>(
        "/MstUnitPriceGPS/Delete",
        {
          ContractNo: key,
        }
      );
    },

    Mst_UnitPriceGPS_Create: async (
      data: Partial<Mst_UnitPriceGPS>
    ): Promise<ApiResponse<Partial<Mst_UnitPriceGPS>>> => {
      return apiBase.post<
        Partial<Mst_UnitPriceGPS>,
        ApiResponse<Mst_UnitPriceGPS>
      >("/MstUnitPriceGPS/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_UnitPriceGPS_Update: async (
      key: string,
      data: Partial<Mst_UnitPriceGPS>
    ): Promise<ApiResponse<Mst_UnitPriceGPS>> => {
      return await apiBase.post("/MstUnitPriceGPS/Update", {
        strJson: JSON.stringify({
          ...data,
          ContractNo: key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_UnitPriceGPS_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_UnitPriceGPS>,
          ApiResponse<string>
        >("/MstUnitPriceGPS/ExportByListCode", {
          ListContractNo: keys.join(","),
        });
      }

      return await apiBase.post<Partial<Mst_UnitPriceGPS>, ApiResponse<string>>(
        "/MstUnitPriceGPS/Export",
        {
          KeyWord: keyword,
          FlagActive: "",
        }
      );
    },

    Mst_UnitPriceGPS_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<Mst_UnitPriceGPS>, ApiResponse<string>>(
        "/MstUnitPriceGPS/ExportTemplate"
      );
    },

    Mst_UnitPriceGPS__DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_UnitPriceGPS>>(
        "/MstUnitPriceGPS/DeleteMultiple",
        {
          strJson: JSON.stringify(
            data.map((item) => ({
              ContractNo: item,
            }))
          ),
        }
      );
    },

    Mst_UnitPriceGPS_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstUnitPriceGPS/Import",
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
