import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Staff {
  id: string;
  staff_name: string;
  station_name: string;
  dept_name: string;
  status: string;
  photo: string;
}

interface StaffState {
  data: Staff[];
  loading: boolean;
  error: string;
}

const initialState: StaffState = {
  data: [],
  loading: false,
  error: "",
};

export const StaffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff: (state, action: PayloadAction<Staff[]>) => {
      state.data = action.payload;
    },
    clearStaff: (state) => {
      state.data = [];
    },
  },
});

export const { setStaff, clearStaff } = StaffSlice.actions;
export default StaffSlice.reducer;
