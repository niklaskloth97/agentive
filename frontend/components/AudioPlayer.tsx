"use client";

import { useRef, useState, useEffect } from "react";
import PlaybackSpeed from "./audio-player/PlaybackSpeed";
import VolumeBar from "./audio-player/VolumeBar";
import ActionBar from "./audio-player/ActionBar";
import ProgressBar from "./audio-player/ProgressBar";
import { toast } from 'sonner';

interface AudioPlayerProps {
  url: string;
}

interface AudioElement extends HTMLAudioElement {
  playbackRate: number;
}

const AudioPlayer = ({ url }: AudioPlayerProps): JSX.Element => {
  const audioRef = useRef<AudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  // const [sec, setSec] = useState<string>('00');
  // const [min, setMin] = useState<string>('00');
  // const [hour, setHour] = useState<string>('00');
  //const [activeInput, setActiveInput] = useState<"hour" | "minute" | "second" | null>(null);
  // const [activeInput] = useState<"hour" | "minute" | "second" | null>(null);
  // Reset player when URL changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      // setSec('00');
      // setMin('00');
      // setHour('00');
    }
  }, [url]);

  // Add this new useEffect for initial loading
  useEffect(() => {
    if (audioRef.current) {
      // Force metadata loading
      audioRef.current.load();
    }
  }, []); // Empty dependency array to run only on mount

  // Your existing helper functions
  const togglePlay = (): void => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      void audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipTime = (amount: number): void => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += amount;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!audioRef.current) return;
    const newTime = Number(event.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!audioRef.current) return;
    const newVolume = Number.parseFloat(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // const formatTimeUnit = (unit: number): string => 
  //   unit.toString().padStart(2, "0");

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => {
        console.log('Metadata loaded, duration:', audio.duration);
        setDuration(audio.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);

      // Clean up listeners
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [url]);

  // useEffect(() => {
  //   if (activeInput !== "hour") {
  //     const hours = Math.floor(currentTime / 3600);
  //     setHour(formatTimeUnit(hours));
  //   }
  //   if (activeInput !== "minute") {
  //     const minutes = Math.floor((currentTime % 3600) / 60);
  //     setMin(formatTimeUnit(minutes));
  //   }
  //   if (activeInput !== "second") {
  //     const seconds = Math.floor(currentTime % 60);
  //     setSec(formatTimeUnit(seconds));
  //   }
  // }, [currentTime, activeInput]);

  // const handleTimeChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   unit: "hour" | "minute" | "second",
  //   setter: (value: string) => void
  // ): void => {
  //   const value = event.target.value;
  //   if (!/^\d*$/.test(value)) {
  //     toast.error(`Invalid input in ${unit} field. Only numbers are allowed.`);
  //     return;
  //   }

  //   const newValue = Number.parseInt(value, 10) || 0;
  //   // const multiplier = unit === "hour" ? 3600 : unit === "minute" ? 60 : 1;
    
  //   const newTime = (unit === "hour" ? newValue * 3600 : Number.parseInt(hour, 10) * 3600) +
  //                   (unit === "minute" ? newValue * 60 : Number.parseInt(min, 10) * 60) +
  //                   (unit === "second" ? newValue : Number.parseInt(sec, 10));

  //   setter(formatTimeUnit(newValue));
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = newTime;
  //     setCurrentTime(newTime);
  //   }
  // };


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="flex flex-col items-start w-full bg-white">
      {/* Header */}
      {/* <div className='w-full bg-gradient-to-r from-slate-600 to-slate-800 text-white px-2 py-1 rounded-t-lg'>
        <p className="text-xl font-semibold tracking-wide italic">Audio Player</p>
      </div> */}
      <div className='mb-2 w-full flex flex-col'>
        <audio
          ref={audioRef}
          src={url}
          preload="metadata"
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
              console.log('Metadata reloaded:', audioRef.current.duration);
            }
          }}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          onError={(e) => {
            console.error('Audio error:', e);
            toast.error('Error loading audio file');
          }}
        />


        <ProgressBar
          duration={duration}
          currentTime={currentTime}
          handleProgressChange={handleProgressChange}
          formatTime={formatTime}
        />

        {/* Play, stop, skip buttons */}
        <div className="flex flex-row justify-center items-center w-full mb-4">
          <ActionBar isPlaying={isPlaying} togglePlay={togglePlay} skipTime={skipTime}/>
        </div>

        {/* Controls grid */}
        <div className="flex flex-row justify-between items-center w-full">
          {/* Speed Control
          <PlaybackSpeed playbackRate={playbackRate} setPlaybackRate={setPlaybackRate}/> */}

          {/* Volume Control */}
          <VolumeBar volume={volume} handleVolumeChange={handleVolumeChange}/>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;