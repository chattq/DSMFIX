import {
  ApiResponse,
  Mst_Transporter,
  Search_Mst_Transporter,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_Transporter = (apiBase: AxiosInstance) => {
  return {
    Mst_Transporter_GetAllActive: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Mst_Transporter>,
        ApiResponse<Mst_Transporter>
      >("/MstTransporter/GetAllActive");
    },
    Mst_Transporter__Search: async (
      param: Partial<Search_Mst_Transporter>
    ): Promise<ApiResponse<Mst_Transporter>> => {
      return await apiBase.post<
        Search_Mst_Transporter,
        ApiResponse<Mst_Transporter>
      >("/MstTransporter/Search", {
        ...param,
      });
    },

    Mst_Transporter_Delete: async (
      key: Object
    ): Promise<ApiResponse<Mst_Transporter>> => {
      return await apiBase.post<string, ApiResponse<Mst_Transporter>>(
        "/MstTransporter/Delete",
        {
          ...key,
        }
      );
    },

    Mst_Transporter_DeleteMultiple: async (
      key: Object[]
    ): Promise<ApiResponse<Mst_Transporter>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Transporter>>(
        "/MstTransporter/DeleteMultiple",
        {
          strJson: JSON.stringify(key),
        }
      );
    },

    Mst_Transporter_Create: async (
      data: Partial<Mst_Transporter>
    ): Promise<ApiResponse<Partial<Mst_Transporter>>> => {
      return apiBase.post<
        Partial<Mst_Transporter>,
        ApiResponse<Mst_Transporter>
      >("/MstTransporter/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_Transporter_Update: async (
      key: Object,
      data: Partial<Mst_Transporter>
    ): Promise<ApiResponse<Mst_Transporter>> => {
      console.log("Object.keys(data) ", Object.keys(data));
      return await apiBase.post("/MstTransporter/Update", {
        strJson: JSON.stringify({
          ...key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_Transporter_ExportByListCode: async (
      keys: Partial<Mst_Transporter>[]
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_Transporter>, ApiResponse<string>>(
        "/MstTransporter/ExportByListCode",
        {
          ListTransporterCode: keys
            .map((item: any) => {
              return item.TransporterCode;
            })
            .join(","),
        }
      );
    },
    Mst_Transporter_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_Transporter>, ApiResponse<string>>(
        "/MstTransporter/Export",
        {
          TransporterCode: "",
          TransporterName: "",
          FlagActive: "",
        }
      );
    },

    Mst_Transporter_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<Mst_Transporter>, ApiResponse<string>>(
        "/MstTransporter/ExportTemplate"
      );
    },

    Mst_Transporter_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstTransporter/Import",
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
