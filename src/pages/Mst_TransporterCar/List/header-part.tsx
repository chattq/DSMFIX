import { HeaderForm } from "@packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import { keywordAtom, selecteItemsAtom } from "../components/screen-atom";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";
import { showErrorAtom } from "@packages/store";
import { useClientgateApi } from "@packages/api";

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

  const selectedItems = useAtomValue(selecteItemsAtom);
  const keyword = useAtomValue(keywordAtom);
  const setKeyword = useSetAtom(keywordAtom);
  console.log("setKeyword ", setKeyword);
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const handleSearch = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    const resp = await api.Mst_TransporterCar_ExportExcel(selectedItems, keyword || "");
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
