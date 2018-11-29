// @material-ui/icons
import AddLocation from "@material-ui/icons/AddLocation";
import LocationOn from "@material-ui/icons/LocationOn";
import EditLocation from "@material-ui/icons/EditLocation";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components/views
import ReceiveRequestView from "views/ReceiveRequest/ReceiveRequestView";
import LocateRequestView from "views/LocateRequest/LocateRequestView";
import ManageRequestView from "views/ManageRequest/ManageRequestView";
import BackOffice from "views/BackOffice/BackOffice";

const dashboardRoutes = [
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
    sidebarName: "Quản lý dữ liệu",
    navbarName: "Quản lý dữ liệu",
    icon: LibraryBooks,
    component: BackOffice
  },
  { redirect: true, path: "/", to: "/dashboard/receiverequest", navbarName: "Redirect" }
];

export default dashboardRoutes;
