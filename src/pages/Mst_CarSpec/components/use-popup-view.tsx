import { useI18n } from "@/i18n/useI18n";
import { GroupField } from "@packages/ui/group-field";
import Form, { GroupItem, IFormOptions } from "devextreme-react/form";
import { Popup } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { viewingDataAtom } from "./Mst_CarSpecStore";

interface UsePopupViewProps {
  formSettings: IFormOptions;
}

export interface PopupViewProps {
  visible?: boolean;
  handleCancel: () => void;
  handleEdit: (rowIndex: number) => void;
}

export const usePopupView = ({ formSettings }: UsePopupViewProps) => {
  const PopupView = ({ visible, handleCancel, handleEdit }: PopupViewProps) => {
    const [viewingItem, setViewingItem] = useAtom(viewingDataAtom);
    const { t } = useI18n("Common");

    useEffect(() => {}, [viewingItem]);
    const innerHandleCancel = () => {
      setViewingItem(undefined);
      handleCancel();
    };
    const innerHandleEdit = () => {
      if (!!viewingItem && viewingItem.rowIndex !== undefined) {
        const rowIndex = viewingItem.rowIndex;
        setViewingItem(undefined);
        handleEdit(rowIndex);
      }
    };
    return (
      <Popup
        visible={!!viewingItem.item}
        showTitle={true}
        title={t("Mst_CarSpec Detail")}
        toolbarItems={[
          {
            toolbar: "bottom",
            location: "after",
            widget: "dxButton",
            options: {
              text: t("Edit"),
              stylingMode: "contained",
              type: "default",
              onClick: innerHandleEdit,
            },
          },
          {
            toolbar: "bottom",
            location: "after",
            widget: "dxButton",
            options: {
              text: t("Cancel"),
              type: "default",
              onClick: innerHandleCancel,
            },
          },
        ]}
      >
        <ScrollView>
          <Form
            className={"p-4"}
            id={"view-form"}
            formData={viewingItem.item}
            readOnly={true}
          >
            {formSettings.items?.map((item) => {
              return (
                <GroupItem
                  key={nanoid()}
                  render={({ formData, component }) => {
                    return (
                      <GroupField item={item} formData={viewingItem.item} />
                    );
                  }}
                />
              );
            })}
          </Form>
        </ScrollView>
      </Popup>
    );
  };
  return {
    PopupView,
  };
};
