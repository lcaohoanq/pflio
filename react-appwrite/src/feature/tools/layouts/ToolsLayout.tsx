import React from "react";
import { ToolsSidebar } from "../components/ToolsSidebar";

interface ToolsLayoutProps {
  children: React.ReactNode;
}

export function ToolsLayout({ children }: ToolsLayoutProps) {
  return (
    <>
      <title>Developer Tools - PFL.IO</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="flex min-h-screen bg-gray-900">
        <ToolsSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}
