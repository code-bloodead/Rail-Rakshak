import tableDataIncident from "constants/tableDataIncident";
import IncidentTable from "./components/IncidentTable";

const Incidents = () => {
  return (
    <div>
      <div className="mx-3 my-3 grid grid-cols-1">
        <IncidentTable tableData={tableDataIncident} />
      </div>
    </div>
  );
};

export default Incidents;
