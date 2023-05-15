export interface ClientGateInfo {
  SolutionCode: string;
  NetworkID: string;
  NetworkName: string;
  GroupNetworkID: string;
  CoreAddr: string | null;
  PingAddr: string | null;
  XSysAddr: string | null;
  WSUrlAddr: string;
  WSUrlAddrLAN: string;
  DBUrlAddr: string | null;
  DefaultVersion: string;
  MinVersion: string;
  FlagActive: string;
  LogLUDTime: string;
  LogLUBy: string;
}

export interface ClientGateInfoResponse {
  Data: {
    _strTId: string;
    _strAppTId: string;
    _objTTime: string;
    _strType: string;
    _strErrCode: string;
    _objResult?: ClientGateInfo[];
    _excResult: any;
    _dicDebugInfo: {
      strTid: string;
      strAppTId: string;
      "dataInput.SolutionCode": string;
      "dataInput.NetworkIDSearch": string;
    };
  };
}

export interface Mst_Dealer {
  DealerCode: string;
  DealerType: string;
  ProvinceCode: string;
  BUCode: string;
  BUPattern: string;
  DealerName: string;
  FlagDirect: string;
  FlagActive: string;
  DealerScale: string;
  DealerPhoneNo: string;
  DealerFaxNo: string;
  CompanyName: string;
  CompanyAddress: string;
  ShowroomAddress: string;
  GarageAddress: string | null;
  GaragePhoneNo: string | null;
  GarageFaxNo: string | null;
  DirectorName: string | null;
  DirectorPhoneNo: string | null;
  DirectorEmail: string | null;
  SalesManagerName: string | null;
  SalesManagerPhoneNo: string | null;
  SalesManagerEmail: string;
  GarageManagerName: string | null;
  GarageManagerPhoneNo: string | null;
  GarageManagerEmail: string | null;
  TaxCode: string;
  ContactName: string;
  Signer: string | null;
  SignerPosition: string | null;
  CtrNoSigner: string | null;
  CtrNoSignerPosition: string | null;
  HTCStaffInCharge: string | null;
  Remark: string;
  DealerAddress01: string | null;
  DealerAddress02: string | null;
  DealerAddress03: string | null;
  DealerAddress04: string | null;
  DealerAddress05: string | null;
  FlagTCG: string;
  FlagAutoLXX: string;
  FlagAutoMapVIN: string;
  FlagAutoSOAppr: string;
}

export interface Mst_TransporterCar {
  TransporterCode: string;
  PlateNo: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_UnitPriceAVN {
  AVNCode: string;
  EffDateTime: string;
  UnitPriceAVN: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_Transporter {
  TransporterCode: string;
  TransporterName: string;
  FlagActive: number;
  TransportContractNo: string;
  Address: string;
  PhoneNo: string;
  FaxNo: string;
  DirectorFullName: string;
  DirectorPhoneNo: string;
  ContactorFullName: string;
  ContactorPhoneNo: string;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Auto_MapVIN_StorageRate {
  StorageCode: string;
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  ColorExtCode: string;
  ColorExtNameVN: string;
  MBTVal: string;
  MBVal: string;
  MTVal: string;
  MNVal: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_DelayTransports {
  StorageCode: string;
  StorageName: string;
  DealerCode: string;
  DealerName: string;
  DelayTransport: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_InsuranceType {
  InsCompanyCode: string;
  InsTypeCode: string;
  EffectiveDate: string;
  InsTypeName: string;
  Rate: string;
  FlagActive: number;
  Remark: string;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_UnitPriceGPS {
  ContractNo: string;
  UnitPrice: string;
  EffStartDate: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_InsuranceFee {
  InsuranceContractNo: string;
  InsurancePercent: string;
  EffStartDate: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Dlr_CA {
  AutoId: string;
  DealerCode: string;
  CAIssuer: string;
  CASubject: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_Port {
  PortCode: string;
  PortName: string;
  ProvinceCode: string;
  PortAddress: string;
  PortType: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_PortType {
  PortType: string;
  PortTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_InsuranceCompany {
  InsCompanyCode: string;
  InsCompanyName: string;
  FlagActive: number;
  Remark: string;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_District {
  DistrictCode: string;
  ProvinceCode: string;
  DistrictName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_DealerType {
  DealerType: string;
  DealerTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Province {
  ProvinceCode: string;
  AreaCode: string;
  ProvinceName: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface CGResult<T> {
  PageIndex: number;
  PageSize: number;
  PageCount: number;
  ItemCount: number;
  DataList: T[];
}

export interface CGResponse<T> {
  Data: {
    _strTId: string;
    _strAppTId: string;
    _objTTime: string;
    _strType: string;
    _strErrCode: string;
    _objResult: CGResult<T> | T;
    _excResult: any;
    _dicDebugInfo: {
      strTid: string;
      strAppTId: string;
    };
  };
  isSuccess?: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  errorCode: string;
  errorInfo?: object;
  debugInfo: object;
  DataList?: T[];
  Data?: T;
  ItemCount?: number;
  PageCount?: number;
  PageIndex?: number;
  PageSize?: number;
}

export enum FlagActiveEnum {
  Active = "1",
  Inactive = "0",
  All = "",
}

export interface SearchParam {
  KeyWord: string;
  FlagActive: FlagActiveEnum;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}

export interface Search_Mst_Transporter extends SearchParam {
  TransporterCode: string;
  TransporterName: string;
}

export interface SearchDealerParam extends SearchParam {
  DealerCode: string;
  DealerName: string;
  FlagAutoLXX: FlagActiveEnum;
  FlagAutoMapVIN: FlagActiveEnum;
  FlagAutoSOAppr: FlagActiveEnum;
}

export interface Search_Mst_Bank extends SearchParam {}

export interface Search_Mst_BankAccount extends SearchParam {
  DealerCode?: string;
  AccountNo?: string;
}

export interface DeleteDealerParam {
  DealerCode: string;
}

export interface Mst_WarrantyExpires {
  ModelCode: string;
  WarrantyExpires: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
  WarrantyKM: string;
  mcm_ModelName: string;
}

export interface Mst_MngRateTonKhoBanHang {
  DealerCode: string;
  ModelCode: string;
  NguongBH: string;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_Bank {
  BankCode: string;
  BankCodeParent: string;
  BankName: string;
  BankBUCode: string;
  BankBUPattern: string;
  FlagPaymentBank: string;
  FlagMortageBank: string;
  FlagActive: string;
  PhoneNo: string;
  FaxNo: string;
  Address: string;
  PICName: string;
  PICPhoneNo: string;
  PICEmail: string;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
  FlagMonitorBank: string;
  ProvinceCode: string;
  ProvinceName: string;
  BenBankCode: string;
  NumberOfGuaranteeExt: string;
}

export interface Mst_BankAccount {
  AccountNo: string;
  BankCode: string;
  DealerCode: string;
  AccountName: string;
  FlagAccGrtClaim: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
  AccountNoHTC: string;
  md_DealerName: string;
  mb_BankName: string;
}

export interface Mst_AmplitudeApprOrd {
  DealerCode: string;
  ModelCode: string;
  AmplitudeOrdMax: string;
  AmplitudePlanMax: string;
  LogLUDateTime: string;
  LogLUBy: string;
  md_DealerName: string;
  mcm_ModelName: string;
}

export interface Mng_Quota {
  DealerCode: string;
  SpecCode: string;
  QtyQuota: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
  UpdateBy: string;
  UpdateDTime: string;
  md_DealerName: string;
  mcm_ModelCode: string;
  mcm_ModelName: string;
  mcs_SpecDescription: string;
}

export interface Mst_Area {
  AreaCode: string;
  AreaName: string;
  AreaRootCode: string;
  Level: string;
  FlagActive?: FlagActiveEnum;
  LogLUDTimeUTC?: string;
  LogLUBy: string;
}

// Quản lý địa điểm nhận xe của Đại lý
export interface Mst_PointRegis {
  PointRegisCode: string; // Mã địa điểm
  DealerCode: string; // Mã đại lý
  PointRegisName: string; // Địa chỉ giao xe
  MapLongitude: string; // Kinh độ
  MapLatitude: string; // Vĩ độ
  Radius: string; // Bán kính
  Remark: string; // Ghi chú
  FlagActive: string; // Trạng thái
  LogLUDateTime?: string;
  LogLUBy: string;
  md_DealerName: string; // Tên đại lý
}

export interface User {
  UserCode: string;
  SUDealerCode: string;
  SUBankCode: string;
  UserName: string;
  UserPassword: string;
  FlagSysAdmin: string;
  FlagSysViewer: string;
  SUFlagActive: string;
  SUTransporterCode?: string;
  SUInsCompanyCode: string;
  NetworkID?: string;
  UserPasswordNew?: string;
  PhoneNo?: string;
  EMail?: string;
  MST?: string;
  OrganCode?: string;
  DepartmentCode?: string;
  Position?: string;
  VerificationCode?: string;
  Avatar?: string;
  UUID?: string;
  FlagDLAdmin?: string;
  FlagNNTAdmin?: string;
  OrgID?: string;
  CustomerCodeSys?: string;
  CustomerCode?: string;
  CustomerName?: string;
  FlagActive: string;
  LogLUDTimeUTC?: string;
  LogLUBy: string;
  ACId?: string;
  ACAvatar?: string;
  ACEmail?: string;
  ACLanguage?: string;
  ACName?: string;
  ACPhone?: string;
  ACTimeZone?: string;
  mo_OrganCode?: string;
  mo_OrganName?: string;
  mdept_DepartmentCode?: string;
  mdept_DepartmentName?: string;
  mnnt_DealerType?: string;
  ctitctg_CustomerGrpCode?: string;
}

export interface Mst_SalesOrderType {
  SOType: string;
  SOTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_Storage {
  StorageCode: string;
  StorageName: string;
  ProvinceCode: string;
  StorageAddress: string;
  StorageType: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_VINProductionYear_Actual {
  AssemblyStatus: string;
  VINCharacters: string;
  ProductionYear: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_MinInventory {
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  QtyInv: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_PaymentType {
  PaymentType: string;
  PaymentTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CarCancelType {
  CarCancelType: string;
  CarCancelTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_Plant {
  PlantCode: string;
  PlantName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CarInvoice {
  SpecCode: string;
  VehiclesType: string;
  NumberOfSeats: string;
  CarType: string;
  VAT: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CabinCertificate {
  CabinCertificateNo: string;
  CarType: string;
  FlagActive: number;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_StorageAreaRate {
  StorageCode: string;
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  ColorExtCode: string;
  ColorExtNameVN: string;
  MBTVal: string;
  MBVal: string;
  MTVal: string;
  MNVal: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Auto_MapVIN_DistributionSumRate {
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  ColorExtCode: string;
  ColorExtNameVN: string;
  MBVal: string;
  MTVal: string;
  MNVal: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_RegistrationInfo {
  RegistYear: string;
  ProvinceCode: string;
  ProvinceName: string;
  Qty: string;
  RegistPercent: string;
  TotalAmount: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CustomerBase {
  CustomerBaseCode: string;
  CustomerBaseName: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLuBy: string;
}

export interface Mst_CarSpec {
  ModelCode: string;
  RootSpec: string;
  SpecCode: string;
  SpecDescription: string;
  StdOptCode: string;
  OCNCode: string;
  GradeCode: string;
  AssemblyStatus: string;
  FlagAmbulance: string;
  FlagInvoiceFactory: string;
  NumberOfSeats: string;
  QuotaDate: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_DealerSalesGroupType {
  SalesGroupType: string;
  SalesGroupTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_DealerSalesType {
  SalesType: string;
  SalesGroupType: string;
  SalesTypeName: string;
  SalesTypeNameVN: string;
  SalesTypeDescription: string;
  SalesTypeDescriptionVN: string;
  FlagActive: string;
  FlagActiveLogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_Discount {
  EffectiveDate: string;
  EffectiveDateEnd: string;
  DiscountPercent: string;
  PenaltyPercent: string;
  LogLUDateTime: string;
  LogLUBy: string;
  FnExpPercent: string;
  PmtDsTCGPercent: string;
}

export interface Mst_TransporterDriver {
  TransporterCode: string;
  DriverId: string;
  DriverFullName: string;
  DriverLicenseNo: string;
  DriverPhoneNo: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CarModel {
  ModelCode: string;
  ModelProductionCode: string;
  ModelName: string;
  SegmentType: string;
  QuotaDate: string;
  FlagBusinessPlan: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CarOCN {
  ModelCode: string;
  OCNCode: string;
  OCNDescription: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Rpt_PrincipleContract {
  DealerCode: string;
  PrincipleContractNo: string;
  PrincipleContractDate: string | Date;
  BankInfo: string;
  Representative: string;
  JobTitle: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_StorageGlobal {
  StorageCode: string;
  StorageName: string;
  ModelCode: string;
  ModelName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Dlr_StorageLocal {
  StorageCode: string;
  StorageName: string;
  DealerCode: string;
  DealerName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CostType {
  CostType: string;
  CostTypeName: string;
  FlagActive: number;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_ContractUpdateType {
  ContractUpdateType: string;
  ContractUpdateTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CarColor {
  ModelCode: string;
  ColorCode: string;
  ColorExtType: string;
  ColorExtCode: string;
  ColorExtName: string;
  ColorExtNameVN: string;
  ColorIntCode: string;
  ColorIntName: string;
  ColorIntNameVN: string;
  ColorFee: string;
  FlagActive: string;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CarStdOpt {
  ModelCode: string;
  StdOptCode: string;
  GradeCode: string;
  StdOptDescription: string;
  GradeDescription: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface SearchMst_CarSpecParam extends SearchParam {
  SpecCode: string;
  SpecDescription: string;
  FlagActive: FlagActiveEnum;
  AssemblyStatus: string;
}

export interface SearchMst_CarStdOptParam extends SearchParam {
  ModelCode: string;
  StdOptCode: string;
  StdOptDescription: string;
}

export interface Mst_RateApprOrderModelMax {
  DealerCode: string;
  ModelCode: string;
  RateApprMax: string;
  LogLUDateTime: string;
  LogLUBy: string;
  md_DealerName: string;
  mcm_ModelName: string;
}
