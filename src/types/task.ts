import { ColumnType } from "./backend";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: ColumnType;
};
