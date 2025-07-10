import React from "react";

interface KeyboardHintsProps {
  show: boolean;
}

const KeyboardHints: React.FC<KeyboardHintsProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg text-sm z-40 transition-all duration-300">
      <h4 className="font-semibold mb-2 text-xs text-gray-300">
        KEYBOARD SHORTCUTS
      </h4>
      <div className="space-y-1 text-xs">
        <div className="flex items-center space-x-2">
          <kbd className="bg-white/20 px-2 py-1 rounded text-xs">↑ ↓</kbd>
          <span>Navigate sections</span>
        </div>
        <div className="flex items-center space-x-2">
          <kbd className="bg-white/20 px-2 py-1 rounded text-xs">
            Mouse wheel
          </kbd>
          <span>Scroll sections</span>
        </div>
        <div className="flex items-center space-x-2">
          <kbd className="bg-white/20 px-2 py-1 rounded text-xs">Touch</kbd>
          <span>Swipe on mobile</span>
        </div>
      </div>
    </div>
  );
};

export default KeyboardHints;
