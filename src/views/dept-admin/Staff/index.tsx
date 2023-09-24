import { useAppSelector } from "@/app/store";
import StaffTable from "./components/StaffTable";

const Staff = () => {
  const staff = useAppSelector((state) => state.staff.data);
  return (
    <div>
      <div className="mx-3 my-3 grid grid-cols-1">
        <StaffTable tableData={staff} />
      </div>
    </div>
  );
};

export default Staff;
