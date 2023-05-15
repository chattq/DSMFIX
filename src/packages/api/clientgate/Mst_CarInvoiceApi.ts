import { ApiResponse, Mst_CarInvoice, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_CarInvoiceApi = (apiBase: AxiosInstance) => {
  return {
    Mst_CarInvoice_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_CarInvoice>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarInvoice>>(
        "/MstCarInvoice/Search",
        {
          ...params,
        }
      );
    },
    Mst_CarInvoice_GetByCode: async (
      SpecCode: string
    ): Promise<ApiResponse<Mst_CarInvoice>> => {
      return await apiBase.post<string, ApiResponse<Mst_CarInvoice>>(
        "/MstCarInvoice/GetByCode",
        {
          SpecCode: SpecCode,
        }
      );
    },

    Mst_CarInvoice_Update: async (
      key: string,
      data: Partial<Mst_CarInvoice>
    ): Promise<ApiResponse<Mst_CarInvoice>> => {
      return await apiBase.post<
        Partial<Mst_CarInvoice>,
        ApiResponse<Mst_CarInvoice>
      >("/MstCarInvoice/Update", {
        strJson: JSON.stringify({
          SpecCode: key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_CarInvoice_Create: async (
      CarInvoice: Partial<Mst_CarInvoice>
    ): Promise<ApiResponse<Mst_CarInvoice>> => {
      return await apiBase.post<
        Partial<Mst_CarInvoice>,
        ApiResponse<Mst_CarInvoice>
      >("/MstCarInvoice/Create", {
        strJson: JSON.stringify(CarInvoice),
      });
    },

    Mst_CarInvoice_Delete: async (SpecCode: string) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarInvoice>>(
        "/MstCarInvoice/Delete",
        {
          SpecCode: SpecCode,
        }
      );
    },

    Mst_CarInvoice_DeleteMultiple: async (listCarInvoice: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CarInvoice>>(
        "/MstCarInvoice/DeleteMultiple",
        {
          strJson: JSON.stringify(listCarInvoice),
        }
      );
    },

    Mst_CarInvoice_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstCarInvoice/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_CarInvoice_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_CarInvoice>, ApiResponse<string>>(
        "/MstCarInvoice/ExportTemplate",
        {}
      );
    },

    Mst_CarInvoice_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<Partial<Mst_CarInvoice>, ApiResponse<string>>(
          "/MstCarInvoice/Export",
          {
            KeyWord: keyword,
            FlagActive: "",
          }
        );
      }
    },

    Mst_CarInvoice_ExportByListCode: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<Partial<Mst_CarInvoice>, ApiResponse<string>>(
          "/MstCarInvoice/ExportByListCode",
          {
            ListSpecCode: keys.join(","),
          }
        );
      }
    },
  };
};
