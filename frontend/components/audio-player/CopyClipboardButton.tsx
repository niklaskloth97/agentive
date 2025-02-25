// Credits to https://github.com/srothgan/transcript-editor
// code used by permission
import React from 'react';
import { FaCopy } from "react-icons/fa";
import { toast } from "sonner";

interface CopyClipboardButtonProps {
  hour: string;
  min: string;
  sec: string;
}

export default function CopyClipboardButton({ 
  hour, 
  min, 
  sec 
}: CopyClipboardButtonProps): React.ReactElement {
  const copyToClipboard = async (): Promise<void> => {
    const formattedTime = `[${hour}:${min}:${sec}]`;
    
    try {
      // Use navigator.clipboard if available
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(formattedTime);
        toast.success("Copied to Clipboard.");
      } else {
        // Fallback for mobile browsers: create a temporary input
        const tempInput = document.createElement("input");
        tempInput.value = formattedTime;
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, tempInput.value.length); // For iOS compatibility
    
        try {
          document.execCommand("copy");
          toast.success("Copied to Clipboard.");
        } catch (err) {
          console.error("Fallback copy failed:", err);
          toast.error("Failed to copy timestamp to Clipboard.");
        } finally {
          document.body.removeChild(tempInput);
        }
      }
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      toast.error("Failed to copy timestamp to Clipboard.");
    }
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      aria-label="Copy current time to clipboard"
    >
      <FaCopy />
    </button>
  );
}