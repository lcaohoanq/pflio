import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeVariant =
  | "cyber-dark"
  | "neon-purple"
  | "matrix-green"
  | "ocean-blue"
  | "sunset-orange"
  | "monochrome"
  | "monochromehc"
  | "monochromelhc"
  | "galaxy-purple"
  | "terminal-hacker"
  | "rose-gold"
  | "arctic-blue";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  glow: string;
  gradient: string;
  particle: string;
}

interface Theme {
  name: string;
  colors: ThemeColors;
  icon: string;
  description: string;
}

const themes: Record<ThemeVariant, Theme> = {
  "cyber-dark": {
    name: "Cyber Dark",
    icon: "🤖",
    description: "Futuristic cyberpunk aesthetic",
    colors: {
      primary: "#00ffff",
      secondary: "#ff0080",
      accent: "#ffff00",
      background:
        "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      surface: "rgba(0, 255, 255, 0.1)",
      text: "#ffffff",
      textSecondary: "#b0b0b0",
      border: "#00ffff",
      glow: "#00ffff",
      gradient: "linear-gradient(45deg, #00ffff, #ff0080)",
      particle: "#00ffff",
    },
  },
  "neon-purple": {
    name: "Neon Purple",
    icon: "💜",
    description: "Vibrant neon aesthetics",
    colors: {
      primary: "#8b5cf6",
      secondary: "#ec4899",
      accent: "#06ffa5",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      surface: "rgba(139, 92, 246, 0.15)",
      text: "#ffffff",
      textSecondary: "#e2e8f0",
      border: "#8b5cf6",
      glow: "#8b5cf6",
      gradient: "linear-gradient(45deg, #8b5cf6, #ec4899)",
      particle: "#8b5cf6",
    },
  },
  "matrix-green": {
    name: "Matrix Green",
    icon: "🔋",
    description: "Retro terminal vibes",
    colors: {
      primary: "#00ff41",
      secondary: "#39ff14",
      accent: "#00ffff",
      background:
        "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)",
      surface: "rgba(0, 255, 65, 0.1)",
      text: "#00ff41",
      textSecondary: "#7d8590",
      border: "#00ff41",
      glow: "#00ff41",
      gradient: "linear-gradient(45deg, #00ff41, #39ff14)",
      particle: "#00ff41",
    },
  },
  "ocean-blue": {
    name: "Ocean Blue",
    icon: "🌊",
    description: "Deep ocean tranquility",
    colors: {
      primary: "#3b82f6",
      secondary: "#06b6d4",
      accent: "#10b981",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      surface: "rgba(59, 130, 246, 0.15)",
      text: "#ffffff",
      textSecondary: "#cbd5e1",
      border: "#3b82f6",
      glow: "#3b82f6",
      gradient: "linear-gradient(45deg, #3b82f6, #06b6d4)",
      particle: "#3b82f6",
    },
  },
  "sunset-orange": {
    name: "Sunset Orange",
    icon: "🌅",
    description: "Warm sunset gradients",
    colors: {
      primary: "#f97316",
      secondary: "#ef4444",
      accent: "#facc15",
      background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      surface: "rgba(249, 115, 22, 0.15)",
      text: "#ffffff",
      textSecondary: "#fed7aa",
      border: "#f97316",
      glow: "#f97316",
      gradient: "linear-gradient(45deg, #f97316, #ef4444)",
      particle: "#f97316",
    },
  },
  monochrome: {
    name: "Monochrome",
    icon: "⚫",
    description: "Elegant black and white",
    colors: {
      primary: "#ffffff",
      secondary: "#6b7280",
      accent: "#d1d5db",
      background:
        "linear-gradient(135deg, #111827 0%, #374151 50%, #4b5563 100%)",
      surface: "rgba(255, 255, 255, 0.1)",
      text: "#ffffff",
      textSecondary: "#d1d5db",
      border: "#ffffff",
      glow: "#ffffff",
      gradient: "linear-gradient(45deg, #ffffff, #6b7280)",
      particle: "#ffffff",
    },
  },
  monochromehc: {
    name: "Monochrome High Contrast",
    icon: "⚫",
    description: "High contrast black and white",
    colors: {
      primary: "#f1f1f1", // Soft white
      secondary: "#121212", // Soft black
      accent: "#f1f1f1", // Accent vẫn là trắng nhẹ
      background: "#121212", // Background chính là đen mềm
      surface: "#1e1e1e", // Layer trên nền, tối hơn một chút
      text: "#f1f1f1", // Text trắng
      textSecondary: "#c4c4c4", // Gray nhẹ cho secondary text
      border: "#f1f1f1", // Viền trắng mềm
      glow: "#f1f1f1", // Glow nhẹ
      gradient: "linear-gradient(45deg, #121212, #f1f1f1)", // Gradient rõ ràng giữa 2 màu
      particle: "#f1f1f1", // Hạt trang trí trắng
    },
  },
  monochromelhc: {
    name: "Monochrome Light Contrast",
    icon: "⚪",
    description: "High contrast white and black",
    colors: {
      primary: "#121212", // Soft black
      secondary: "#f1f1f1", // Soft white
      accent: "#121212", // Accent là đen nhẹ
      background: "#f1f1f1", // Background chính là trắng mềm
      surface: "#ffffff", // Layer trên nền, sáng hơn một chút
      text: "#121212", // Text đen
      textSecondary: "#3a3a3a", // Gray nhẹ cho secondary text
      border: "#121212", // Viền đen mềm
      glow: "#121212", // Glow nhẹ
      gradient: "linear-gradient(45deg, #f1f1f1, #121212)", // Gradient giữa 2 màu
      particle: "#121212", // Hạt trang trí đen
    },
  },

  "galaxy-purple": {
    name: "Galaxy Purple",
    icon: "🌌",
    description: "Deep space exploration",
    colors: {
      primary: "#a855f7",
      secondary: "#ec4899",
      accent: "#06b6d4",
      background:
        "linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #7c2d12 100%)",
      surface: "rgba(168, 85, 247, 0.15)",
      text: "#ffffff",
      textSecondary: "#e0e7ff",
      border: "#a855f7",
      glow: "#a855f7",
      gradient: "linear-gradient(45deg, #a855f7, #ec4899)",
      particle: "#a855f7",
    },
  },
  "terminal-hacker": {
    name: "Terminal Hacker",
    icon: "💻",
    description: "Classic hacker terminal",
    colors: {
      primary: "#00ff00",
      secondary: "#ffff00",
      accent: "#ff4500",
      background:
        "linear-gradient(135deg, #000000 0%, #0f172a 50%, #1e293b 100%)",
      surface: "rgba(0, 255, 0, 0.1)",
      text: "#00ff00",
      textSecondary: "#64748b",
      border: "#00ff00",
      glow: "#00ff00",
      gradient: "linear-gradient(45deg, #00ff00, #ffff00)",
      particle: "#00ff00",
    },
  },
  "rose-gold": {
    name: "Rose Gold",
    icon: "🌹",
    description: "Luxurious rose gold",
    colors: {
      primary: "#f472b6",
      secondary: "#fbbf24",
      accent: "#fb7185",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      surface: "rgba(244, 114, 182, 0.15)",
      text: "#ffffff",
      textSecondary: "#fdf2f8",
      border: "#f472b6",
      glow: "#f472b6",
      gradient: "linear-gradient(45deg, #f472b6, #fbbf24)",
      particle: "#f472b6",
    },
  },
  "arctic-blue": {
    name: "Arctic Blue",
    icon: "❄️",
    description: "Cool arctic atmosphere",
    colors: {
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      accent: "#67e8f9",
      background:
        "linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #0ea5e9 100%)",
      surface: "rgba(14, 165, 233, 0.15)",
      text: "#ffffff",
      textSecondary: "#e0f2fe",
      border: "#0ea5e9",
      glow: "#0ea5e9",
      gradient: "linear-gradient(45deg, #0ea5e9, #06b6d4)",
      particle: "#0ea5e9",
    },
  },
};

interface ThemeContextType {
  currentTheme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  theme: Theme;
  availableThemes: Record<ThemeVariant, Theme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] =
    useState<ThemeVariant>("monochromelhc");

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeVariant;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to CSS variables
    const theme = themes[currentTheme];
    const root = document.documentElement;

    // Set CSS custom properties
    root.style.setProperty("--theme-primary", theme.colors.primary);
    root.style.setProperty("--theme-secondary", theme.colors.secondary);
    root.style.setProperty("--theme-accent", theme.colors.accent);
    root.style.setProperty("--theme-background", theme.colors.background);
    root.style.setProperty("--theme-surface", theme.colors.surface);
    root.style.setProperty("--theme-text", theme.colors.text);
    root.style.setProperty(
      "--theme-text-secondary",
      theme.colors.textSecondary,
    );
    root.style.setProperty("--theme-border", theme.colors.border);
    root.style.setProperty("--theme-glow", theme.colors.glow);
    root.style.setProperty("--theme-gradient", theme.colors.gradient);
    root.style.setProperty("--theme-particle", theme.colors.particle);

    // Save to localStorage
    localStorage.setItem("portfolio-theme", currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: ThemeVariant) => {
    setCurrentTheme(theme);
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    theme: themes[currentTheme],
    availableThemes: themes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
