import { ApiResponse, Mst_CustomerBase, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_CustomerBase = (apiBase: AxiosInstance) => {
  return {
    Mst_CustomerBase_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_CustomerBase>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CustomerBase>>(
        "/MstCustomerBase/Search",
        {
          ...param,
        }
      );
    },

    Mst_CustomerBase_Delete: async (
      key: string
    ): Promise<ApiResponse<Mst_CustomerBase>> => {
      return await apiBase.post<string, ApiResponse<Mst_CustomerBase>>(
        "/MstCustomerBase/Delete",
        {
          CustomerBaseCode: key,
        }
      );
    },

    Mst_CustomerBase_Create: async (
      data: Partial<Mst_CustomerBase>
    ): Promise<ApiResponse<Partial<Mst_CustomerBase>>> => {
      return apiBase.post<
        Partial<Mst_CustomerBase>,
        ApiResponse<Mst_CustomerBase>
      >("/MstCustomerBase/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_CustomerBase_Update: async (
      key: string,
      data: Partial<Mst_CustomerBase>
    ): Promise<ApiResponse<Mst_CustomerBase>> => {
      return await apiBase.post("/MstCustomerBase/Update", {
        strJson: JSON.stringify({
          ...data,
          CustomerBaseCode: key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_CustomerBase_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_CustomerBase>,
          ApiResponse<string>
        >("/MstCustomerBase/ExportByListCode", {
          ListCustomerBaseCode: keys.join(","),
        });
      } else {
        return await apiBase.post<
          Partial<Mst_CustomerBase>,
          ApiResponse<string>
        >("/MstCustomerBase/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Mst_CustomerBase_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<Mst_CustomerBase>, ApiResponse<string>>(
        "/MstCustomerBase/ExportTemplate"
      );
    },

    Mst_CustomerBase_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CustomerBase>>(
        "/MstCustomerBase/DeleteMultiple",
        {
          strJson: JSON.stringify(
            data.map((item) => ({
              CustomerBaseCode: item,
            }))
          ),
        }
      );
    },

    Mst_CustomerBase_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstCustomerBase/Import",
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
