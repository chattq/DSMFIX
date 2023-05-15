import { HeaderForm } from "@packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";
import { showErrorAtom } from "@packages/store";
import { useClientgateApi } from "@packages/api";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";

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

  console.log("selectedItems ", selectedItems);

  const handleExportExcel = async (selectedOnly: boolean) => {
    const resp = await api.Mst_District_ExportExcel(
      selectedItems,
      keyword || ""
    );
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
