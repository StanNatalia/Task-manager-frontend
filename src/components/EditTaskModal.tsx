import { useDispatch } from "react-redux";
import { ColumnType, Task } from "../types/backend";
import { AppDispatch } from "../app/store";
import { useState } from "react";
import { updateTask } from "../features/boards/boardsThunks";

type Props = {
  task: Task;
  boardId: string;
  column: ColumnType;
  onClose: () => void;
};

const EditTaskModal = ({ task, boardId, column, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    dispatch(
      updateTask({
        boardId,
        column,
        taskId: task.id,
        title,
        description,
      }),
    );
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Edit task</h5>

          <input
            className="form-control mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
