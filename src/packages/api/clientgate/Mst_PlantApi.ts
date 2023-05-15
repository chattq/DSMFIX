import { ApiResponse, Mst_Plant, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_PlantApi = (apiBase: AxiosInstance) => {
  return {
    Mst_Plant_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_Plant>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Plant>>(
        "/MstPlant/Search",
        {
          ...params,
        }
      );
    },
    Mst_Plant_GetByPlant: async (
      PlantCode: string
    ): Promise<ApiResponse<Mst_Plant>> => {
      return await apiBase.post<string, ApiResponse<Mst_Plant>>(
        "/MstPlant/GetByPlant",
        {
          PlantCode: PlantCode,
        }
      );
    },

    Mst_Plant_Update: async (
      key: string,
      data: Partial<Mst_Plant>
    ): Promise<ApiResponse<Mst_Plant>> => {
      return await apiBase.post<Partial<Mst_Plant>, ApiResponse<Mst_Plant>>(
        "/MstPlant/Update",
        {
          strJson: JSON.stringify({
            PlantCode: key,
            ...data,
          }),
          ColsUpd: Object.keys(data).join(","),
        }
      );
    },

    Mst_Plant_Create: async (
      Plant: Partial<Mst_Plant>
    ): Promise<ApiResponse<Mst_Plant>> => {
      return await apiBase.post<Partial<Mst_Plant>, ApiResponse<Mst_Plant>>(
        "/MstPlant/Create",
        {
          strJson: JSON.stringify(Plant),
        }
      );
    },

    Mst_Plant_Delete: async (PlantCode: string) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Plant>>(
        "/MstPlant/Delete",
        {
          PlantCode: PlantCode,
        }
      );
    },

    Mst_Plant_DeleteMultiple: async (listPlant: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Plant>>(
        "/MstPlant/DeleteMultiple",
        {
          strJson: JSON.stringify(listPlant),
        }
      );
    },

    Mst_Plant_ImportExcel: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstPlant/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Mst_Plant_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_Plant>, ApiResponse<string>>(
        "/MstPlant/ExportTemplate",
        {}
      );
    },

    Mst_Plant_ExportExcel: async (
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<Partial<Mst_Plant>, ApiResponse<string>>(
          "/MstPlant/Export",
          {
            KeyWord: keyword,
            FlagActive: "",
          }
        );
      }
    },

    Mst_Plant_ExportByListPlantCode: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_Plant>, ApiResponse<string>>(
        "/MstPlant/ExportByListPlantCode",
        {
          ListPlantCode: keys.join(","),
        }
      );
    },
  };
};
