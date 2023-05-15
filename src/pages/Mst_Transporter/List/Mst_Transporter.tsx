import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { requiredType } from "@/packages/common/Validation_Rules";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import {
  FlagActiveEnum,
  Mst_Transporter,
  Search_Mst_Transporter,
} from "@/packages/types";
import { ColumnOptions, GridViewPopup } from "@/packages/ui/base-gridview";
import { StatusButton } from "@/packages/ui/status-button";
import { selecteItemsAtom } from "@/pages/Mst_Transporter/components/store";
import { useQuery } from "@tanstack/react-query";
import { IFormOptions } from "devextreme-react/form";
import { IPopupOptions } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import React, { useRef, useState } from "react";
import HeaderPart from "../components/header-part";
import { SearchPanel } from "../components/SearchPanel";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { LinkCell } from "@/pages/Mst_Transporter/components/link-cell";
import { usePopupView } from "../components";
import { toast } from "react-toastify";
import { filterByFlagActive, uniqueFilterByDataField } from "@/packages/common";
import { LoadPanel } from "devextreme-react";
export const Mst_TransporterPage = () => {
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom); // state lưu trữ trạng thái đóng mở của nav search
  const setSelectedItems = useSetAtom(selecteItemsAtom); // state lưu trữ thông tin của items khi mà click radio
  let gridRef: any = useRef(); // thẻ
  const { t } = useI18n("Mst_Transporter"); // file biên dịch
  const config = useConfiguration();
  const showError = useSetAtom(showErrorAtom); // state lưu trữ lỗi khi call api
  const loadingControl = useVisibilityControl({defaultVisible: false})
  const [searchCondition] = useState<Partial<Search_Mst_Transporter>>({
    // state deafult của search
    TransporterCode: "",
    TransporterName: "",
    FlagActive: FlagActiveEnum.All, // FlagActiveEnum.All = ""
    Ft_PageIndex: 0,
    Ft_PageSize: config.MAX_PAGE_ITEMS, // config.MAX_PAGE_ITEMS = 999999
    KeyWord: "",
  });
  const api = useClientgateApi(); // api
  const { data, isLoading, refetch } = useQuery(
    // call api search
    ["Mst_Transporter", JSON.stringify(searchCondition)],
    () => {
      return api.Mst_Transporter__Search({ ...searchCondition });
    }
  );

  // các cột của gridview
  const columns: ColumnOptions[] = [
    {
      dataField: "TransporterCode", // Mã ĐVVT
      caption: t("TransporterCode"), // title hiển thị ở màn hình
      editorType: "dxTextBox", // kiểu của column ( trong trường hợp này là input )
      columnIndex: 1, // vị trí cột được hiển thị trong popup ở theo hàng dọc
      validationRules: [requiredType], // validate
      cellRender: ({ data, rowIndex, value }: any) => {
        // customize lại cột
        return <LinkCell rowIndex={rowIndex} value={value} rowData={data} />;
      },
      headerFilter: {
        // hiển thị headerFilter dữ liệu của cột đó theo tiêu chuẩn nào đó
        dataSource: uniqueFilterByDataField(data?.DataList, "TransporterCode"),
      },
    },
    {
      dataField: "TransporterName", // tên ĐVVT
      caption: t("TransporterName"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 1,
      validationRules: [requiredType],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data?.DataList, "TransporterName"),
      },
    },
    {
      dataField: "TransportContractNo", // Số hợp đồng
      caption: t("TransportContractNo"),
      editorType: "dxTextBox",
      editorOptions: {},
      validationRules: [requiredType],
      columnIndex: 1,
      // login cái hàm này là dùng đếm các phần tử trùng nhau mà data trả về sau khi call api với dữ liệu trường trong tên (param) truyền vào
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "TransportContractNo",
          t("( Empty )")
        ),
      },
    },
    {
      dataField: "Address", // Địa chỉ
      caption: t("Address"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 1,
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "Address",
          t("( Empty )")
        ),
      },
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "PhoneNo",
          t("( Empty )")
        ),
      },
      dataField: "PhoneNo", // Số điện thoại
      caption: t("PhoneNo"),
      editorType: "dxNumberBox",
      editorOptions: {},
      columnIndex: 1,
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "FaxNo",
          t("( Empty )")
        ),
      },
      dataField: "FaxNo", // Số Fax
      caption: t("FaxNo"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 1,
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "DirectorFullName",
          t("( Empty )")
        ),
      },
      dataField: "DirectorFullName", // Tên giám đốc
      caption: t("DirectorFullName"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 2,
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "DirectorPhoneNo",
          t("( Empty )")
        ),
      },
      dataField: "DirectorPhoneNo", // Số điện thoại giám đốc
      caption: t("DirectorPhoneNo"),
      editorType: "dxNumberBox",
      editorOptions: {},
      columnIndex: 2,
    },
    {
      dataField: "ContactorFullName", // Tên người đại diện
      caption: t("ContactorFullName"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 2,
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "ContactorFullName",
          t("( Empty )")
        ),
      },
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "ContactorPhoneNo",
          t("( Empty )")
        ),
      },
      dataField: "ContactorPhoneNo", // Số điện thoại đại diện
      caption: t("ContactorPhoneNo"),
      editorType: "dxNumberBox",
      editorOptions: {},
      columnIndex: 2,
    },
    {
      headerFilter: {
        dataSource: uniqueFilterByDataField(
          data?.DataList,
          "Remark",
          t("( Empty )")
        ),
      },
      dataField: "Remark", // Số điện thoại đại diện
      caption: t("Remark"),
      editorType: "dxTextBox",
      editorOptions: {},
      columnIndex: 2,
    },
    {
      headerFilter: {
        dataSource: filterByFlagActive(data?.DataList, {
          true: t("Active"),
          false: t("Inactive"),
        }),
      },
      dataField: "FlagActive", // trạng thái
      caption: t("FlagActive"),
      editorType: "dxSwitch",
      columnIndex: 2,
      visible: true,
      alignment: "center",
      width: 120,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
  ];

  // formart các cột của popup
  const formSettings: IFormOptions = {
    colCount: 1,
    labelLocation: "left",
    items: [
      {
        itemType: "group",
        caption: t("Basic Information"),
        colCount: 2,
        cssClass: "collapsible form-group",
        items: columns,
      },
    ],
  };

  // hàm thêm cột ở trong trường hợp popup thì là mở popup
  const handleAddNew = () => {
    gridRef.current?.instance?.addRow();
  };

  // hàm chuyển đổi trang thái từ detail sang edit
  const handleSubmit = () => {
    gridRef.current?.instance?.saveEditData();
  };

  // đóng popup
  const handleCancel = () => {
    gridRef.current?.instance?.cancelEditData();
  };

  // hàm delete
  const onDelete = async (id: Partial<Mst_Transporter>) => {
    const resp = await api.Mst_Transporter_Delete(id);
    if (resp.isSuccess) {
      toast.success(t("Delete Successfully"));
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
    throw new Error(resp.errorCode);
  };

  // call api tạo
  const onCreate = async (data: Partial<Mst_Transporter>) => {
    const resp = await api.Mst_Transporter_Create({
      ...data,
    });
    if (resp.isSuccess) {
      toast.success(t("Create Successfully"));
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
    throw new Error(resp.errorCode);
  };

  // call api delete multiple
  const handleDeleteRow = async (a: any) => {
    const resp = await api.Mst_Transporter_DeleteMultiple(a);
    if (resp.isSuccess) {
      toast.success(t("Delete Successfully"));
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
  };

  // call api update
  const onModify = async (key: string, data: Partial<Mst_Transporter>) => {
    console.log("key ", key, "data ", data);
    const resp = await api.Mst_Transporter_Update(key, {
      ...data,
    });
    if (resp.isSuccess) {
      toast.success(t("Update Successfully"));
      await refetch();
      return true;
    }
    showError({
      message: t(resp.errorCode),
      debugInfo: resp.debugInfo,
      errorInfo: resp.errorInfo,
    });
    throw new Error(resp.errorCode);
  };

  // Thực thi action thêm sửa xóa
  const handleSavingRow = (e: any) => {
    if (e.changes && e.changes.length > 0) {
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        const data = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onModify(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  // setting popup
  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: "Mst_Transporter",
    toolbarItems: [
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: t("Save"),
          stylingMode: "contained",
          type: "default",
          onClick: handleSubmit,
        },
      },
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: t("Cancel"),
          type: "default",
          onClick: handleCancel,
        },
      },
    ],
  };

  // re-render api search
  const handleSearch = async () => {
    await refetch();
  };

  // popup detail
  const { PopupView } = usePopupView({ formSettings });

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    if (e.dataField! === "TransporterCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleSelectionChanged = (rows: string[]) => {
    setSelectedItems(rows);
  };

  // action đóng mở nav search (show or not show)
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  // hàm sửa row ( mở popup )
  const handleEdit = (rowIndex: number) => {
    gridRef.current?.instance?.editRow(rowIndex);
  };

  return (
    <AdminContentLayout className={"Mst_Transporter"}>
      {/* Header */}
      <AdminContentLayout.Slot name={"Header"}>
        {/* có tác dụng là tạo dữ liệu vào trong data và thực thi các action nhự import excel , export excel*/}
        <HeaderPart onAddNew={handleAddNew}></HeaderPart>
      </AdminContentLayout.Slot>
      {/* Content */}
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          {/* Search */}
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[200px]"}>
              {/* Search Component */}
              <SearchPanel data={searchCondition} onSearch={handleSearch} />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
          <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={'center'}
              visible={loadingControl.visible}
              showIndicator={true}
              showPane={true}
            />
            
            {/* GridView */}
            {!loadingControl.visible && ( <><GridViewPopup
              isLoading={isLoading} // props dùng để render
              dataSource={data?.isSuccess ? data.DataList ?? [] : []} // dữ liệu của gridview lấy từ api
              columns={columns} // các cột ở trong grid view
              keyExpr={["TransporterCode", "TransporterName"]} // khóa chính
              popupSettings={popupSettings} // popup editor
              formSettings={formSettings} // các cột ở trong popup
              onReady={(ref) => (gridRef = ref)} // gắn ref
              allowSelection={true} //cho phép chọn row hay không
              onSelectionChanged={handleSelectionChanged} // dùng để lấy hàng khi tích chọn checkbox
              onSaveRow={handleSavingRow} // thực hiện các action thêm sửa xóa
              onEditorPreparing={handleEditorPreparing} // thực hiện hành động trước khi show màn hình thêm sửa xóa
              onDeleteRows={handleDeleteRow} // hàm này để xóa multiple (  )
              toolbarItems={[
                //  button search và action của nó
                {
                  location: "before",
                  widget: "dxButton",
                  options: {
                    icon: "search",
                    onClick: handleToggleSearchPanel,
                  },
                },
              ]}
              storeKey={"Mst_Transporter_Column"} // key lưu trữ giá trị grid view trong localstorage
            />
            {/* popup */}
            <PopupView handleCancel={handleCancel} handleEdit={handleEdit} /></> )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
