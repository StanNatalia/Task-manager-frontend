export type ColumnType = "todo" | "inProgress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface BoardColumns {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

export interface Board {
  _id: string;
  boardId: string;
  name: string;
  columns: BoardColumns;
}
