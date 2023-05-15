import {
  ApiResponse,
  Auto_MapVIN_DistributionSumRate,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useAuto_MapVIN_DistributionSumRate = (apiBase: AxiosInstance) => {
  return {
    Auto_MapVIN_DistributionSumRate_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Auto_MapVIN_DistributionSumRate>> => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Auto_MapVIN_DistributionSumRate>
      >("/AutoMapVINDistributionSumRate/Search", {
        ...param,
      });
    },

    Auto_MapVIN_DistributionSumRate_Delete: async (
      key: Partial<Auto_MapVIN_DistributionSumRate>
    ): Promise<ApiResponse<Auto_MapVIN_DistributionSumRate>> => {
      return await apiBase.post<
        string,
        ApiResponse<Auto_MapVIN_DistributionSumRate>
      >("/AutoMapVINDistributionSumRate/Delete", {
        ...key,
      });
    },

    Auto_MapVIN_DistributionSumRate_Create: async (
      data: Partial<Auto_MapVIN_DistributionSumRate>
    ): Promise<ApiResponse<Partial<Auto_MapVIN_DistributionSumRate>>> => {
      return apiBase.post<
        Partial<Auto_MapVIN_DistributionSumRate>,
        ApiResponse<Auto_MapVIN_DistributionSumRate>
      >("/AutoMapVINDistributionSumRate/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Auto_MapVIN_DistributionSumRate_Update: async (
      key: Partial<Auto_MapVIN_DistributionSumRate>,
      data: Partial<Auto_MapVIN_DistributionSumRate>
    ): Promise<ApiResponse<Auto_MapVIN_DistributionSumRate>> => {
      console.log(
        "strJson",
        JSON.stringify({
          ...data,
          ...key,
        }),
        "ColsUpd: ",
        Object.keys(data)
      );

      return await apiBase.post("/AutoMapVINDistributionSumRate/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Auto_MapVIN_DistributionSumRate_ExportExcel: async (
      keys: Partial<Auto_MapVIN_DistributionSumRate>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Auto_MapVIN_DistributionSumRate>,
          ApiResponse<string>
        >("/AutoMapVINDistributionSumRate/ExportByListCode", {
          ListModelCode: keys
            .map((item: Partial<Auto_MapVIN_DistributionSumRate>) => {
              return item.ModelCode;
            })
            .join(","),
          ListSpecCode: keys
            .map((item: Partial<Auto_MapVIN_DistributionSumRate>) => {
              return item.SpecCode;
            })
            .join(","),
          ListColorExtCode: keys
            .map((item: Partial<Auto_MapVIN_DistributionSumRate>) => {
              return item.ColorExtCode;
            })
            .join(","),
        });
      } else {
        return await apiBase.post<
          Partial<Auto_MapVIN_DistributionSumRate>,
          ApiResponse<string>
        >("/AutoMapVINDistributionSumRate/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Auto_MapVIN_DistributionSumRate_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Auto_MapVIN_DistributionSumRate>,
        ApiResponse<string>
      >("/AutoMapVINDistributionSumRate/ExportTemplate");
    },

    Auto_MapVIN_DistributionSumRate_DeleteMultiple: async (
      data: Partial<Auto_MapVIN_DistributionSumRate>[]
    ) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Auto_MapVIN_DistributionSumRate>
      >("/AutoMapVINDistributionSumRate/DeleteMultiple", {
        strJson: JSON.stringify(data),
      });
    },

    Auto_MapVIN_DistributionSumRate_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/AutoMapVINDistributionSumRate/Import",
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
