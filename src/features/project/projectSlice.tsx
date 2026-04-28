import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ProjectState = {
  projectId: string | null;
  status: string | null;
};

const initialState: ProjectState = {
  projectId: null,
  status: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectId(state, action: PayloadAction<string>) {
      state.projectId = action.payload;
    },
    clearProjectId(state) {
      state.projectId = null;
    },
    setProjectStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    clearProjectStatus(state) {
      state.status = null;
    },
  },
});

export const { setProjectId, clearProjectId, setProjectStatus, clearProjectStatus } = projectSlice.actions;
export default projectSlice.reducer;