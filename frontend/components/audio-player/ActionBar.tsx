// Credits to https://github.com/srothgan/transcript-editor
// code used and adapted by permission

import React from 'react';
import { FaPlay, FaPause } from "react-icons/fa";

interface ActionBarProps {
  isPlaying: boolean;
  togglePlay: () => void;
  skipTime: (seconds: number) => void;
}

export default function ActionBar({ 
  isPlaying, 
  togglePlay, 
  skipTime 
}: ActionBarProps): React.ReactElement {
  return (
    <div className="flex w-full justify-center gap-2">
      <button
        type="button"
        onClick={() => skipTime(-10)}
        className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        -10s
      </button>
      <button
        type="button"
        onClick={() => skipTime(-5)}
        className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        -5s
      </button>
      <button
        type="button"
        onClick={() => skipTime(-1)}
        className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        -1s
      </button>
      <button
        type="button"
        onClick={togglePlay}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button
        type="button"
        onClick={() => skipTime(1)}
        className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        +1s
      </button>
      <button
        type="button"
        onClick={() => skipTime(5)}
        className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        +5s
      </button>
      <button
        type="button"
        onClick={() => skipTime(10)}
        className="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        +10s
      </button>
    </div>
  );
}