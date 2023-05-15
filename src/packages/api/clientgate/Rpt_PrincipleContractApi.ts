import {
  ApiResponse,
  Rpt_PrincipleContract,
  SearchParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

export const useRpt_PrincipleContractApi = (apiBase: AxiosInstance) => {
  return {
    Rpt_PrincipleContract_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Rpt_PrincipleContract>> => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Rpt_PrincipleContract>
      >("/RptPrincipleContract/Search", {
        ...params,
      });
    },

    Rpt_PrincipleContract_GetByDealerCode: async () => {
      return await apiBase.post<
        Partial<Rpt_PrincipleContract>,
        ApiResponse<Rpt_PrincipleContract>
      >("/RptPrincipleContract/GetByDealerCode");
    },

    Rpt_PrincipleContract_GetByCode: async (
      ModelCode: string
    ): Promise<ApiResponse<Rpt_PrincipleContract>> => {
      return await apiBase.post<string, ApiResponse<Rpt_PrincipleContract>>(
        "/RptPrincipleContract/GetByCode",
        {
          ModelCode: ModelCode,
        }
      );
    },

    Rpt_PrincipleContract_Update: async (
      key: any,
      data: Partial<Rpt_PrincipleContract>
    ): Promise<ApiResponse<Rpt_PrincipleContract>> => {
      return await apiBase.post<
        Partial<Rpt_PrincipleContract>,
        ApiResponse<Rpt_PrincipleContract>
      >("/RptPrincipleContract/Update", {
        strJson: JSON.stringify({
          ...key,
          ...data,
        }),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    Rpt_PrincipleContract_Create: async (
      CarModel: Partial<Rpt_PrincipleContract>
    ): Promise<ApiResponse<Rpt_PrincipleContract>> => {
      return await apiBase.post<
        Partial<Rpt_PrincipleContract>,
        ApiResponse<Rpt_PrincipleContract>
      >("/RptPrincipleContract/Create", {
        strJson: JSON.stringify(CarModel),
      });
    },

    Rpt_PrincipleContract_Delete: async (CarModel: any) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Rpt_PrincipleContract>
      >("/RptPrincipleContract/Delete", { ...CarModel });
    },

    Rpt_PrincipleContract_DeleteMultiple: async (listCarModel: any[]) => {
      return await apiBase.post<
        SearchParam,
        ApiResponse<Rpt_PrincipleContract>
      >("/RptPrincipleContract/DeleteMultiple", {
        strJson: JSON.stringify(listCarModel),
      });
    },

    Rpt_PrincipleContract_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/RptPrincipleContract/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Rpt_PrincipleContract_ExportTemplate: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Rpt_PrincipleContract>,
        ApiResponse<string>
      >("/RptPrincipleContract/ExportTemplate", {});
    },

    Rpt_PrincipleContract_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Rpt_PrincipleContract>,
          ApiResponse<string>
        >("/RptPrincipleContract/Export", {
          KeyWord: keyword,
          FlagActive: "",
        });
      }
    },

    Rpt_PrincipleContract_ExportByListDealerCode: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Rpt_PrincipleContract>,
          ApiResponse<string>
        >("/RptPrincipleContract/ExportByListDealerCode", {
          ListDealerCode: keys.join(","),
        });
      }
    },
  };
};
