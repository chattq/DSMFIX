import {
  ApiResponse,
  Mst_BankAccount,
  SearchDealerParam,
  SearchParam,
  Search_Mst_BankAccount,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_BankAccount = (apiBase: AxiosInstance) => {
  return {
    Mst_BankAccount_Search: async (
      param: Partial<Search_Mst_BankAccount>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >("/MstBankAccount/Search", {
        ...param,
      });
    },

    Mst_BankAccount_Delete: async (
      key: Partial<Mst_BankAccount>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<string, ApiResponse<Mst_BankAccount>>(
        "/MstBankAccount/Delete",
        {
          ...key,
        }
      );
    },

    Mst_BankAccount_Create: async (
      data: Partial<Mst_BankAccount>
    ): Promise<ApiResponse<Partial<Mst_BankAccount>>> => {
      return apiBase.post<
        Partial<Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >("/MstBankAccount/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_BankAccount_Update: async (
      key: Partial<Mst_BankAccount>,
      data: Partial<Mst_BankAccount>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post("/MstBankAccount/Update", {
        strJson: JSON.stringify({
          ...data,
          ...key,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Mst_BankAccount_ExportExcel: async (
      keys: Partial<Mst_BankAccount>[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<
          Partial<Mst_BankAccount>,
          ApiResponse<string>
        >("/MstBankAccount/ExportByListAccountNo", {
          ListBankCode: keys
            .map((item: Partial<Mst_BankAccount>) => item.BankCode)
            .join(","),
          ListAccountNo: keys
            .map((item: Partial<Mst_BankAccount>) => item.AccountNo)
            .join(","),
        });
      }

      return await apiBase.post<Partial<Mst_BankAccount>, ApiResponse<string>>(
        "/MstBankAccount/Export",
        {
          KeyWord: keyword,
          FlagActive: "",
        }
      );
    },

    Mst_BankAccount_ExportExcel_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<Partial<Mst_BankAccount>, ApiResponse<string>>(
        "/MstBankAccount/ExportTemplate"
      );
    },

    Mst_BankAccount_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_BankAccount>>(
        "/MstBankAccount/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mst_BankAccount_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstBankAccount/Import",
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
