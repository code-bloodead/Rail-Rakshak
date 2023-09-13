import StaffTable from "./components/StaffTable";
import tableDataStaff from "constants/tableDataStaff";

const Staff = () => {
  return (
    <div>
      <div className="mx-3 my-3 grid grid-cols-1">
        <StaffTable tableData={tableDataStaff} />
      </div>
    </div>
  );
};

export default Staff;
