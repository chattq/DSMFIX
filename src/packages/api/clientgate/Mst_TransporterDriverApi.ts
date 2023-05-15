import {
  ApiResponse,
  Mst_TransporterDriver,
  SearchParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_TransporterDriverApi = (apiBase: AxiosInstance) => {
  return {
    Mst_TransporterDriver_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_TransporterDriver>> => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_TransporterDriver>
      >("/MstTransporterDriver/Search", {
        ...params,
      });
    },
    Mst_TransporterDriver_GetByCode: async (
      TransporterCode: string,
      DriverId: string
    ): Promise<ApiResponse<Mst_TransporterDriver>> => {
      return await apiBase.post<string, ApiResponse<Mst_TransporterDriver>>(
        "/MstTransporterDriver/GetByCode",
        {
          TransporterCode: TransporterCode,
          DriverId: DriverId,
        }
      );
    },

    Mst_TransporterDriver_Update: async (
      key: any,
      data: Partial<Mst_TransporterDriver>
    ): Promise<ApiResponse<Mst_TransporterDriver>> => {
      return await apiBase.post<
        Partial<Mst_TransporterDriver>,
        ApiResponse<Mst_TransporterDriver>
      >("/MstTransporterDriver/Update", {
        strJson: JSON.stringify({
          ...key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_TransporterDriver_Create: async (
      TransporterDriverMst_TransporterDriver: Partial<Mst_TransporterDriver>
    ): Promise<ApiResponse<Mst_TransporterDriver>> => {
      return await apiBase.post<
        Partial<Mst_TransporterDriver>,
        ApiResponse<Mst_TransporterDriver>
      >("/MstTransporterDriver/Create", {
        strJson: JSON.stringify(TransporterDriverMst_TransporterDriver),
      });
    },

    Mst_TransporterDriver_Delete: async (TransporterDriver: any) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_TransporterDriver>
      >("/MstTransporterDriver/Delete", {
        ...TransporterDriver,
      });
    },

    Mst_TransporterDriver_DeleteMultiple: async (
      listTransporterDriver: any[]
    ) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_TransporterDriver>
      >("/MstTransporterDriver/DeleteMultiple", {
        strJson: JSON.stringify(listTransporterDriver),
      });
    },

    Mst_TransporterDriver_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstTransporterDriver/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_TransporterDriver_ExportTemplate: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_TransporterDriver>,
        ApiResponse<string>
      >("/MstTransporterDriver/ExportTemplate", {});
    },

    Mst_TransporterDriver_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_TransporterDriver>,
          ApiResponse<string>
        >("/MstTransporterDriver/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_TransporterDriver_ExportByListCode: async (
      object: any
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_TransporterDriver>,
          ApiResponse<string>
        >("/MstTransporterDriver/ExportByListCode", object);
      }
    },
  };
};
