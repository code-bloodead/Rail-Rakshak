import { MdReport } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { TbReport } from "react-icons/tb";

import Widget from "components/widget/Widget";
import TaskTable from "./components/TaskTable";
import StaffTable from "./components/StaffTable";
import RecentIncidentsTable from "./components/RecentIncidentsTable";
import tableDataTask from "constants/tableDataTask";
import tableDataStaff from "constants/tableDataStaff";
import tableDataIncident from "constants/tableDataIncident";
import WeeklyIncidents from "./components/WeeklyIncidents";
import { useAppDispatch, useAppSelector } from "app/store";
import { useEffect } from "react";
import { setStaff } from "app/features/StaffSlice";
import { getStaffByDept } from "api/Staff";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.admin.data);
  const fetchData = async () => {
    if (localStorage.getItem("token")) {
      const res = await getStaffByDept(admin.dept_name, admin.station_name);
      dispatch(setStaff(res.SUCCESS));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
        <Widget
          icon={<TbReport className="h-7 w-7" />}
          title={"Reported Incidents"}
          subtitle={"33"}
        />
        <Widget
          icon={<FaTasks className="h-6 w-6" />}
          title={"Completed Tasks"}
          subtitle={"23"}
        />
        <Widget
          icon={<MdReport className="h-7 w-7" />}
          title={"Detected Incidents"}
          subtitle={"13"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <WeeklyIncidents />
        <RecentIncidentsTable tableData={tableDataIncident} />
      </div>

      {/* Tables & Charts */}

      <div className="col-span-2 mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 ">
        {/* Check Table */}
        <div className="col-span-2">
          <TaskTable tableData={tableDataTask} />
        </div>

        <div className="grid grid-cols-1 rounded-[20px]">
          <StaffTable tableData={tableDataStaff} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
