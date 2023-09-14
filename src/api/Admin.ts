import axios from "axios";
import { BACKEND_URL } from "constants/definitions";

export const getAdminByID = async (id: string) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/admin/get_admin_by_id?id=${localStorage.getItem("token")}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
