import tableDataIncident from "@/constants/tableDataIncident";
import IncidentTable from "./components/IncidentTable";
import { useAppSelector } from "@/app/store";

const Incidents = () => {
  const incidents = useAppSelector((state) => state.incidents.data);
  return (
    <div>
      <div className="mx-3 my-3 grid grid-cols-1">
        <IncidentTable tableData={incidents} />
      </div>
    </div>
  );
};

export default Incidents;
