import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "constants/definitions";

export interface Admin {
  id: string;
  admin_name: string;
  station_name: string;
  role: string;
  dept_name: string;
  photo: string;
}

interface AdminState {
  data: Admin;
  loading: boolean;
  error: string;
}

const initialState: AdminState = {
  data: {
    id: "",
    admin_name: "",
    station_name: "",
    role: "",
    dept_name: "",
    photo: "",
  },
  loading: false,
  error: "",
};

export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.data = action.payload;
    },
    clearAdmin: (state) => {
      state.data = {
        id: "",
        admin_name: "",
        station_name: "",
        role: "",
        dept_name: "",
        photo: "",
      };
    },
  },
});

export const { setAdmin, clearAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;
