import { Task } from "../types/task";
import SingleTask from "./SingleTask";

type TaskListProps = {
  tasks: Task[];
  column: string;
  boardId: string;
};

const TaskList = ({ tasks, column, boardId }: TaskListProps) => {
  return (
    <div>
      <h3>{column}</h3>

      {tasks.map((task) => (
        <SingleTask
          key={task.id}
          column={column}
          boardId={boardId}
          task={task}
        />
      ))}
    </div>
  );
};

export default TaskList;
