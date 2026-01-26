import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useEffect, useState } from "react";
import {
  fetchBoard,
  fetchBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} from "../features/boards/boardsThunks";
import { FaRegCopy } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";

type Props = {
  onClose: () => void;
};

const BoardsModal = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const boards = useSelector((state: RootState) => state.boards.boards);
  const loading = useSelector((state: RootState) => state.boards.loadingBoards);
  const error = useSelector((state: RootState) => state.boards.error);

  const [newBoardName, setNewBoardName] = useState("");
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [copiedBoardId, setCopiedBoardId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleSelect = (boardId: string) => {
    dispatch(fetchBoard(boardId));
    onClose();
  };

  const handleCreateBoard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    try {
      await dispatch(createBoard(newBoardName.trim())).unwrap();
      setNewBoardName("");
    } catch (err) {
      console.error("Failed to create board:", err);
    }
  };

  const startEdit = (boardId: string, name: string) => {
    setEditingBoardId(boardId);
    setEditingName(name);
  };

  const saveEdit = async () => {
    if (!editingName.trim() || !editingBoardId) return;
    await dispatch(
      updateBoard({ boardId: editingBoardId, name: editingName.trim() }),
    );
    setEditingBoardId(null);
    setEditingName("");
    dispatch(fetchBoards());
  };

  const handleDelete = async (boardId: string) => {
    if (!confirm("Are you sure you want to delete this board?")) return;
    await dispatch(deleteBoard(boardId));
    dispatch(fetchBoards());
  };

  const handleCopyId = (boardId: string) => {
    navigator.clipboard.writeText(boardId).then(() => {
      setCopiedBoardId(boardId);
      setTimeout(() => setCopiedBoardId(null), 1500);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#fff] rounded-xl p-8 w-[450px] shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">All Boards</h3>

        {loading && (
          <div className="min-h-screen flex items-center justify-center bg-[gray-100]">
            <RotatingLines
              height="80"
              width="80"
              color="#f6b83d"
              ariaLabel="loading"
            />
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-red-500 py-6">{error}</div>
        )}

        {!loading && !error && boards.length === 0 && (
          <div className="text-center text-[#f6b83d] py-6">
            No boards found 😢
          </div>
        )}

        {!loading && boards.length > 0 && (
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {boards.map((b) => (
              <div
                key={b.boardId}
                className="flex items-center justify-between p-5 rounded-lg border border-[#f9b020] hover:bg-[#fff4df] transition"
              >
                {editingBoardId === b.boardId ? (
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border rounded px-2 py-1 flex-1 mr-2"
                  />
                ) : (
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleSelect(b.boardId)}
                  >
                    <div className="font-semibold">{b.name}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      ID: {b.boardId}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyId(b.boardId);
                        }}
                        className="text-[#f6b83d] hover:text-[#f9b020] transition"
                        title="Copy Board ID"
                      >
                        <FaRegCopy />
                      </button>
                      {copiedBoardId === b.boardId && (
                        <span className="text-[#f9b020] ml-1 text-xs">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-2">
                  {editingBoardId === b.boardId ? (
                    <button
                      onClick={saveEdit}
                      className=" bg-white border  px-3 py-2  text-[#f6b83d]   border-[#f6b83d]  rounded-full  hover:bg-[#f6b83d] hover:text-white transition font-semibold"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(b.boardId, b.name)}
                      className="bg-[#f6b83d] border px-3 py-2 rounded-full  text-white  hover:bg-white hover:text-[#f6b83d] hover:border-[#f6b83d] transition font-semibold"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(b.boardId)}
                    className="bg-[#f6b83d] border px-3 py-2 rounded-full  text-white  hover:bg-white hover:text-[#f6b83d] hover:border-[#f6b83d] transition font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="New board name..."
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            className="border rounded px-2 py-1 flex-1 border-[#f6b83d] 
         focus:outline-none focus:ring-2 focus:ring-[#f6b83d] rounded-lg
         focus:border-[#f6b83d] transition"
          />
          <button
            onClick={handleCreateBoard}
            className="bg-[#f6b83d] text-white px-3 rounded hover:bg-[#f9b020] transition"
          >
            Add
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-white bg-[#f6b83d] hover:bg-[#f9b020] rounded-lg py-2 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BoardsModal;
