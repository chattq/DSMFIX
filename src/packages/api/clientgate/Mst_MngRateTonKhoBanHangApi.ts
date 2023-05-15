import {
  ApiResponse,
  Mst_MngRateTonKhoBanHang,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_MngRateTonKhoBanHang = (apiBase: AxiosInstance) => {
  return {
    Mst_MngRateTonKhoBanHang_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_MngRateTonKhoBanHang>> => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_MngRateTonKhoBanHang>
      >("/MstMngRateTonKhoBanHang/Search", {
        ...param,
      });
    },

    Mst_MngRateTonKhoBanHang_Delete: async (
      key: Partial<Mst_MngRateTonKhoBanHang>
    ): Promise<ApiResponse<Mst_MngRateTonKhoBanHang>> => {
      return await apiBase.post<string, ApiResponse<Mst_MngRateTonKhoBanHang>>(
        "/MstMngRateTonKhoBanHang/Delete",
        {
          ...key,
        }
      );
    },

    Mst_MngRateTonKhoBanHang_Create: async (
      data: Partial<Mst_MngRateTonKhoBanHang>
    ): Promise<ApiResponse<Partial<Mst_MngRateTonKhoBanHang>>> => {
      return apiBase.post<
        Partial<Mst_MngRateTonKhoBanHang>,
        ApiResponse<Mst_MngRateTonKhoBanHang>
      >("/MstMngRateTonKhoBanHang/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_MngRateTonKhoBanHang_Update: async (
      key: Partial<Mst_MngRateTonKhoBanHang>,
      data: Partial<Mst_MngRateTonKhoBanHang>
    ): Promise<ApiResponse<Mst_MngRateTonKhoBanHang>> => {
      return await apiBase.post("/MstMngRateTonKhoBanHang/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_MngRateTonKhoBanHang_ExportExcel: async (
      keys: Partial<Mst_MngRateTonKhoBanHang>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_MngRateTonKhoBanHang>,
          ApiResponse<string>
        >("/MstMngRateTonKhoBanHang/ExportByListDealerCode", {
          ListDealerCode: keys
            .map((item: Partial<Mst_MngRateTonKhoBanHang>) => item.DealerCode)
            .join(","),
          ListModelCode: keys
            .map((item: Partial<Mst_MngRateTonKhoBanHang>) => item.ModelCode)
            .join(","),
        });
      }

      return await apiBase.post<
        Partial<Mst_MngRateTonKhoBanHang>,
        ApiResponse<string>
      >("/MstMngRateTonKhoBanHang/Export", {
        KeyWord: keyword,
        FlagActive: "",
      });
    },

    Mst_MngRateTonKhoBanHang_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_MngRateTonKhoBanHang>,
        ApiResponse<string>
      >("/MstMngRateTonKhoBanHang/ExportTemplate");
    },

    Mst_MngRateTonKhoBanHang_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Mst_MngRateTonKhoBanHang>
      >("/MstMngRateTonKhoBanHang/DeleteMultiple", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_MngRateTonKhoBanHang_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstMngRateTonKhoBanHang/Import",
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
