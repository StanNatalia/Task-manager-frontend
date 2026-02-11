import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState, useRef } from "react";
import {
  fetchBoard,
  fetchBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} from "../redux/boards/boardsThunks";
import { FaRegCopy } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { IoMdClose } from "react-icons/io";

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

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchBoards());

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [dispatch, onClose]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSelect = (boardId: string) => {
    dispatch(fetchBoard(boardId));
    onClose();
  };

  const createBoardHandler = async () => {
    const name = newBoardName.trim();
    if (!name) return;

    try {
      await dispatch(createBoard(name)).unwrap();
      setNewBoardName("");
      inputRef.current?.focus();
    } catch (err) {
      console.error("Failed to create board:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createBoardHandler();
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

    const res = await dispatch(fetchBoards()).unwrap();

    if (res.length > 0) {
      dispatch(fetchBoard(res[0].boardId));
    } else {
      dispatch({ type: "boards/fetchBoard/fulfilled", payload: null });
    }
  };

  const handleCopyId = (boardId: string) => {
    navigator.clipboard.writeText(boardId).then(() => {
      setCopiedBoardId(boardId);
    });
  };

  const myPromise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
      resolve;
    } else {
      reject;
    }
  });
  myPromise
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-[#fff] rounded-xl p-8 w-full max-w-[450px] mx-5 shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#f6b83d] transition"
        >
          <IoMdClose size={25} />
        </button>

        <h3 className="text-2xl font-bold mb-4 text-center">All Boards</h3>

        {loading && (
          <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <RotatingLines height="80" width="80" color="#f6b83d" />
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-2xl text-red-500 py-15">{error}</div>
        )}

        {!loading && !error && boards.length === 0 && (
          <div className="text-center text-2xl text-[#f6b83d] py-15">
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
                    className="border mr-3 rounded px-2 py-1 flex-1 border-[#f6b83d] 
                    focus:outline-none focus:ring-2 focus:ring-[#f6b83d]"
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
                        className="text-[#f6b83d]"
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

                <div className="flex gap-2">
                  {editingBoardId === b.boardId ? (
                    <button
                      onClick={saveEdit}
                      className="px-4 py-2 bg-white text-[#f6b83d] border border-[#f6b83d] rounded-full
        hover:bg-[#f6b83d] hover:text-white transition text-sm sm:text-base w-full sm:w-auto"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(b.boardId, b.name)}
                      className="px-4 py-2 bg-[#f6b83d] rounded-full border text-white  
        hover:bg-white hover:border-[#f6b83d] hover:text-[#f6b83d] transition text-sm sm:text-base w-full sm:w-auto"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(b.boardId)}
                    className="px-4 py-2 bg-white text-[#f6b83d] border border-[#f6b83d] rounded-full
        hover:bg-[#f6b83d] hover:text-white transition text-sm sm:text-base w-full sm:w-auto"
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
            ref={inputRef}
            type="text"
            placeholder="New board name..."
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border rounded px-2 py-1 flex-1 border-[#f6b83d] 
            focus:outline-none focus:ring-2 focus:ring-[#f6b83d]"
          />
          <button
            onClick={createBoardHandler}
            className="bg-[#f6b83d] text-white px-3 rounded hover:bg-[#f9b020]"
          >
            Add
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-white bg-[#f6b83d] rounded-lg py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BoardsModal;
