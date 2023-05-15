import {
  ApiResponse,
  CGResponse,
  Mst_PointRegis,
  SearchParam,
} from "@/packages/types";
import { AxiosInstance } from "axios";

const desiredValue = (arr: any[], desired_key: string) => {
  let desiredValue = arr.map((element) => element[desired_key]);
  return desiredValue;
};
const desiredDistinctValue = (arr: any[], desired_key: string) => {
  let desiredValue = arr
    .map((element) => element[desired_key])
    .filter((value, index, self) => self.indexOf(value) === index);
  return desiredValue;
};

const arrayUniqueByKey = (arr: any[], desired_key: string) => {
  const desiredValue = Array.from(
    new Map(arr.map((item) => [item[desired_key], item])).values()
  );
  return desiredValue;
};

export const useMst_PointRegisApi = (apiBase: AxiosInstance) => {
  return {
    Mst_PointRegis_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_PointRegis>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_PointRegis>>(
        "/MstPointRegis/Search",
        {
          ...params,
        }
      );
    },
    Mst_PointRegis_Create: async (
      Mst_PointRegis: Partial<Mst_PointRegis>
    ): Promise<ApiResponse<Mst_PointRegis>> => {
      return await apiBase.post<
        Partial<Mst_PointRegis>,
        ApiResponse<Mst_PointRegis>
      >("/MstPointRegis/Create", {
        strJson: JSON.stringify(Mst_PointRegis),
      });
    },

    Mst_PointRegis_Delete: async (objMst_PointRegis: Mst_PointRegis) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_PointRegis>>(
        "/MstPointRegis/Delete",
        {
          PointRegisCode: objMst_PointRegis.PointRegisCode,
          DealerCode: objMst_PointRegis.DealerCode,
        }
      );
    },
    Mst_PointRegis_DeleteMultiple: async (listPointRegisCode: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_PointRegis>>(
        "/MstPointRegis/DeleteMultiple",
        {
          strJson: JSON.stringify(listPointRegisCode),
        }
      );
    },

    Mst_PointRegis_Update: async (
      objMst_PointRegis: Mst_PointRegis,
      Mst_PointRegis: Partial<Mst_PointRegis>
    ): Promise<ApiResponse<Mst_PointRegis>> => {
      const strJson = JSON.stringify({
        PointRegisCode: objMst_PointRegis.PointRegisCode,
        DealerCode: objMst_PointRegis.DealerCode,
        ...Mst_PointRegis,
      });
      const ColsUpd = Object.keys(Mst_PointRegis);
      console.log("strJson: ", strJson);
      console.log("ColsUpd: ", ColsUpd);

      return await apiBase.post<
        Partial<Mst_PointRegis>,
        ApiResponse<Mst_PointRegis>
      >("/MstPointRegis/Update", {
        strJson: JSON.stringify({
          PointRegisCode: objMst_PointRegis.PointRegisCode,
          DealerCode: objMst_PointRegis.DealerCode,
          ...Mst_PointRegis,
        }),
        ColsUpd: Object.keys(Mst_PointRegis),
      });
    },
    Mst_PointRegis_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstPointRegis/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_PointRegis_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_PointRegis>, ApiResponse<string>>(
        "/MstPointRegis/ExportTemplate",
        {}
      );
    },

    Mst_PointRegis_ExportExcel: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        if (keys.length > 0) {
          const listPointRegisCode = desiredValue(keys, "PointRegisCode").join(
            ","
          );
          const listDealerCode = desiredDistinctValue(keys, "DealerCode").join(
            ","
          );
          return await apiBase.post<
            Partial<Mst_PointRegis>,
            ApiResponse<string>
          >("/MstPointRegis/ExportByListPointRegisCode", {
            ListPointRegisCode: listPointRegisCode,
            ListDealerCode: listDealerCode,
          });
        } else {
          return await apiBase.post<
            Partial<Mst_PointRegis>,
            ApiResponse<string>
          >("/MstPointRegis/Export", {
            KeyWord: keyword,
            FlagActive: "",
          });
        }
      }
    },
  };
};
