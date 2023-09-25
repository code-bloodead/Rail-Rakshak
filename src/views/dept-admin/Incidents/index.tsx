import TableSkeleton from "@/components/skeleton/TableSkeleton";
import IncidentTable from "./components/IncidentTable";
import { useAppSelector } from "@/app/store";
import { Incident } from "@/app/features/IncidentSlice";

const Incidents = () => {
  const incidents = useAppSelector((state) => state.incidents.data);
  const filteredIncidents = incidents.filter(
    (obj: Incident) => obj.source === "CCTV"
  );
  return (
    <div>
      <div className="mx-3 my-3 grid grid-cols-1">
        {filteredIncidents.length > 0 ? (
          <IncidentTable tableData={filteredIncidents} />
        ) : (
          <TableSkeleton />
        )}
      </div>
    </div>
  );
};

export default Incidents;
