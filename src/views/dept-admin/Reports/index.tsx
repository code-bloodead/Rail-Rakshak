import { Incident } from "@/app/features/IncidentSlice";
import ReportTable from "./components/ReportTable";
import { useAppSelector } from "@/app/store";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

const Reports = () => {
  const incidents = useAppSelector((state) => state.incidents.data);
  const filteredIncidents = incidents.filter(
    (obj: Incident) => obj.source === "User Report"
  );
  return (
    <div>
      <div className="mx-3 my-3 grid grid-cols-1">
        {filteredIncidents.length > 0 ? (
          <ReportTable tableData={filteredIncidents} />
        ) : (
          <TableSkeleton />
        )}
      </div>
    </div>
  );
};

export default Reports;
