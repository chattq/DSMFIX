import { ApiResponse, Mst_BankDealer, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_BankDealer = (apiBase: AxiosInstance) => {
  return {
    Mst_BankDealer_Search: async (
      params: Partial<SearchParam>
    ): Promise<ApiResponse<Mst_BankDealer>> => {
      return await apiBase.post<
        Partial<SearchParam>,
        ApiResponse<Mst_BankDealer>
      >("/MstBankDealer/Search", {
        ...params,
      });
    },

    Mst_BankDealer_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_BankDealer>,
        ApiResponse<Mst_BankDealer>
      >("/MstBankDealer/GetAllActive");
    },

    Mst_BankDealer_GetByCode: async (
      BankCode: string,
    ): Promise<ApiResponse<Mst_BankDealer>> => {
      return await apiBase.post<string, ApiResponse<Mst_BankDealer>>(
        "/MstBankDealer/GetByCode",
        {
          BankCode: BankCode
        }
      );
    },

    Mst_BankDealer_Update: async (
      key: any,
      data: Partial<Mst_BankDealer>
    ): Promise<ApiResponse<Mst_BankDealer>> => {
      return await apiBase.post<
        Partial<Mst_BankDealer>,
        ApiResponse<Mst_BankDealer>
      >("/MstBankDealer/Update", {
        strJson: JSON.stringify({
          ...key,
          ...data,
        }),
        ColsUpd: Object.keys(data),
      });
    },

    Mst_BankDealer_Create: async (
      values: Partial<Mst_BankDealer>
    ): Promise<ApiResponse<Mst_BankDealer>> => {
      return await apiBase.post<
        Partial<Mst_BankDealer>,
        ApiResponse<Mst_BankDealer>
      >("/MstBankDealer/Create", {
        strJson: JSON.stringify({
          ...values
        }),
      });
    },

    Mst_BankDealer_Delete: async (BankCode: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_BankDealer>>(
        "/MstBankDealer/Delete",
        { ...BankCode }
      );
    },

    Mst_BankDealer_DeleteMultiple: async (key: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_BankDealer>>(
        "/MstBankDealer/DeleteMultiple",
        {
          strJson: JSON.stringify(
            key.map((BankCode) => ({
              BankCode: BankCode
            }))
          ),
        }
      );
    },
    Mst_BankDealer_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstBankDealer/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_BankDealer_ExportTemplate: async (

    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_BankDealer>, ApiResponse<string>>(
        "/MstBankDealer/ExportTemplate",
        {}
      );
    },

    Mst_BankDealer_Export:async (
    
    
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Mst_BankDealer>,
          ApiResponse<string>
        >("/MstBankDealer/Export", {
          FlagActive: "1"
        });
      }
    },

    Mst_BankDealer_ExportByListCode: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      let result = keys.reduce(
        (accumulator: any, currentValue: any) => {
          accumulator.ListBankCode.push(currentValue.BankCode);
          accumulator.ListDealerCode.push(currentValue.DealerCode);
          return accumulator;
        },
        {
          ListBankCode: [],
          ListDealerCode: [],
        }
      );
      result.ListBankCode= result.ListBankCode.join(",");
      result.ListDealerCode = result.ListDealerCode.join(",");
      {
        return await apiBase.post<Partial<Mst_BankDealer>, ApiResponse<string>>(
          "/MstBankDealer/ExportByListBankCode",
          {
            ListBankCode: result.ListBankCode,
            ListDealer: result.ListDealer,
          }
        );
      }
    },
  };
};
