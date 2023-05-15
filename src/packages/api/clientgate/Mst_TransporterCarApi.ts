import { ApiResponse, Mst_TransporterCar, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_TransporterCar = (apiBase: AxiosInstance) => {
  return {
    Mst_TransporterCar_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_TransporterCar>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_TransporterCar>>(
        "/MstTransporterCar/Search",
        {
          ...param,
        }
      );
    },

    Mst_TransporterCar_Delete: async (
      key: Object
    ): Promise<ApiResponse<Mst_TransporterCar>> => {
      return await apiBase.post<string, ApiResponse<Mst_TransporterCar>>(
        "/MstTransporterCar/Delete",
        {
          ...key,
        }
      );
    },

    Mst_TransporterCar_DeleteMultiple: async (
      key: Object[]
    ): Promise<ApiResponse<Mst_TransporterCar>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_TransporterCar>>(
        "/MstTransporterCar/DeleteMultiple",
        {
          strJson: JSON.stringify(key),
        }
      );
    },

    Mst_TransporterCar_Create: async (
      data: Partial<Mst_TransporterCar>
    ): Promise<ApiResponse<Partial<Mst_TransporterCar>>> => {
      return apiBase.post<
        Partial<Mst_TransporterCar>,
        ApiResponse<Mst_TransporterCar>
      >("/MstTransporterCar/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_TransporterCar_Update: async (
      key: Object,
      data: Partial<Mst_TransporterCar>
    ): Promise<ApiResponse<Mst_TransporterCar>> => {
      console.log("Object.keys(data) ", Object.keys(data));
      return await apiBase.post("/MstTransporterCar/Update", {
        strJson: JSON.stringify({
          ...key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_TransporterCar_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      console.log("keys ", keys);
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_TransporterCar>,
          ApiResponse<string>
        >("/MstTransporterCar/ExportByListCode", {
          ListTransporterCode: keys
            .map((item: any) => {
              return item.TransporterCode;
            })
            .join(","),
          ListPlateNo: keys
            .map((item: any) => {
              return item.PlateNo;
            })
            .join(","),
        });
      } else {
        return await apiBase.post<
          Partial<Mst_TransporterCar>,
          ApiResponse<string>
        >("/MstTransporterCar/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_TransporterCar_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_TransporterCar>,
        ApiResponse<string>
      >("/MstTransporterCar/ExportTemplate");
    },

    Mst_TransporterCar_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstTransporterCar/Import",
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
