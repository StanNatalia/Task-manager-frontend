import axios from "axios";
import { Board, ColumnType, Task } from "../../types/backend";

const API_URL = import.meta.env.VITE_API_URL;

export const boardApi = {
  createBoard: (name: string) =>
    axios.post<Board>(`${API_URL}/api/boards`, { name }),

  getBoard: (boardId: string) =>
    axios.get<Board>(`${API_URL}/api/boards/${boardId}`),
  deleteBoard: (boardId: string) => axios.delete(`${API_URL}/board/${boardId}`),

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

  deleteTask: (boardId: string, column: ColumnType, taskId: string) =>
    axios.delete(`${API_URL}/api/boards/${boardId}/${column}/${taskId}`),
};
