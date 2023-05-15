import { ApiResponse, SearchParam, Mst_Port } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMstPort = (apiBase: AxiosInstance) => {
  return {
    Mst_Port_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_Port>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Port>>(
        "/MstPort/Search",
        {
          ...params,
        }
      );
    },
    MstPortAllActive_GetAllActive: async (): Promise<ApiResponse<Mst_Port>> => {
      return await apiBase.post<any, ApiResponse<Mst_Port>>(
        "/MstPort/GetAllActive"
      );
    },
    Mst_Port_Create: async (
      province: Partial<Mst_Port>
    ): Promise<ApiResponse<Mst_Port>> => {
      return await apiBase.post<Partial<Mst_Port>, ApiResponse<Mst_Port>>(
        "/MstPort/Create",
        {
          strJson: JSON.stringify(province),
        }
      );
    },

    Mst_Port_Delete: async (PortCode: string) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Port>>(
        "/MstPort/Delete",
        {
          PortCode: PortCode,
        }
      );
    },
    Mst_Port_DeleteMultiple: async (provinceCodes: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Port>>(
        "/MstPort/DeleteMultiple",
        {
          strJson: JSON.stringify(
            provinceCodes.map((item) => ({
              ProvinceCode: item,
            }))
          ),
        }
      );
    },
    Mst_Port_Update: async (
      key: string,
      port: Partial<Mst_Port>
    ): Promise<ApiResponse<Mst_Port>> => {
      return await apiBase.post<Partial<Mst_Port>, ApiResponse<Mst_Port>>(
        "/MstPort/Update",
        {
          strJson: JSON.stringify({
            PortCode: key,
            ...port,
          }),
          ColsUpd: Object.keys(port),
        }
      );
    },
    Mst_Port_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/MstPort/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Mst_Port_DownloadTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_Port>, ApiResponse<string>>(
        "/MstPort/ExportTemplate",
        {}
      );
    },
    Mst_Port_Export: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<Partial<Mst_Port>, ApiResponse<string>>(
          "/MstPort/ExportByListPortCode",
          {
            ListProvinceCode: keys.join(","),
          }
        );
      } else {
        return await apiBase.post<Partial<Mst_Port>, ApiResponse<string>>(
          "/MstPort/Export",
          {
            KeyWord: keyword,
            FlagActive: "",
          }
        );
      }
    },
  };
};
