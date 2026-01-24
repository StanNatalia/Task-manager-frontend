import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchBoard } from "../features/boards/boardsThunks";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { ColumnType } from "../types/backend";
import { IoIosSearch } from "react-icons/io";
import CreateNewTask from "./CreateNewTask";

const TASKS_STATUSES = ["todo", "inProgress", "done"];

const statusTitles: Record<ColumnType, string> = {
  todo: "Todo",
  inProgress: "In Progress",
  done: "Done",
};

const TaskPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: RootState) => state.boards.board);
  const loading = useSelector((state: RootState) => state.boards.loading);

  useEffect(() => {
    dispatch(fetchBoard("q5vby7nf"));
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!board) return <p className="text-center mt-10 text-red-500">No board</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md mx-auto mb-6 relative">
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          <IoIosSearch size={22} />
        </span>
        <input
          type="text"
          placeholder="Search your board..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 transition"
        />
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">{board.name}</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        + New Task
      </button>

      <CreateNewTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        boardId={board.boardId}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TASKS_STATUSES.map((status) => (
          <div
            key={status}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {statusTitles[status as ColumnType]}
            </h3>

            <TaskList
              column={status as ColumnType}
              boardId={board.boardId}
              tasks={board.columns[status as keyof typeof board.columns]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
