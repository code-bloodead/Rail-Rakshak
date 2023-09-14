import axios from "axios";
import { BACKEND_URL } from "constants/definitions";

export const getStaffByDept = async (deptName: string, stationName: string) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/staff/get_staffs_by_dept?dept_name=${deptName}&station_name=${stationName}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
