// @material-ui/icons
import AddLocation from "@material-ui/icons/AddLocation";
import LocationOn from "@material-ui/icons/LocationOn";
import EditLocation from "@material-ui/icons/EditLocation";
import AccessibilityNew from "@material-ui/icons/AccessibilityNew";
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import Settings from '@material-ui/icons/Settings'

// core components/views
import ReceiveRequestView from "views/ReceiveRequest/ReceiveRequestView";
import LocateRequestView from "views/LocateRequest/LocateRequestView";
import ManageRequestView from "views/ManageRequest/ManageRequestView";
import ManageDriver from "views/BackOffice/ManageDriver";
import ManageStaff from "views/BackOffice/ManageStaff";
import SettingsView from "views/BackOffice/Settings";

const dashboardRoutes = [
  {
    path: "/dashboard/#",
    sidebarName: "NHÂN VIÊN",
    navbarName: "Nhân viên",
    icon: '',
    component: ReceiveRequestView
  },
  {
    path: "/dashboard/receiverequest",
    sidebarName: "Nhận chuyến đi",
    navbarName: "Nhận chuyến đi",
    icon: AddLocation,
    component: ReceiveRequestView
  },
  {
    path: "/dashboard/locaterequest",
    sidebarName: "Định vị",
    navbarName: "Định vị",
    icon: LocationOn,
    component: LocateRequestView
  },
  {
    path: "/dashboard/managerequest",
    sidebarName: "Quản lý chuyến đi",
    navbarName: "Quản lý chuyến đi",
    icon: EditLocation,
    component: ManageRequestView
  },
  {
    path: "/dashboard/backoffice",
    sidebarName: "BACK OFFICE",
    navbarName: "Back Office",
    icon: '',
    component: null
  },
  {
    path: "/dashboard/managedriver",
    sidebarName: "Danh sách tài xế",
    navbarName: "Danh sách tài xế",
    icon: DirectionsBike,
    component: ManageDriver
  },
  {
    path: "/dashboard/managestaff",
    sidebarName: "Danh sách nhân viên",
    navbarName: "Danh sách nhân viên",
    icon: AccessibilityNew,
    component: ManageStaff
  },
  {
    path: "/dashboard/settings",
    sidebarName: "Cài đặt",
    navbarName: "Cài đặt",
    icon: Settings,
    component: SettingsView
  },
  { redirect: true, path: "/dashboard", to: "/dashboard/receiverequest", navbarName: "Redirect" }
];

export default dashboardRoutes;
