import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "@/constants/definitions";

export interface Incident {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  station_name: string;
  location: string;
  source: string;
  status: string;
  created_at: Date;
}

interface IncidentState {
  data: Incident[];
  loading: boolean;
  error: string | null;
}

const initialState: IncidentState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchIncidents = createAsyncThunk(
  "incident/fetch",
  async (payload: { deptName: string; stationName: string }, thunkAPI) => {
    try {
      const { deptName, stationName } = payload;
      const res = await axios.get(
        `${BACKEND_URL}/incidents/get_incidents_by_dept_and_station?dept_name=${deptName}&station_name=${stationName}`
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const IncidentSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    setIncidents: (state, action: PayloadAction<Incident[]>) => {
      state.data = action.payload;
      state.error = null;
    },
    clearIncidents: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIncidents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchIncidents.fulfilled, (state, action) => {
      state.data = action.payload.SUCCESS;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchIncidents.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred";
      state.loading = false;
    });
  },
});

export const { setIncidents, clearIncidents } = IncidentSlice.actions;
export default IncidentSlice.reducer;
