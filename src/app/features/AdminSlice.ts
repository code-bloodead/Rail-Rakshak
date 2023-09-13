import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Admin {
  id: string;
  name: string;
  station_name: string;
  role: string;
  dept_name: string;
}

interface AdminState {
  data: Admin;
}

const initialState: AdminState = {
  data: { id: "", name: "", station_name: "", role: "", dept_name: "" },
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
        name: "",
        station_name: "",
        role: "",
        dept_name: "",
      };
    },
  },
});

export const { setAdmin, clearAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;
