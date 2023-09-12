import { MdReport } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { TbReport } from "react-icons/tb";

import Widget from "components/widget/Widget";
import TaskTable from "./components/TaskTable";
import StaffTable from "./components/StaffTable";
import ReportTable from "./components/ReportTable";
import IncidentTable from "./components/IncidentTable";
import tableDataTask from "./variables/tableDataTask";
import tableDataReport from "./variables/tableDataReport";
import tableDataIncident from "./variables/tableDataIncident";
import tableDataStaff from "./variables/tableDataStaff";

const Dashboard = () => {
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
        <IncidentTable tableData={tableDataIncident} />
        <ReportTable tableData={tableDataReport} />
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
