import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../../types/backend";
import {
  createBoard,
  createTask,
  deleteTask,
  fetchBoard,
  updateTask,
  updateTaskColumn,
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
      .addCase(createTask.fulfilled, (state, action) => {
        if (!state.board) return;
        state.board.columns[action.payload.column].push(action.payload.task);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        if (!state.board) return;

        const task = state.board.columns[action.payload.column];
        const index = task.findIndex((t) => t.id === action.payload.task.id);

        if (index !== -1) {
          task[index] = action.payload.task;
        }
      })

      .addCase(updateTaskColumn.fulfilled, (state, action) => {
        if (!state.board) return;

        const { task, from, to } = action.payload;

        state.board.columns[from] = state.board.columns[from].filter(
          (t) => t.id !== task.id,
        );

        state.board.columns[to].push(task);
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
