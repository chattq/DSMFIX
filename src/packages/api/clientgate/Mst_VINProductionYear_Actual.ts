// Mst_VINProductionYear_Actual
import {
  ApiResponse,
  Mst_VINProductionYear_Actual,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_VINProductionYear_Actual = (apiBase: AxiosInstance) => {
  return {
    Mst_VINProductionYear_Actual_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_VINProductionYear_Actual>> => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_VINProductionYear_Actual>
      >("/MstVINProductionYearActual/Search", {
        ...param,
      });
    },

    Mst_VINProductionYear_Actual_Delete: async (
      key: Partial<Mst_VINProductionYear_Actual>
    ): Promise<ApiResponse<Mst_VINProductionYear_Actual>> => {
      return await apiBase.post<
        string,
        ApiResponse<Mst_VINProductionYear_Actual>
      >("/MstVINProductionYearActual/Delete", {
        ...key,
      });
    },

    Mst_VINProductionYear_Actual_Create: async (
      data: Partial<Mst_VINProductionYear_Actual>
    ): Promise<ApiResponse<Partial<Mst_VINProductionYear_Actual>>> => {
      return apiBase.post<
        Partial<Mst_VINProductionYear_Actual>,
        ApiResponse<Mst_VINProductionYear_Actual>
      >("/MstVINProductionYearActual/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_VINProductionYear_Actual_Update: async (
      key: Partial<Mst_VINProductionYear_Actual>,
      data: Partial<Mst_VINProductionYear_Actual>
    ): Promise<ApiResponse<Mst_VINProductionYear_Actual>> => {
      return await apiBase.post("/MstVINProductionYearActual/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_VINProductionYear_Actual_ExportExcel: async (
      keys: Partial<Mst_VINProductionYear_Actual>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_VINProductionYear_Actual>,
          ApiResponse<string>
        >("/MstVINProductionYearActual/ExportByListCode", {
          ListAssemblyStatus: keys
            .map((item: Partial<Mst_VINProductionYear_Actual>) => {
              return item.AssemblyStatus;
            })
            .join(","),
          ListVINCharacters: keys
            .map((item: Partial<Mst_VINProductionYear_Actual>) => {
              return item.VINCharacters;
            })
            .join(","),
        });
      } else {
        return await apiBase.post<
          Partial<Mst_VINProductionYear_Actual>,
          ApiResponse<string>
        >("/MstVINProductionYearActual/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_VINProductionYear_Actual_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_VINProductionYear_Actual>,
        ApiResponse<string>
      >("/MstVINProductionYearActual/ExportTemplate");
    },

    Mst_VINProductionYear_Actual_DeleteMultiple: async (
      data: Partial<Mst_VINProductionYear_Actual>[]
    ) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_VINProductionYear_Actual>
      >("/MstVINProductionYearActual/DeleteMultiple", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_VINProductionYear_Actual_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstVINProductionYearActual/Import",
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
