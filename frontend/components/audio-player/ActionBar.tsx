// Credits to https://github.com/srothgan/transcript-editor
// code used and adapted by permission

import React from 'react';
import { FaPlay, FaPause } from "react-icons/fa";
import {Play, Pause, SkipBack,SkipForward} from "lucide-react";
import {Button} from "@/components/ui/button";

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
       
       <Button
        variant="white"
        onClick={() => skipTime(-5)}
      >
        <SkipBack/>
      </Button>
      <Button
        variant="white"
        onClick={togglePlay}
        
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>
      
      <Button
        variant="white"
        onClick={() => skipTime(5)}
      >
       <SkipForward/>
      </Button>
    </div>
  );
}