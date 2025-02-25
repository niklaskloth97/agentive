// Credits to https://github.com/srothgan/transcript-editor
// code used by permission
import React from 'react';
import { FaTrashAlt } from "react-icons/fa";

interface DeleteButtonProps {
  handleDeleteAudio: () => void;
}

export default function DeleteButton({ handleDeleteAudio }: DeleteButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={handleDeleteAudio}
      className="ml-2 px-2 py-1 bg-slate-200 text-red-600 rounded-md transition justify-center items-center"
      aria-label="Delete Audio"
    >
      <FaTrashAlt size={18} />
    </button>
  );
}