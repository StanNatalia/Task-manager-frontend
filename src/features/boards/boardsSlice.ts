import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../../types/backend";
import {
  createBoard,
  createTask,
  deleteTask,
  fetchBoard,
  fetchBoards,
  updateBoard,
  updateTask,
  updateTaskColumn,
} from "./boardsThunks";

interface BoardState {
  board: Board | null;
  boards: Board[];
  loadingBoard: boolean;
  loadingBoards: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: BoardState = {
  board: null,
  boards: [],
  loadingBoard: false,
  loadingBoards: false,
  error: null,
  initialized: false,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchBoard.pending, (state) => {
        state.loadingBoard = true;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.loadingBoard = false;
        state.board = action.payload;
        state.initialized = true;
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.loadingBoard = false;
        state.initialized = true;
      })

      .addCase(fetchBoards.pending, (state) => {
        state.loadingBoards = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loadingBoards = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loadingBoards = false;
        state.error = action.error.message || "Error";
      })

      .addCase(updateBoard.fulfilled, (state, action) => {
        const updatedBoard = action.payload;
        if (!updatedBoard) return;

        const index = state.boards.findIndex(
          (b) => b.boardId === updatedBoard.boardId,
        );
        if (index !== -1) state.boards[index] = updatedBoard;

        if (state.board?.boardId === updatedBoard.boardId)
          state.board = updatedBoard;
      })

      .addCase(createBoard.pending, (state) => {
        state.loadingBoard = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loadingBoard = false;
        state.boards.push(action.payload); // добавляем новую доску в список
        state.board = action.payload;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loadingBoard = false;
        state.error = action.error.message || "Error";
      })

      .addCase(createTask.fulfilled, (state, action) => {
        if (!state.board) return;
        state.board.columns[action.payload.column].push(action.payload.task);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        if (!state.board) return;

        const tasks = state.board.columns[action.payload.column];
        const index = tasks.findIndex((t) => t.id === action.payload.task.id);

        if (index !== -1) {
          tasks[index] = action.payload.task;
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
