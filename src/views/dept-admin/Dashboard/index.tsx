import { MdReport } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { TbReport } from "react-icons/tb";

import Widget from "@/components/widget/Widget";
import TaskTable from "./components/TaskTable";
import StaffTable from "./components/StaffTable";
import RecentIncidentsTable from "./components/RecentIncidentsTable";
import WeeklyIncidents from "./components/WeeklyIncidents";
import { useAppSelector } from "@/app/store";
import TableSkeleton from "./components/TableSkeleton";
import WeeklyIncidentSkeleton from "./components/WeeklyIncidentSkeleton";

const Dashboard = () => {
  const staff = useAppSelector((state) => state.staff.data);
  const incidents = useAppSelector((state) => state.incidents.data);
  const tasks = useAppSelector((state) => state.tasks.data);
  const detectedIncidents = incidents.filter(
    (obj) => obj.source === "CCTV"
  ).length;
  const reportedIncidents = incidents.filter(
    (obj) => obj.source === "User Report"
  ).length;
  const completedTasks = tasks.filter(
    (obj) => obj.status === "Completed"
  ).length;

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
        <Widget
          icon={<TbReport className="h-7 w-7" />}
          title={"Reported Incidents"}
          subtitle={reportedIncidents.toString()}
        />
        <Widget
          icon={<FaTasks className="h-6 w-6" />}
          title={"Completed Tasks"}
          subtitle={completedTasks.toString()}
        />
        <Widget
          icon={<MdReport className="h-7 w-7" />}
          title={"Detected Incidents"}
          subtitle={detectedIncidents.toString()}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-5">
        <WeeklyIncidents />

        {incidents?.length > 0 ? (
          <RecentIncidentsTable tableData={incidents} />
        ) : (
          <TableSkeleton type="recentIncident" />
        )}
      </div>

      {/* Tables & Charts */}

      <div className="col-span-2 mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 ">
        {/* Check Table */}
        <div className="col-span-2">
          {tasks?.length > 0 ? (
            <TaskTable tableData={tasks} />
          ) : (
            <TableSkeleton type="taskTable" />
          )}
        </div>
        {staff?.length > 0 ? (
          <div className="grid grid-cols-1 col-span-2 md:col-span-1 rounded-[20px]">
            <StaffTable tableData={staff} />
          </div>
        ) : (
          <TableSkeleton type="staffTable" />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
