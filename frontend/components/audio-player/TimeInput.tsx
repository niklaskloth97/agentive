// Credits to https://github.com/srothgan/transcript-editor
// code used by permission
import React from "react";
//import { useToast } from "@/hooks/use-toast";
//import { Toaster as useToast } from "@/hooks/use-toast"
//import { Toaster as toast } from "@/components/ui/sonner"
import {toast} from 'sonner';
interface TimeInputProps {
  hour: string;
  min: string;
  sec: string;
  handleHourChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMinuteChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSecondChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setActiveInput: (input: "hour" | "minute" | "second" | null) => void;
}

export default function TimeInput({
    hour,
    min,
    sec,
    handleHourChange,
    handleMinuteChange,
    handleSecondChange,
    setActiveInput,
  }: TimeInputProps) {
    // Helper function to validate numeric input
    const validateInput = (value: string, name: string): boolean => {
      if (!/^\d*$/.test(value)) {
        //message = "Invalid input in ${name} field. Only numbers are allowed.";
        toast.error(`Invalid input in field. Only numbers are allowed.`);
        return false;
      }
      return true;
    };

  return (
    <div className="flex items-center space-x-1 bg-white border border-slate-500 rounded-lg px-2 py-1">
      <input
        type="text"
        name="hour"
        value={hour}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (validateInput(e.target.value, 'hour')) {
            handleHourChange(e);
          }
        }}
        onFocus={() => setActiveInput("hour")}
        onBlur={() => setActiveInput(null)}
        className="w-10 px-2 text-center focus:outline-none"
        placeholder="HH"
      />
      <span>:</span>
      <input
        type="text"
        name="min"
        value={min}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (validateInput(e.target.value, 'minute')) {
            handleMinuteChange(e);
          }
        }}
        onFocus={() => setActiveInput("minute")}
        onBlur={() => setActiveInput(null)}
        className="w-10 px-2 text-center focus:outline-none"
        placeholder="MM"
      />
      <span>:</span>
      <input
        type="text"
        name="sec"
        value={sec}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (validateInput(e.target.value, 'second')) {
            handleSecondChange(e);
          }
        }}
        onFocus={() => setActiveInput("second")}
        onBlur={() => setActiveInput(null)}
        className="w-10 px-2 text-center focus:outline-none"
        placeholder="SS"
      />
    </div>
  );
}