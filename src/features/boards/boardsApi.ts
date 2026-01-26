import axios from "axios";
import { Board, ColumnType, Task } from "../../types/backend";
import { getBoard } from "./boardsThunks";

const API_URL = import.meta.env.VITE_API_URL;

export const boardApi = {
  createBoard: (name: string) =>
    axios.post<Board>(`${API_URL}/api/boards`, { name }),

  getBoards: () =>
    axios.get<{ boardId: string; name: string }[]>(`${API_URL}/api/boards`),

  getBoard: (boardId: string) =>
    axios.get<Board>(`${API_URL}/api/boards/${boardId}`),

  updateBoard: (boardId: string, name: string) =>
    axios.put(`${API_URL}/api/boards/${boardId}`, { name }),

  deleteBoard: (boardId: string) =>
    axios.delete(`${API_URL}/api/boards/${boardId}`),

  createTask: (
    boardId: string,
    column: ColumnType,
    data: {
      title: string;
      description: string;
    },
  ) => axios.post<Task>(`${API_URL}/api/boards/${boardId}/${column}`, data),

  updateTask: (
    boardId: string,
    column: ColumnType,
    taskId: string,
    data: { title: string; description: string },
  ) =>
    axios.put<Task>(
      `${API_URL}/api/boards/${boardId}/${column}/${taskId}`,
      data,
    ),

  updateTaskColumn: (boardId: string, taskId: string, newColumn: ColumnType) =>
    axios.patch(`${API_URL}/api/boards/${boardId}/tasks/${taskId}/column`, {
      column: newColumn,
    }),

  deleteTask: (boardId: string, column: ColumnType, taskId: string) =>
    axios.delete(`${API_URL}/api/boards/${boardId}/${column}/${taskId}`),
};
