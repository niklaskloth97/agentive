// Credits to https://github.com/srothgan/transcript-editor
// code used by permission
"use client";

import { useRef, useState, useEffect } from "react";
import DeleteButton from "./audio-player/DeleteButton";
import PlaybackSpeed from "./audio-player/PlaybackSpeed";
import VolumeBar from "./audio-player/VolumeBar";
import CopyClipboardButton from "./audio-player/CopyClipboardButton";
import ActionBar from "./audio-player/ActionBar";
import ProgressBar from "./audio-player/ProgressBar";
import TimeInput from "./audio-player/TimeInput";
import { toast } from 'sonner';

interface AudioElement extends HTMLAudioElement {
  playbackRate: number;
}

const AudioPlayer = (): JSX.Element => {
  const audioRef = useRef<AudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(1);

  const [sec, setSec] = useState<string>('00');
  const [min, setMin] = useState<string>('00');
  const [hour, setHour] = useState<string>('00');
  const [activeInput, setActiveInput] = useState<"hour" | "minute" | "second" | null>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file?.type.startsWith("audio")) {
      const fileURL = URL.createObjectURL(file);
      setAudioFile(fileURL);
      setCurrentTime(0);
      setIsPlaying(false);
    } else {
      toast.error("Please upload a valid audio file.");
    }
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

  const formatTimeUnit = (unit: number): string => 
    unit.toString().padStart(2, "0");

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.onloadedmetadata = () => setDuration(audio.duration);
      audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    }
  }, [audioFile]);

  useEffect(() => {
    if (activeInput !== "hour") {
      const hours = Math.floor(currentTime / 3600);
      setHour(formatTimeUnit(hours));
    }
    if (activeInput !== "minute") {
      const minutes = Math.floor((currentTime % 3600) / 60);
      setMin(formatTimeUnit(minutes));
    }
    if (activeInput !== "second") {
      const seconds = Math.floor(currentTime % 60);
      setSec(formatTimeUnit(seconds));
    }
  }, [currentTime, activeInput]);

  const handleTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    unit: "hour" | "minute" | "second",
    setter: (value: string) => void
  ): void => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) {
      toast.error(`Invalid input in ${unit} field. Only numbers are allowed.`);
      return;
    }

    const newValue = Number.parseInt(value, 10) || 0;
    const multiplier = unit === "hour" ? 3600 : unit === "minute" ? 60 : 1;
    
    const newTime = (unit === "hour" ? newValue * 3600 : Number.parseInt(hour, 10) * 3600) +
                    (unit === "minute" ? newValue * 60 : Number.parseInt(min, 10) * 60) +
                    (unit === "second" ? newValue : Number.parseInt(sec, 10));

    setter(formatTimeUnit(newValue));
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>): void => 
    handleTimeChange(event, "hour", setHour);

  const handleMinuteChange = (event: React.ChangeEvent<HTMLInputElement>): void => 
    handleTimeChange(event, "minute", setMin);

  const handleSecondChange = (event: React.ChangeEvent<HTMLInputElement>): void => 
    handleTimeChange(event, "second", setSec);

  const handleDeleteAudio = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
    }
    setAudioFile(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setPlaybackRate(1);
    setVolume(1);
    setSec('00');
    setMin('00');
    setHour('00');
    setActiveInput(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <div className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Header */}
      <div className='w-full bg-gradient-to-r from-slate-600 to-slate-800 text-white px-2 py-1 rounded-t-lg'>
        <p className="text-xl font-semibold tracking-wide italic">Audio Player</p>
      </div>
      <div className="flex flex-col w-full px-3 md:px-6  py-3">
        <label htmlFor="audio" className="font-semibold">Upload Audio File:</label>
        <div className="flex items-center gap-4 rounded-lg w-full py-2">
          <input
            type="file"
            name="audio"
            accept="audio/mpeg, audio/mp3, audio/wav, audio/aac, audio/mp4, audio/m4a, audio/ogg, audio/webm, audio/x-aiff, audio/x-wav, audio/flac, audio/opus, audio/3gpp, audio/amr"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="block w-fit text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {audioFile && (
        <div className='px-3 md:px-6 pb-6 w-full flex flex-col'>
          <audio
            ref={audioRef}
            src={audioFile}
            onTimeUpdate={() => {
              if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
              }
            }}
          />

          
          <div className="flex w-full mb-2">
            <TimeInput
              hour={hour}
              min={min}
              sec={sec}
              handleHourChange={handleHourChange}
              handleMinuteChange={handleMinuteChange}
              handleSecondChange={handleSecondChange}
              setActiveInput={setActiveInput}
            />
            <CopyClipboardButton hour={hour} min={min} sec={sec} />
            <DeleteButton handleDeleteAudio={handleDeleteAudio} />
          </div>

          
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
            {/* Speed Control */}
            <PlaybackSpeed playbackRate={playbackRate} setPlaybackRate={setPlaybackRate}/>

            {/* Volume Control */}
            <VolumeBar volume={volume} handleVolumeChange={handleVolumeChange}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;