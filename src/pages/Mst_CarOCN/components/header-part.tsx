import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { HeaderForm } from "@packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { keywordAtom, selectedItemsAtom } from "./Mst_CarOCNStore";

interface HeaderPartProps {
  onAddNew?: () => void;
  onUploadFile?: (file: File, progressCallback?: Function) => void;
  onDownloadTemplate: () => void;
}

export const HeaderPart = ({
  onUploadFile,
  onDownloadTemplate,
  onAddNew,
}: HeaderPartProps) => {
  const { t } = useI18n("Common");

  const selectedItems = useAtomValue(selectedItemsAtom);
  const keyword = useAtomValue(keywordAtom);
  const setKeyword = useSetAtom(keywordAtom);
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const handleSearch = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    const objArr = selectedItems.reduce(
      (acc: any, { ModelCode, OCNCode }: any) => {
        if (!acc.ListModelCode.includes(ModelCode)) {
          acc.ListModelCode.push(ModelCode);
        }
        acc.ListOCNCode.push(OCNCode);
        return acc;
      },
      { ListModelCode: [], ListOCNCode: [] }
    );

    const result = {
      ListModelCode: objArr.ListModelCode.toString().replace(/\s/g, ""),
      ListOCNCode: objArr.ListOCNCode.toString().replace(/\s/g, ""),
    };

    let resp = await match(selectedOnly)
      .with(true, async () => {
        return await api.Mst_CarOCN_ExportByListCode(result);
      })
      .otherwise(async () => {
        return await api.Mst_CarOCN_ExportExcel(keyword);
      });
    if (resp.isSuccess) {
      toast.success(t("Download Successfully"));
      window.location.href = resp.Data;
    } else {
      showError({
        message: t(resp.errorCode),
        debugInfo: resp.debugInfo,
        errorInfo: resp.errorInfo,
      });
    }
  };

  return (
    <HeaderForm
      onSearch={handleSearch}
      onAddNew={onAddNew}
      onUploadFile={onUploadFile}
      onExportExcel={handleExportExcel}
      onDownloadTemplate={onDownloadTemplate}
      selectedItems={selectedItems}
    />
  );
};
