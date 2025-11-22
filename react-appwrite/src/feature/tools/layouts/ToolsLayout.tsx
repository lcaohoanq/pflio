import React from "react";
import { ToolsSidebar } from "../components/ToolsSidebar";

interface ToolsLayoutProps {
  children: React.ReactNode;
}

export function ToolsLayout({ children }: ToolsLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <ToolsSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
