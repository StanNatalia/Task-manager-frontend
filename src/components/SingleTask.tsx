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
      <div className="card p-2 m-1 position-relative">
        <h5 style={{ color: "#3a4" }}>{task.title}</h5>
        <p>{task.description}</p>

        <div className="d-flex justify-content-end gap-2 mt-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="btn btn-sm btn-outline-primary"
          >
            <FaEdit />
          </button>

          <button
            onClick={handleDelete}
            className="btn btn-sm btn-outline-danger"
          >
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
