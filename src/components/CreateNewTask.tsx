import { useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createTask } from "../features/boards/boardsThunks";
import { ColumnType } from "../types/backend";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
};

const CreateNewTask = ({ isOpen, onClose, boardId }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (!title.trim()) return alert("Enter task title");

    dispatch(
      createTask({
        boardId,
        column: status as ColumnType,
        title,
        description,
      }),
    );

    onClose();
    setTitle("");
    setDescription("");
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Create new task</h3>

        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg border-[#f6b83d] 
         focus:outline-none focus:ring-2 focus:ring-[#f6b83d]
         focus:border-[#f6b83d] transition"
        />

        <input
          type="text"
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg border-[#f6b83d] 
         focus:outline-none focus:ring-2 focus:ring-[#f6b83d]
         focus:border-[#f6b83d] transition"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg border-[#f6b83d] 
         focus:outline-none focus:ring-2 focus:ring-[#f6b83d]
         focus:border-[#f6b83d] transition"
        >
          <option value="todo">Todo</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4  py-2 bg-[#f6b83d] rounded-full border  text-white  hover:bg-white hover:border-[#f6b83d] hover:text-[#f6b83d] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-white  text-[#f6b83d] border border-[#f6b83d]  rounded-full  hover:bg-[#f6b83d] hover:text-white transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTask;
