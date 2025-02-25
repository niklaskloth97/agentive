// Credits to https://github.com/srothgan/transcript-editor
// code used by permission
import React from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
import {Button} from "@/components/ui/button";

interface PlaybackSpeedProps {
  playbackRate: number;
  setPlaybackRate: React.Dispatch<React.SetStateAction<number>>;
}

export default function PlaybackSpeed({ playbackRate, setPlaybackRate }: PlaybackSpeedProps) {
  const handleIncreaseSpeed = (): void => 
    setPlaybackRate((prev: number) => Math.min(3, Number.parseFloat((prev + 0.1).toFixed(1))));
    
  const handleDecreaseSpeed = (): void => 
    setPlaybackRate((prev: number) => Math.max(0.1, Number.parseFloat((prev - 0.1).toFixed(1))));

  return (
    <div className='w-full flex justify-start items-center gap-2'>
      <label htmlFor='speed' className="text-xs font-medium">
        Playback <br/>Speed:
      </label>
      <div className="flex items-center space-x-2">
         <Button
          variant="white"
          onClick={handleDecreaseSpeed}
          aria-label="Decrease Speed"
        >
          <FaMinus/>
        </Button>

        <div className='w-12 px-3 py-1 border border-slate-500 rounded-lg text-center font-bold'>
          {playbackRate}
        </div>

         <Button
          variant="white"
          onClick={handleIncreaseSpeed}
          aria-label="Increase Speed"
        >
          <FaPlus/>
        </Button>
      </div>
    </div>
  );
}