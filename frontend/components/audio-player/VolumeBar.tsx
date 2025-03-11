"use client";

import React, { useState, useEffect } from "react";

// Credits to https://github.com/srothgan/transcript-editor
// code used by permission

interface VolumeBarProps {
  volume: number;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VolumeBar({ volume, handleVolumeChange }: VolumeBarProps) {
  const [hasTouchScreen, setHasTouchScreen] = useState<boolean>(false);

  useEffect(() => {
    let isTouchDevice = false;

    if ("maxTouchPoints" in navigator) {
      isTouchDevice = navigator.maxTouchPoints > 0;
    }  else {
      const mQ = window.matchMedia && window.matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        isTouchDevice = !!mQ.matches;
      } else if ('orientation' in window) {
        isTouchDevice = true;
      } else {
        const UA = (navigator as Navigator).userAgent;
        isTouchDevice = (
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
      }
    }

    setHasTouchScreen(isTouchDevice);
  }, []);

  if (hasTouchScreen) return null;

  return (
    <div className="flex items-center space-x-2 justify-end w-40">
      <label htmlFor='volume' className="text-sm font-medium">Volume:</label>
      <input
        type="range"
        name='volume'
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-16 h-2 bg-gray-200 rounded-lg cursor-pointer"
      />
    </div>
  );
}