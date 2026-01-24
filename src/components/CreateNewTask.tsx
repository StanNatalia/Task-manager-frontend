import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  boardId: string;
};

const CreateNewTask = ({ isOpen, onClose, boardId }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return alert("Enter task title");

    console.log("New task:", {
      title,
      description,
      status,
      boardId,
    });

    onClose();
    setTitle("");
    setDescription("");
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Create new task</h3>

        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        >
          <option value="todo">Todo</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTask;
