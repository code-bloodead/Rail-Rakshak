// Admin Imports
import Dashboard from "views/dept-admin/Dashboard";
import Tasks from "views/dept-admin/Tasks";
import Reports from "views/dept-admin/Reports";
import Incidents from "views/dept-admin/Incidents";
import Footages from "views/dept-admin/Footages";
import Staff from "views/dept-admin/Staff";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import { MdHome, MdLock, MdReport } from "react-icons/md";
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
    component: <Dashboard />,
  },
  {
    name: "Tasks",
    layout: "/dept-admin",
    path: "tasks",
    icon: <FaTasks className="h-6 w-6" />,
    component: <Tasks />,
  },
  {
    name: "Reported Incidents",
    layout: "/dept-admin",
    path: "reported-incidents",
    icon: <TbReport className="h-6 w-6" />,
    component: <Reports />,
  },
  {
    name: "Detected Incidents",
    layout: "/dept-admin",
    path: "detected-incidents",
    icon: <MdReport className="h-6 w-6" />,
    component: <Incidents />,
  },
  {
    name: "CCTV Footage",
    layout: "/dept-admin",
    path: "cctv-footage",
    icon: <BiCctv className="h-6 w-6" />,
    component: <Footages />,
  },
  {
    name: "Staff",
    layout: "/dept-admin",
    path: "staff",
    icon: <BsFillPeopleFill className="h-6 w-6" />,
    component: <Staff />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;
