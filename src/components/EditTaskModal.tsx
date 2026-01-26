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
        <h5 className="text-2xl font-bold mb-4">Edit Task</h5>

        <input
          className="w-full mb-2 p-2 rounded-lg border border-[#f6b83d] 
         focus:outline-none focus:ring-2 focus:ring-[#f6b83d]
         focus:border-[#f6b83d] transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-2 p-2 rounded-lg border border-[#f6b83d] 
         focus:outline-none focus:ring-2 focus:ring-[#f6b83d]
         focus:border-[#f6b83d] transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4  py-2 bg-[#f6b83d] rounded-full border  text-white  hover:bg-white hover:border-[#f6b83d] hover:text-[#f6b83d] transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-white  text-[#f6b83d] border border-[#f6b83d]  rounded-full  hover:bg-[#f6b83d] hover:text-white transition"
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
