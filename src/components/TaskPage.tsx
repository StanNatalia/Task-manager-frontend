import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { AppDispatch, RootState } from "../app/store";
import {
  deleteBoard,
  fetchBoard,
  fetchBoards,
  updateTaskColumn,
} from "../features/boards/boardsThunks";
import { useEffect, useState } from "react";
import { ColumnType } from "../types/backend";
import { IoIosSearch } from "react-icons/io";
import CreateNewTask from "./CreateNewTask";
import SingleTask from "./SingleTask";
import BoardsModal from "./BoardsModal";

const TASKS_STATUSES = ["todo", "inProgress", "done"];

const statusTitles: Record<ColumnType, string> = {
  todo: "Todo",
  inProgress: "In Progress",
  done: "Done",
};

const TaskPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardIdInput, setBoardIdInput] = useState("");
  const [isBoardsModalOpen, setIsBoardsModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: RootState) => state.boards.board);
  const loading = useSelector((state: RootState) => state.boards.loadingBoard);

  useEffect(() => {
    dispatch(fetchBoards()).then((res: any) => {
      if (res.payload && res.payload.length > 0) {
        dispatch(fetchBoard(res.payload[0].boardId));
      }
    });
  }, [dispatch]);

  const initialized = useSelector(
    (state: RootState) => state.boards.initialized,
  );

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <RotatingLines
          height="80"
          width="80"
          color="#f6b83d"
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (!board) return <p className="text-center mt-10 text-red-500">No board</p>;

  const loadBoard = () => {
    if (boardIdInput.trim()) {
      dispatch(fetchBoard(boardIdInput.trim()));
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || !board) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceCol = source.droppableId as ColumnType;
    const destCol = destination.droppableId as ColumnType;

    const task = board.columns[sourceCol][source.index];

    dispatch(
      updateTaskColumn({
        boardId: board.boardId,
        taskId: task.id,
        from: sourceCol,
        to: destCol,
      }),
    );
  };

  return (
    <div className="min-h-screen bg-[#fff] p-6 flex flex-col">
      <div className="w-full flex gap-10 max-w-3xl mx-auto mb-10 justify-center ">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Enter Board ID..."
            value={boardIdInput}
            onChange={(e) => setBoardIdInput(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-[#f6b83d] 
         focus:outline-none focus:ring-2 focus:ring-[#f6b83d]
         focus:border-[#f6b83d] transition"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <IoIosSearch size={22} />
          </span>
        </div>
        <div className="flex gap-8">
          <button
            onClick={loadBoard}
            className="px-4  py-2 bg-[#f6b83d] rounded-full border text-white  hover:bg-white  hover:border-[#f6b83d] hover:text-[#f6b83d] transition"
          >
            Load
          </button>

          <button
            onClick={() => setIsBoardsModalOpen(true)}
            className="px-4 py-2 bg-white  text-[#f6b83d] border-1 border-[#f6b83d]  rounded-full  hover:bg-[#f6b83d] hover:text-white transition"
          >
            Show all boards
          </button>
        </div>
      </div>

      {isBoardsModalOpen && (
        <BoardsModal onClose={() => setIsBoardsModalOpen(false)} />
      )}

      <h2 className="text-3xl font-bold text-center mb-8">
        Your board: {board.name}
      </h2>

      <CreateNewTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        boardId={board.boardId}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {TASKS_STATUSES.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 flex-1"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-700 text-center">
                    {statusTitles[status as ColumnType]}
                  </h3>

                  {board.columns[status as ColumnType].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <SingleTask
                            task={task}
                            column={status as ColumnType}
                            boardId={board.boardId}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                  {status === "todo" && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-500 
                rounded-lg p-8 text-gray-500 hover:border-[#f9b020] hover:text-[#f9b020] transition"
                    >
                      <span className="text-xl">+</span>
                      <span className="text-sm font-medium">Add new task</span>
                    </button>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskPage;
