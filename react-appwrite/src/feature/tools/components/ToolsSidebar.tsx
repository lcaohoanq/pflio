import React, { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "~/shared/components/ui/button";
import {
  Code2,
  Terminal as TerminalIcon,
  Home,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Database,
  Network,
  Settings,
  FileJson,
} from "lucide-react";
import { cn } from "~/shared/utils/utils";

type Tool = {
  id: string;
  title: string;
  icon: React.ElementType;
  path: string;
  description: string;
};

type ToolGroup = {
  groupTitle: string;
  tools: Tool[];
};

const toolGroups: ToolGroup[] = [
  {
    groupTitle: "Editors",
    tools: [
      {
        id: "vscode",
        title: "Code Editor",
        icon: Code2,
        path: "/tools/vscode",
        description: "Browser-based Monaco Editor",
      },
      {
        id: "json-editor",
        title: "JSON Editor",
        icon: FileJson,
        path: "/tools/json-editor",
        description: "Format and validate JSON",
      },
    ],
  },
  {
    groupTitle: "Development",
    tools: [
      {
        id: "terminal",
        title: "Web Terminal",
        icon: TerminalIcon,
        path: "/tools/terminal",
        description: "Interactive terminal environment",
      },
    ],
  },
  {
    groupTitle: "Database",
    tools: [
      {
        id: "sql-client",
        title: "SQL Client",
        icon: Database,
        path: "/tools/sql-client",
        description: "Query and manage databases",
      },
    ],
  },
  {
    groupTitle: "Network",
    tools: [
      {
        id: "api-tester",
        title: "API Tester",
        icon: Network,
        path: "/tools/api-tester",
        description: "Test REST APIs",
      },
    ],
  },
  {
    groupTitle: "Utilities",
    tools: [
      {
        id: "settings",
        title: "Settings",
        icon: Settings,
        path: "/tools/settings",
        description: "Configure preferences",
      },
    ],
  },
];

interface ToolsSidebarProps {
  className?: string;
}

export function ToolsSidebar({ className }: ToolsSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 mb-3">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DevTools
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-1 overflow-y-auto">
        {/* Tool Groups */}
        {toolGroups.map((group, groupIndex) => (
          <div key={group.groupTitle}>
            {/* Group Title */}
            {!isCollapsed && (
              <h3 className="px-2 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.groupTitle}
              </h3>
            )}

            {/* Tools in Group */}
            <div className="space-y-1 mb-3">
              {group.tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = currentPath === tool.path;

                return (
                  <Link key={tool.id} to={tool.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 group relative",
                        isCollapsed && "justify-center px-2",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive && "text-white",
                        )}
                      />
                      {!isCollapsed && (
                        <span className="font-medium truncate w-full">
                          {tool.title}
                        </span>
                      )}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                          {tool.title}
                        </div>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Horizontal Separator (except after last group) */}
            {groupIndex < toolGroups.length - 1 && (
              <div className="my-4 border-t border-gray-800" />
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        {!isCollapsed && (
          <div className="text-xs text-gray-500 text-center">
            <p>Developer Tools v1.0</p>
            <p className="mt-1">@2025 lcaohoanq</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-gray-900 text-white border-r border-gray-800 z-40 lg:hidden transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "w-64",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen bg-gray-900 text-white border-r border-gray-800 sticky top-0 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          className,
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
