import { useI18n } from "@/i18n/useI18n";
import {
  searchParams,
  selectedItemsAtom,
} from "@/pages/Mst_CarSpec/components/Mst_CarSpecStore";
import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { useExportExcel } from "@packages/ui/export-excel/use-export-excel";
import { useUploadFile } from "@packages/ui/upload-file/use-upload-file";
import Button from "devextreme-react/button";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import notify from "devextreme/ui/notify";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { match } from "ts-pattern";

interface HeaderPartProps {
  onAddNew: () => void;
}
export const HeaderPart = ({ onAddNew }: HeaderPartProps) => {
  const { t } = useI18n("Mst_CarSpec");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);
  const searchParamsAtomValue = useAtomValue(searchParams);

  const onDownloadTemplate = async () => {
    const resp = await api.Mst_CarSpec_ExportTemplate();
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

  const handleUploadFiles = async (files: File[]) => {
    const resp = await api.Mst_Dealer_Import(files[0]);
    console.log("result:", resp);
    if (resp.isSuccess) {
      notify(t("Upload Successfully"), "success");
    } else {
      notify(t(resp.Data._strErrCode), {
        position: {
          top: 0,
        },
        direction: "down-push",
      });
    }
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    const result = selectedItems.map((item: any) => item.SpecCode).join(",");

    let resp = await match(selectedOnly)
      .with(true, async () => {
        return await api.Mst_CarSpec_ExportByListCode(result);
      })
      .otherwise(async () => {
        return await api.Mst_CarSpec_Export(searchParamsAtomValue);
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

  const { uploadButton, uploadDialog } = useUploadFile({
    handleUploadFiles,
    onDownloadTemplate,
    buttonClassName: "w-full",
  });
  const { exportButton, exportDialog } = useExportExcel({
    buttonClassName: "w-full",
    selectedItems,
    onExportExcel: handleExportExcel,
  });

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">{t("Mst_CarSpec")}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          icon="/images/icons/plus-circle.svg"
          stylingMode={"contained"}
          type="default"
          text={t("Add New")}
          onClick={onAddNew}
        />
        <DropDownButton
          showArrowIcon={false}
          keyExpr={"id"}
          className="menu-items"
          displayExpr={"text"}
          wrapItemText={false}
          dropDownOptions={{
            width: 200,
            wrapperAttr: {
              class: "headerform__menuitems",
            },
          }}
          icon="/images/icons/more.svg"
        >
          <DropDownButtonItem
            render={(item: any) => {
              return <div>{uploadButton}</div>;
            }}
          />
          <DropDownButtonItem
            render={(item: any) => {
              return <div>{exportButton}</div>;
            }}
          />
        </DropDownButton>

        {uploadDialog}
        {exportDialog}
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
