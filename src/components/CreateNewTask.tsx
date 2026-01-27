import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createTask } from "../features/boards/boardsThunks";
import { ColumnType } from "../types/backend";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
};

const CreateNewTask = ({ isOpen, onClose, boardId }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const titleInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Please enter task title and description!");
      return;
    }

    dispatch(
      createTask({
        boardId,
        column: status as ColumnType,
        title,
        description,
      }),
    );

    toast.success("Task created successfully!", { position: "top-right" });

    onClose();
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        onKeyDown={handleKeyDown}
        className="bg-white rounded-xl w-full max-w-md mx-5 p-6 shadow-lg relative "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#f6b83d] transition"
          aria-label="Close modal"
        >
          <IoMdClose size={25} />
        </button>
        <h3 className="text-xl font-semibold mb-4">Create new task</h3>

        <input
          ref={titleInputRef}
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
             focus:border-[#f6b83d]
             hover:bg-[#f6b83d] transition-colors"
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
