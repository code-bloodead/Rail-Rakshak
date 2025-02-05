import { Incident } from "@/app/features/IncidentSlice";
import ReportTable from "./components/ReportTable";
import { useAppSelector } from "@/app/store";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { useEffect, useState } from "react";

const Reports = () => {
  const incidents = useAppSelector((state) => state.incidents.data);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    setFilteredIncidents(
      incidents.filter((obj: Incident) => obj.source === "User Report")
    );
  }, [incidents]);

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
