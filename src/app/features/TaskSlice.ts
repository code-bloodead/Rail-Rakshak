import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Task {
  id?: string;
  title: string;
  description: string;
  assigned_to: string[];
  image: string;
  created_at?: Date;
  deadline: string;
  status?: string;
  assc_incident: string;
  dept_name: string;
  station_name: string;
}

interface TaskState {
  data: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "task/fetch",
  async (payload: { deptName: string; stationName: string }, thunkAPI) => {
    try {
      const { deptName, stationName } = payload;
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/tasks/get_task_by_dept?dept_name=${deptName}&station_name=${stationName}`
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const addTask = createAsyncThunk(
  "task/add",
  async (payload: Task, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/create_task`,
        payload
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.data = action.payload;
      state.error = null;
    },
    clearTasks: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.data = action.payload.SUCCESS;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload.SUCCESS];
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { setTasks, clearTasks } = TaskSlice.actions;
export default TaskSlice.reducer;
