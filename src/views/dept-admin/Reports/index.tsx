import tableDataReport from "@/constants/tableDataReport";
import ReportTable from "./components/ReportTable";

const Reports = () => {
  return (
    <div>
      <div className="mx-3 my-3 grid grid-cols-1">
        <ReportTable tableData={tableDataReport} />
      </div>
    </div>
  );
};

export default Reports;
