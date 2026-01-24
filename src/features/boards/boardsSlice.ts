import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../../types/backend";
import {
  createBoard,
  deleteTask,
  fetchBoard,
  updateTask,
} from "./boardsThunks";

interface BoardState {
  board: Board | null;
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  board: null,
  loading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload;
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.board = action.payload;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        if (!state.board) return;

        const task = state.board.columns[action.payload.column];
        const index = task.findIndex((t) => t.id === action.payload.task.id);

        if (index !== -1) {
          task[index] = action.payload.task;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (!state.board) return;
        state.board.columns[action.payload.column] = state.board.columns[
          action.payload.column
        ].filter((t) => t.id !== action.payload.taskId);
      });
  },
});

export default boardsSlice.reducer;
