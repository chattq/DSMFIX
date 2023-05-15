import {
  ApiResponse,
  Mst_CabinCertificate,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const use_MstCabinCertificate = (apiBase: AxiosInstance) => {
  return {
    Mst_CabinCertificate_Search: async (
      param: SearchParam
    ): Promise<ApiResponse<Mst_CabinCertificate>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_CabinCertificate>>(
        "/MstCabinCertificate/Search",
        {
          ...param,
        }
      );
    },

    Mst_CabinCertificate_DeleteMultiple: async (
      CabinCertificateNos: string[]
    ): Promise<ApiResponse<Mst_CabinCertificate>> => {
      console.log("CabinCertificateNos ", CabinCertificateNos);
      return await apiBase.post<string, ApiResponse<Mst_CabinCertificate>>(
        "/MstCabinCertificate/DeleteMultiple",
        {
          strJson: JSON.stringify(
            CabinCertificateNos.map((item) => ({
              CabinCertificateNo: item,
            }))
          ),
        }
      );
    },

    Mst_CabinCertificate_Delete: async (
      key: string
    ): Promise<ApiResponse<Mst_CabinCertificate>> => {
      return await apiBase.post<string, ApiResponse<Mst_CabinCertificate>>(
        "/MstCabinCertificate/Delete",
        {
          CabinCertificateNo: key,
        }
      );
    },

    Mst_CabinCertificate_Create: async (
      data: Partial<Mst_CabinCertificate>
    ): Promise<ApiResponse<Partial<Mst_CabinCertificate>>> => {
      return apiBase.post<
        Partial<Mst_CabinCertificate>,
        ApiResponse<Mst_CabinCertificate>
      >("/MstCabinCertificate/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_CabinCertificate_Update: async (
      key: string,
      data: Partial<Mst_CabinCertificate>
    ): Promise<ApiResponse<Mst_CabinCertificate>> => {
      return await apiBase.post("/MstCabinCertificate/Update", {
        strJson: JSON.stringify({
          ...data,
          CabinCertificateNo: key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_CabinCertificate_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_CabinCertificate>,
          ApiResponse<string>
        >("/MstCabinCertificate/ExportByListCabinCertificateNo", {
          ListCabinCertificateNo: keys.join(","),
        });
      }

      return await apiBase.post<
        Partial<Mst_CabinCertificate>,
        ApiResponse<string>
      >("/MstCabinCertificate/Export", {
        KeyWord: keyword,
        FlagActive: "",
      });
    },

    Mst_CabinCertificate_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Mst_CabinCertificate>,
        ApiResponse<string>
      >("/MstCabinCertificate/ExportTemplate");
    },

    Mst_CabinCertificate_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstCabinCertificate/Import",
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
