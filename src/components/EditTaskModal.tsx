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
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h5 className="text-xl font-bold mb-4">Edit Task</h5>

        <input
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
