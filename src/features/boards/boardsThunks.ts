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
