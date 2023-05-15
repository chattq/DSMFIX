import {
  AdminPage,
  Auto_MapVIN_DistributionSumRatePage,
  DealerManagementPage,
  Dlr_CAPage,
  Mng_QuotaPage,
  Mst_AmplitudeApprOrdPage,
  Mst_CabinCertificatePage,
  Mst_CostTypePage,
  Mst_CustomerBasePage, //
  Mst_DealerTypePage,
  Mst_DelayTransportsPage,
  Mst_DistrictPage,
  Mst_InsuranceCompanyPage,
  Mst_InsuranceFeePage,
  Mst_InsuranceTypePage,
  Mst_MinInventoryPage,
  Mst_MngRateTonKhoBanHangPage,
  Mst_PointRegisManagementPage,
  Mst_PortPage,
  Mst_PortTypePage,
  Mst_RegistrationInfoPage,
  Mst_StorageAreaRatePage,
  Mst_TransporterCarPage,
  Mst_TransporterPage,
  Mst_UnitPriceAVNPage,
  Mst_UnitPriceGPSPage,
  Mst_VINProductionYear_ActualPage,
  Mst_WarrantyExpiresPage,
  ProvinceManagementPage,
} from "@/pages";
import { Auto_MapVIN_StorageRatePage } from "@/pages/Auto_MapVIN_StorageRate/List/Auto_MapVIN_StorageRate";
import { Dlr_StorageLocalPage } from "@/pages/Dlr_StorageLocal/list/Dlr_StorageLocal";
import { Mst_AreaPage } from "@/pages/Mst_Area/list/Mst_Area";
// import { Mst_BankDealer_Page } from "@/pages/Mst_BankDealer/list/Mst_BankDealer";
import { Mst_CarCancelTypePage } from "@/pages/Mst_CarCancelType/list/Mst_CarCancelType";
import { Mst_CarInvoicePage } from "@/pages/Mst_CarInvoice/list/Mst_CarInvoice";
import { Mst_CarModelPage } from "@/pages/Mst_CarModel/list/Mst_CarModel";
import { Mst_CarOCNPage } from "@/pages/Mst_CarOCN/list/Mst_CarOCN";
// import { Mst_CarPrice_Page } from "@/pages/Mst_CarPrice/list/Mst_CarPrice";
import { Mst_CarSpecPage } from "@/pages/Mst_CarSpec";
import { Mst_CarStdOptPage } from "@/pages/Mst_CarStdOpt/list/Mst_CarStdOpt";
import { Mst_ContractUpdateTypePage } from "@/pages/Mst_ContractUpdateType/list/Mst_ContractUpdateType";
import { Mst_DealerSalesGroupTypePage } from "@/pages/Mst_DealerSalesGroupType/list/Mst_DealerSalesGroupType";
import { Mst_DealerSalesTypePage } from "@/pages/Mst_DealerSalesType/list/Mst_DealerSalesType";
// import { Mst_Department_Page } from "@/pages/Mst_Department/list/Mst_Department";
import { Mst_DiscountPage } from "@/pages/Mst_Discount/list/Mst_Discount";
import { Mst_PaymentTypePage } from "@/pages/Mst_PaymentType/list/Mst_PaymentType";
import { Mst_PlantPage } from "@/pages/Mst_Plant/list/Mst_Plant";
// import { Mst_Qualification_Page } from "@/pages/Mst_Qualification/list/Mst_Qualification";
import { Mst_RateApprOrderModelMaxPage } from "@/pages/Mst_RateApprOrderModelMax";
import { Mst_SalesOrderTypePage } from "@/pages/Mst_SalesOrderType/list/Mst_SalesOrderType";
import { Mst_StoragePage } from "@/pages/Mst_Storage/list/Mst_Storage";
import { Mst_StorageGlobalPage } from "@/pages/Mst_StorageGlobal/list/Mst_StorageGlobal";
import { Mst_TransporterDriverPage } from "@/pages/Mst_TransporterDriver/list/Mst_TransporterDriver";
import { Rpt_PrincipleContractPage } from "@/pages/Rpt_PrincipleContract/list/Rpt_PrincipleContract";
import { RouteItem } from "@/types";

export const adminRoutes: RouteItem[] = [
  {
    key: "admin",
    path: "admin",
    mainMenuTitle: "admin",
    mainMenuKey: "admin",
    getPageElement: () => <AdminPage />,
  },
  {
    key: "Mst_TransporterPage", // Quản lý đơn vị vận tải
    path: "admin/Mst_TransporterPage",
    subMenuTitle: "Mst_TransporterPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_TransporterPage />,
  },
  {
    key: "Mst_WarrantyExpiresPage", // Quản lý ngưỡng tồn kho bán hàng
    path: "admin/Mst_WarrantyExpiresPage",
    subMenuTitle: "Mst_WarrantyExpiresPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_WarrantyExpiresPage />,
  },
  {
    key: "Mst_MngRateTonKhoBanHangPage", // Quản lý ngưỡng tồn kho bán hàng
    path: "admin/Mst_MngRateTonKhoBanHangPage",
    subMenuTitle: "Mst_MngRateTonKhoBanHangPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_MngRateTonKhoBanHangPage />,
  },
  {
    key: "Mng_QuotaPage", // Quản lý danh sách Quota
    path: "admin/Mng_QuotaPage",
    subMenuTitle: "Mng_QuotaPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mng_QuotaPage />,
  },
  {
    key: "Mst_AmplitudeApprOrdPage", // Quản lý tỉ lệ đặt hàng theo kế hoạch
    path: "admin/Mst_AmplitudeApprOrdPage",
    subMenuTitle: "Mst_AmplitudeApprOrdPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_AmplitudeApprOrdPage />,
  },
  {
    key: "Auto_MapVIN_DistributionSumRatePage", // Thiết lập phân bổ map vin theo miền dựa trên tổng hàng có
    path: "admin/Auto_MapVIN_DistributionSumRatePage",
    subMenuTitle: "Auto_MapVIN_DistributionSumRatePage",
    mainMenuKey: "admin",
    getPageElement: () => <Auto_MapVIN_DistributionSumRatePage />,
  },
  {
    key: "Mst_RegistrationInfoPage", // Quản lý thông tin dữ liệu đăng kiểm, thị phần
    path: "admin/Mst_RegistrationInfoPage",
    subMenuTitle: "Mst_RegistrationInfoPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_RegistrationInfoPage />,
  },
  {
    key: "Mst_VINProductionYear_Actual", // Thiết lập năm sản xuất thực tế cho vin
    path: "admin/Mst_VINProductionYear_Actual",
    subMenuTitle: "Mst_VINProductionYear_Actual",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_VINProductionYear_ActualPage />,
  },
  {
    key: "Mst_MinInventoryPage", // Thiết lập kho tối thiểu
    path: "admin/Mst_MinInventoryPage",
    subMenuTitle: "Mst_MinInventoryPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_MinInventoryPage />,
  },
  {
    key: "Mst_StorageAreaRatePage", // Thiết lập phân bổ map vin theo kho khu vực
    path: "admin/Mst_StorageAreaRatePage",
    subMenuTitle: "Mst_StorageAreaRatePage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_StorageAreaRatePage />,
  },
  {
    key: "Mst_UnitPriceAVNPage", // Quản lý bảng giá AVN
    path: "admin/Mst_UnitPriceAVNPage",
    subMenuTitle: "Mst_UnitPriceAVNPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_UnitPriceAVNPage />,
  },
  {
    key: "Mst_CostTypePage", // Quản lý Loại chi phí
    path: "admin/Mst_CostTypePage",
    subMenuTitle: "Mst_CostTypePage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_CostTypePage />,
  },
  {
    key: "Mst_DelayTransportsPage", // Quản lý hạn mức độ trễ vận tải
    path: "admin/Mst_DelayTransportsPage",
    subMenuTitle: "Mst_DelayTransportsPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_DelayTransportsPage />,
  },
  {
    key: "Mst_InsuranceFeePage", // Quản lý tỉ lệ bảo hiểm
    path: "admin/Mst_InsuranceFeePage",
    subMenuTitle: "Mst_InsuranceFeePage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_InsuranceFeePage />,
  },
  {
    key: "Mst_InsuranceTypePage", // Quản lý loại hình bảo hiểm
    path: "admin/Mst_InsuranceTypePage",
    subMenuTitle: "Mst_InsuranceTypePage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_InsuranceTypePage />,
  },
  {
    key: "Mst_UnitPriceGPSPage", // quản lý đơn giá GPS
    path: "admin/Mst_UnitPriceGPSPage",
    subMenuTitle: "Mst_UnitPriceGPSPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_UnitPriceGPSPage />,
  },
  {
    key: "Mst_InsuranceCompanyPage", // quản lý hãng bảo hiểm
    path: "admin/Mst_InsuranceCompanyPage",
    subMenuTitle: "Mst_InsuranceCompanyPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_InsuranceCompanyPage />,
  },
  {
    key: "Mst_CabinCertificatePage", // quản lý giấy chứng nhận
    path: "admin/Mst_CabinCertificatePage",
    subMenuTitle: "Mst_CabinCertificatePage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_CabinCertificatePage />,
  },
  {
    key: "Mst_TransporterCarPage", // quản lý xe vận chuyển của đợn vị vận tải
    path: "admin/Mst_TransporterCarPage",
    subMenuTitle: "Mst_TransporterCarPage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_TransporterCarPage />,
  },
  {
    key: "Mst_CustomerBase", // quản lý nguồn khách hàng
    path: "admin/Mst_CustomerBase",
    subMenuTitle: "Mst_CustomerBase",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_CustomerBasePage />,
  },
  {
    key: "Dlr_CA", // Quản lý chữ ký điện tử
    path: "admin/Dlr_CA",
    subMenuTitle: "Dlr_CA",
    mainMenuKey: "admin",
    getPageElement: () => <Dlr_CAPage />,
  },
  {
    key: "Mst_District", // Quận Huyện
    path: "admin/Mst_District",
    subMenuTitle: "Mst_District",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_DistrictPage />,
  },
  {
    key: "Mst_DealerType", // Loại đại lý
    path: "admin/Mst_DealerType",
    subMenuTitle: "Mst_DealerType",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_DealerTypePage />,
  },
  {
    key: "Mst_PortPage", //
    path: "admin/Mst_Port",
    subMenuTitle: "Mst_Port",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_PortPage />,
  },
  {
    key: "Mst_PortType",
    path: "admin/Mst_PosrType",
    subMenuTitle: "Mst_PortType",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_PortTypePage />,
  },
  {
    key: "dealerManagement",
    path: "admin/dealer",
    subMenuTitle: "dealerManagement",
    mainMenuKey: "admin",
    getPageElement: () => <DealerManagementPage />,
  },
  {
    key: "provinceManagement",
    path: "admin/province",
    subMenuTitle: "provinceManagement",
    mainMenuKey: "admin",
    getPageElement: () => <ProvinceManagementPage />,
  },
  {
    key: "provinceManagement",
    path: "admin/province/:provinceId",
    subMenuTitle: "",
    mainMenuKey: "admin",
    getPageElement: () => <ProvinceManagementPage />,
  },
  {
    key: "districtManagement",
    path: "admin/district",
    subMenuTitle: "districtManagement",
    mainMenuKey: "admin",
    getPageElement: () => <DealerManagementPage />,
  },
  {
    key: "Mst_Area",
    path: "admin/Mst_Area",
    subMenuTitle: "Mst_Area",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_AreaPage />,
  },
  {
    key: "Mst_SalesOrderType",
    path: "admin/Mst_SalesOrderType",
    subMenuTitle: "Mst_SalesOrderType",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_SalesOrderTypePage />,
  },
  {
    key: "Mst_Storage",
    path: "admin/Mst_Storage",
    subMenuTitle: "Mst_Storage",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_StoragePage />,
  },
  {
    key: "Mst_PaymentType",
    path: "admin/Mst_PaymentType",
    subMenuTitle: "Mst_PaymentType",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_PaymentTypePage />,
  },
  {
    key: "Mst_CarCancelType",
    path: "admin/Mst_CarCancelType",
    subMenuTitle: "Mst_CarCancelType",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_CarCancelTypePage />,
  },
  {
    key: "Mst_Plant",
    path: "admin/Mst_Plant",
    subMenuTitle: "Mst_Plant",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_PlantPage />,
  },
  {
    key: "Mst_CarInvoice",
    path: "admin/Mst_CarInvoice",
    subMenuTitle: "Mst_CarInvoice",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_CarInvoicePage />,
  },

  {
    key: "Mst_DealerSalesGroupType",
    path: "admin/Mst_DealerSalesGroupType",
    subMenuTitle: "Mst_DealerSalesGroupType",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_DealerSalesGroupTypePage />,
  },
  {
    key: "Mst_DealerSalesType",
    path: "admin/Mst_DealerSalesType",
    subMenuTitle: "Mst_DealerSalesType",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_DealerSalesTypePage />,
  },
  {
    key: "Mst_Discount",
    path: "admin/Mst_Discount",
    subMenuTitle: "Mst_Discount",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_DiscountPage />,
  },
  {
    key: "Mst_TransporterDriver",
    path: "admin/Mst_TransporterDriver",
    subMenuTitle: "Mst_TransporterDriver",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_TransporterDriverPage />,
  },
  {
    key: "Mst_CarModel",
    path: "admin/Mst_CarModel",
    subMenuTitle: "Mst_CarModel",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_CarModelPage />,
  },
  {
    key: "Mst_CarOCN",
    path: "admin/Mst_CarOCN",
    subMenuTitle: "Mst_CarOCN",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_CarOCNPage />,
  },
  {
    key: "Rpt_PrincipleContract",
    path: "admin/Rpt_PrincipleContract",
    subMenuTitle: "Rpt_PrincipleContract",
    mainMenuKey: "admin",
    getPageElement: () => <Rpt_PrincipleContractPage />,
  },
  {
    key: "Mst_StorageGlobal",
    path: "admin/Mst_StorageGlobal",
    subMenuTitle: "Mst_StorageGlobal",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_StorageGlobalPage />,
  },
  {
    key: "Mst_ContractUpdateType",
    path: "admin/Mst_ContractUpdateType",
    subMenuTitle: "Mst_ContractUpdateType",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_ContractUpdateTypePage />,
  },
  {
    key: "Dlr_StorageLocal",
    path: "admin/Dlr_StorageLocal",
    subMenuTitle: "Dlr_StorageLocal",
    mainMenuKey: "admin",
    getPageElement: () => <Dlr_StorageLocalPage />,
  },
  {
    key: "Auto_MapVIN_StorageRate",
    path: "admin/Auto_MapVIN_StorageRate",
    subMenuTitle: "Auto_MapVIN_StorageRate",
    mainMenuKey: "admin",
    getPageElement: () => <Auto_MapVIN_StorageRatePage />,
  },
  {
    key: "Mst_CarSpec",
    path: "admin/Mst_CarSpec",
    subMenuTitle: "Mst_CarSpec",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_CarSpecPage />,
  },
  {
    key: "Mst_CarStdOpt",
    path: "admin/Mst_CarStdOpt",
    subMenuTitle: "Mst_CarStdOpt",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_CarStdOptPage />,
  },
  {
    key: "Mst_RateApprOrderModelMax",
    path: "admin/Mst_RateApprOrderModelMax",
    subMenuTitle: "Mst_RateApprOrderModelMax",
    mainMenuKey: "admin",
    getPageElement: () => <Mst_RateApprOrderModelMaxPage />,
  },
  {
    key: "invoiceTypeManagement",
    path: "admin/invoiceType",
    subMenuTitle: "invoiceTypeManagement",
    mainMenuKey: "admin",
    getPageElement: () => <DealerManagementPage />,
  },
  {
    key: "Mst_PointRegisManagement", // Key menu con
    path: "admin/Mst_PointRegis", // Address trên browser
    subMenuTitle: "Mst_PointRegisManagement", // Title menu con
    permissions: "",
    mainMenuKey: "admin", // Key của menu cha
    getPageElement: () => <Mst_PointRegisManagementPage />,
  },
  // {
  //   key: "Mst_CarPrice", // Quản lý giá xe
  //   path: "admin/Mst_CarPrice",
  //   subMenuTitle: "Mst_CarPrice",
  //   mainMenuKey: "admin",
  //   getPageElement: () => <Mst_CarPrice_Page />,
  // },
  // {
  //   key: "Mst_BankDealer", // Quản lý ngân hàng đại lý
  //   path: "admin/Mst_BankDealer",
  //   subMenuTitle: "Mst_BankDealer",
  //   mainMenuKey: "admin",
  //   getPageElement: () => <Mst_BankDealer_Page />,
  // },
  // {
  //   key: "Mst_Department", // Quản lý phòng ban
  //   path: "admin/Mst_Department",
  //   subMenuTitle: "Mst_Department",
  //   mainMenuKey: "admin",
  //   getPageElement: () => <Mst_Department_Page />,
  // },
  // {
  //   key: "Mst_Qualification", // Quản lý trình độ chuyên môn
  //   path: "admin/Mst_Qualification",
  //   subMenuTitle: "Mst_Qualification",
  //   mainMenuKey: "admin",
  //   getPageElement: () => <Mst_Qualification_Page />,
  // },
];
