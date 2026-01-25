import { createAsyncThunk } from "@reduxjs/toolkit";
import { boardApi } from "./boardsApi";
import { ColumnType } from "../../types/backend";

export const fetchBoard = createAsyncThunk(
  "boards/fetchBoard",
  async (boardId: string) => {
    const res = await boardApi.getBoard(boardId);
    return res.data;
  },
);

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (name: string) => {
    const res = await boardApi.createBoard(name);
    return res.data;
  },
);

export const getBoard = createAsyncThunk(
  "boards/getBoard",
  async (boardId: string) => {
    const res = await boardApi.getBoard(boardId);
    return res.data;
  },
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId: string, { rejectWithValue }) => {
    try {
      await boardApi.deleteBoard(boardId);
      return boardId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  },
);

export const createTask = createAsyncThunk(
  "boards/createTask",
  async (
    {
      boardId,
      column,
      title,
      description,
    }: {
      boardId: string;
      column: ColumnType;
      title: string;
      description: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await boardApi.createTask(boardId, column, {
        title,
        description,
      });
      return { column, task: data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  },
);

export const updateTask = createAsyncThunk(
  "boards/updateTask",
  async ({
    boardId,
    column,
    taskId,
    title,
    description,
  }: {
    boardId: string;
    column: ColumnType;
    taskId: string;
    title: string;
    description: string;
  }) => {
    const res = await boardApi.updateTask(boardId, column, taskId, {
      title,
      description,
    });
    return { column, task: res.data };
  },
);

export const updateTaskColumn = createAsyncThunk(
  "boards/updateTaskColumn",
  async (
    {
      boardId,
      taskId,
      from,
      to,
    }: {
      boardId: string;
      taskId: string;
      from: ColumnType;
      to: ColumnType;
    },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as any;
      const task = state.boards.board.columns[from].find(
        (t: any) => t.id === taskId,
      );

      await boardApi.updateTaskColumn(boardId, taskId, to);

      return { task, from, to };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  },
);

export const deleteTask = createAsyncThunk(
  "boards/deleteTask",
  async ({
    boardId,
    column,
    taskId,
  }: {
    boardId: string;
    column: ColumnType;
    taskId: string;
  }) => {
    await boardApi.deleteTask(boardId, column, taskId);
    return { column, taskId };
  },
);
