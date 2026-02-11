import { useDispatch } from "react-redux";
import { ColumnType, Task } from "../types/backend";
import { IoMdClose } from "react-icons/io";
import { deleteTask } from "../redux/boards/boardsThunks";
import { AppDispatch } from "../redux/store";

type Props = {
  boardId: string;
  taskId: string;
  column: ColumnType;
  onClose: () => void;
};

const DeleteTaskModal = ({ boardId, column, taskId, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteTask({ boardId, column, taskId }));
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white rounded-lg p-12  max-w-lg w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#f6b83d] transition"
          aria-label="Close modal"
        >
          <IoMdClose size={25} />
        </button>
        <h5 className="text-xl font-bold mb-10">
          Are you sure you want to delete this task?
        </h5>

        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#f6b83d] rounded-full border text-white hover:bg-white hover:border-[#f6b83d] hover:text-[#f6b83d] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-white text-[#f6b83d] border border-[#f6b83d] rounded-full hover:bg-[#f6b83d] hover:text-white transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
