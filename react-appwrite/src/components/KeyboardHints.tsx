import React from "react";
import { useTheme } from "./ThemeProvider";

interface KeyboardHintsProps {
  show: boolean;
}

const KeyboardHints: React.FC<KeyboardHintsProps> = ({ show }) => {
  const { theme } = useTheme();

  if (!show) return null;

  return (
    <div
      className="fixed bottom-4 left-4 backdrop-blur-md rounded-xl border shadow-2xl p-4 text-sm z-50 transition-all duration-300 transform hover:scale-105"
      style={{
        background: `${theme.colors.surface}, rgba(0, 0, 0, 0.8)`,
        borderColor: theme.colors.border + "40",
        color: theme.colors.text,
        boxShadow: `0 0 20px ${theme.colors.glow}20`,
      }}
    >
      <h4
        className="font-semibold mb-3 text-xs flex items-center space-x-2"
        style={{ color: theme.colors.primary }}
      >
        <span>⌨️</span>
        <span>KEYBOARD SHORTCUTS</span>
      </h4>
      <div className="space-y-2 text-xs">
        <div className="flex items-center space-x-3">
          <kbd
            className="px-2 py-1 rounded text-xs font-mono border"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border + "60",
              color: theme.colors.text,
            }}
          >
            ↑ ↓
          </kbd>
          <span style={{ color: theme.colors.textSecondary }}>
            Navigate sections
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <kbd
            className="px-2 py-1 rounded text-xs font-mono border"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border + "60",
              color: theme.colors.text,
            }}
          >
            Wheel
          </kbd>
          <span style={{ color: theme.colors.textSecondary }}>
            Scroll sections
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <kbd
            className="px-2 py-1 rounded text-xs font-mono border"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border + "60",
              color: theme.colors.text,
            }}
          >
            H
          </kbd>
          <span style={{ color: theme.colors.textSecondary }}>
            Toggle this help
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <kbd
            className="px-2 py-1 rounded text-xs font-mono border"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border + "60",
              color: theme.colors.text,
            }}
          >
            T
          </kbd>
          <span style={{ color: theme.colors.textSecondary }}>
            Change theme
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <kbd
            className="px-2 py-1 rounded text-xs font-mono border"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border + "60",
              color: theme.colors.text,
            }}
          >
            Touch
          </kbd>
          <span style={{ color: theme.colors.textSecondary }}>
            Swipe on mobile
          </span>
        </div>
      </div>
    </div>
  );
};

export default KeyboardHints;
