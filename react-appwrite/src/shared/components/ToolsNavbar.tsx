import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "~/shared/components/ui/button";
import {
  Sun,
  Moon,
  Palette,
  Home,
  Menu,
  X,
  Search,
  Command,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import ThemeSelector from "./ThemeSelector";

// Search data
const searchableItems = [
  {
    id: "vscode",
    title: "VS Code Editor",
    path: "/tools/vscode",
    category: "Editors",
    description: "Browser-based code editor",
  },
  {
    id: "terminal",
    title: "Web Terminal",
    path: "/tools/terminal",
    category: "Development",
    description: "Interactive terminal",
  },
  {
    id: "tools",
    title: "All Tools",
    path: "/tools",
    category: "Navigation",
    description: "View all developer tools",
  },
];

export function ToolsNavbar() {
  const { currentTheme, setTheme, theme } = useTheme();
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(searchableItems);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Check if current theme is light or dark
  const isLightTheme =
    currentTheme.includes("light") || currentTheme === "monochromelhc";

  const toggleTheme = () => {
    // Simple light/dark toggle
    if (isLightTheme) {
      setTheme("monochromehc");
    } else {
      setTheme("monochromelhc");
    }
  };

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults(searchableItems);
    } else {
      const filtered = searchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(filtered);
    }
  };

  // Handle search item click
  const handleSearchItemClick = (path: string) => {
    navigate({ to: path });
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults(searchableItems);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      // Escape to close search
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults(searchableItems);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-gray-900/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Home className="h-5 w-5 text-blue-400" />
              </Link>
            </div>

            {/* Search Bar - Desktop */}
            <div
              className="hidden md:block flex-1 max-w-md mx-4 relative"
              ref={searchContainerRef}
            >
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Search className="h-4 w-4" />
                <span className="flex-1 text-left text-sm">
                  Search tools...
                </span>
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-900 border border-gray-700 rounded">
                  <Command className="h-3 w-3" />K
                </kbd>
              </button>

              {/* Search Dropdown */}
              {searchOpen && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden">
                  <div className="p-3 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search tools, pages..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {searchResults.length === 0 ? (
                      <div className="p-4 text-center text-gray-400 text-sm">
                        No results found
                      </div>
                    ) : (
                      <div className="py-2">
                        {searchResults.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleSearchItemClick(item.path)}
                            className="w-full px-4 py-3 hover:bg-gray-700 text-left transition-colors flex items-start space-x-3 group"
                          >
                            <div className="mt-1">
                              {item.category === "Editors" && (
                                <Search className="h-4 w-4 text-blue-400" />
                              )}
                              {item.category === "Development" && (
                                <Command className="h-4 w-4 text-green-400" />
                              )}
                              {item.category === "Navigation" && (
                                <Home className="h-4 w-4 text-purple-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-400 truncate">
                                {item.description}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {item.category}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-700 bg-gray-900 text-xs text-gray-500 flex items-center justify-between">
                    <span>Press ESC to close</span>
                    <span>↑↓ to navigate</span>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center space-x-2">
              {/* Quick Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-gray-300 hover:text-white"
                title={
                  isLightTheme ? "Switch to Dark Mode" : "Switch to Light Mode"
                }
              >
                {isLightTheme ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              {/* Theme Selector */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowThemeSelector(true)}
                className="text-gray-300 hover:text-white"
                title="Choose Theme"
              >
                <Palette className="h-5 w-5" />
              </Button>

              {/* User Menu Placeholder */}
              <Button variant="ghost" size="sm" className="ml-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                  U
                </div>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="sm:hidden flex items-center space-x-2">
              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="text-gray-300 hover:text-white md:hidden"
                title="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/tools"
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Developer Tools
              </Link>

              <div className="flex items-center space-x-2 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="flex-1 justify-start text-gray-300 hover:text-white"
                >
                  {isLightTheme ? (
                    <>
                      <Moon className="h-5 w-5 mr-2" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="h-5 w-5 mr-2" />
                      Light Mode
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowThemeSelector(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 justify-start text-gray-300 hover:text-white"
                >
                  <Palette className="h-5 w-5 mr-2" />
                  Themes
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Theme Selector Modal */}
      <ThemeSelector
        show={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
      />

      {/* Mobile Search Modal */}
      {searchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="h-full flex flex-col">
            <div className="bg-gray-900 border-b border-gray-800 p-4">
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search tools, pages..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                    setSearchResults(searchableItems);
                  }}
                  className="text-gray-400"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-900">
              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  No results found
                </div>
              ) : (
                <div className="py-2">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSearchItemClick(item.path)}
                      className="w-full px-4 py-4 hover:bg-gray-800 text-left transition-colors flex items-start space-x-3 border-b border-gray-800"
                    >
                      <div className="mt-1">
                        {item.category === "Editors" && (
                          <Search className="h-5 w-5 text-blue-400" />
                        )}
                        {item.category === "Development" && (
                          <Command className="h-5 w-5 text-green-400" />
                        )}
                        {item.category === "Navigation" && (
                          <Home className="h-5 w-5 text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium mb-1">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          {item.description}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 px-2 py-1 bg-gray-800 rounded">
                        {item.category}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
