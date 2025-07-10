import React, { useState } from "react";
import { useTheme, ThemeVariant } from "./ThemeProvider";

interface ThemeSelectorProps {
  show: boolean;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ show, onClose }) => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  if (!show) return null;

  const filteredThemes = Object.entries(availableThemes).filter(
    ([key, theme]) =>
      theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theme.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleThemeSelect = (themeKey: string) => {
    setTheme(themeKey as ThemeVariant);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <span className="text-2xl">🎨</span>
              <span>Theme Selector</span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl transition-colors"
              aria-label="Close theme selector"
            >
              ×
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search themes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
            />
            <div className="absolute right-3 top-2.5 text-gray-400">🔍</div>
          </div>
        </div>

        {/* Theme Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredThemes.map(([key, theme]) => (
              <div
                key={key}
                onClick={() => handleThemeSelect(key)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group ${
                  currentTheme === key
                    ? "border-white/60 bg-white/10"
                    : "border-white/20 bg-white/5 hover:border-white/40"
                }`}
                style={{
                  background: `${theme.colors.surface}, ${theme.colors.background}`,
                }}
              >
                {/* Current theme indicator */}
                {currentTheme === key && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    ✓
                  </div>
                )}

                {/* Theme Preview */}
                <div className="mb-3">
                  <div
                    className="h-8 rounded-lg mb-2"
                    style={{ background: theme.colors.gradient }}
                  />
                  <div className="flex space-x-1">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                </div>

                {/* Theme Info */}
                <div className="text-center">
                  <div className="text-2xl mb-1">{theme.icon}</div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    {theme.name}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {theme.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            Choose a theme that matches your style • {filteredThemes.length}{" "}
            themes available
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
