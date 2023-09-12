// Admin Imports
import MainDashboard from "views/dept-admin/dashboard";
// import NFTMarketplace from "views/dept-admin/marketplace";
// import Profile from "views/dept-admin/profile";
// import DataTables from "views/dept-admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdReport,
} from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { BiCctv } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";

const routes = [
  {
    name: "Dashboard",
    layout: "/dept-admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Tasks",
    layout: "/dept-admin",
    path: "tasks",
    icon: <FaTasks className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Reported Incidents",
    layout: "/dept-admin",
    path: "reported-incidents",
    icon: <TbReport className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Detected Incidents",
    layout: "/dept-admin",
    path: "detected-incidents",
    icon: <MdReport className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "CCTV Footage",
    layout: "/dept-admin",
    path: "cctv-footage",
    icon: <BiCctv className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Employees",
    layout: "/dept-admin",
    path: "employees",
    icon: <BsFillPeopleFill className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/dept-admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/dept-admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/dept-admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;
