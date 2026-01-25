import { Task } from "../types/task";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { deleteTask } from "../features/boards/boardsThunks";
import { ColumnType } from "../types/backend";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

export type SingleTaskProps = {
  task: Task;
  column: ColumnType;
  boardId: string;
};

const SingleTask = ({ task, column, boardId }: SingleTaskProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask({ boardId, column, taskId: task.id }));
    }
  };

  return (
    <>
      <div className="p-4 position-relative  bg-gray-200 rounded-xl shadow-md">
        <h5 className="color-white  font-semibold text-lg mb-2">
          {task.title}
        </h5>
        <p className="color-white text-md mb-3">{task.description}</p>

        <div className="flex justify-end gap-3">
          <button onClick={() => setIsEditOpen(true)} className="">
            <FaEdit />
          </button>

          <button onClick={handleDelete} className="">
            <FaTrash />
          </button>
        </div>
      </div>

      {isEditOpen && (
        <EditTaskModal
          task={task}
          boardId={boardId}
          column={column}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default SingleTask;
