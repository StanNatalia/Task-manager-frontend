import { Task } from "../types/task";
import SingleTask from "./SingleTask";

type TaskListProps = {
  tasks: Task[];
  column: string;
  boardId: string;
  onAddTask?: () => void;
};

const TaskList = ({ tasks, column, boardId, onAddTask }: TaskListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <SingleTask
          key={task.id}
          column={column}
          boardId={boardId}
          task={task}
        />
      ))}

      {column === "todo" && (
        <button
          onClick={onAddTask}
          className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 
                     rounded-lg p-8 text-gray-500 hover:border-blue-500 hover:text-blue-600 
                     transition"
        >
          <span className="text-xl">+</span>
          <span className="text-sm font-medium">Add new task</span>
        </button>
      )}
    </div>
  );
};

export default TaskList;
