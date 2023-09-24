import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  desc: string;
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
});

export const { setTasks, clearTasks } = TaskSlice.actions;
export default TaskSlice.reducer;
