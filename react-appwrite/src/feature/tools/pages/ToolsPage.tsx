import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/components/ui/card";
import { Button } from "~/shared/components/ui/button";
import {
  Code2,
  Terminal,
  ArrowRight,
  FileCode,
  Database,
  Network,
  Wrench,
  Sparkles,
} from "lucide-react";
import { ToolsLayout } from "~/feature/tools/layouts/ToolsLayout";
import { ToolsNavbar } from "~/shared/components/ToolsNavbar";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
  category: string;
  badge?: string;
}

export function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const tools: Tool[] = [
    {
      id: "vscode",
      title: "VS Code Editor",
      description:
        "A browser-based code editor powered by Monaco Editor. Write, edit, and experiment with code directly in your browser.",
      icon: Code2,
      path: "/tools/vscode",
      color: "from-blue-500 to-cyan-500",
      category: "editors",
      badge: "Popular",
    },
    {
      id: "terminal",
      title: "Web Terminal",
      description:
        "A simulated terminal environment in your browser. Practice command-line skills and run basic shell commands.",
      icon: Terminal,
      path: "/tools/terminal",
      color: "from-green-500 to-lime-500",
      category: "development",
      badge: "New",
    },
    // Add more tools here in the future
  ];

  const categories = [
    { id: "all", name: "All Tools", icon: Sparkles, count: tools.length },
    {
      id: "editors",
      name: "Editors",
      icon: FileCode,
      count: tools.filter((t) => t.category === "editors").length,
    },
    {
      id: "development",
      name: "Development",
      icon: Wrench,
      count: tools.filter((t) => t.category === "development").length,
    },
    {
      id: "database",
      name: "Database",
      icon: Database,
      count: tools.filter((t) => t.category === "database").length,
    },
    {
      id: "network",
      name: "Network",
      icon: Network,
      count: tools.filter((t) => t.category === "network").length,
    },
  ];

  const filteredTools =
    selectedCategory === "all"
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

  return (
    <ToolsLayout>
      <ToolsNavbar />
      <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Developer Tools
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Select a tool to get started or explore all available tools below
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{category.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedCategory === category.id
                          ? "bg-white/20"
                          : "bg-gray-700"
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="mb-12">
            {filteredTools.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  No tools found in this category
                </div>
                <p className="text-gray-600 text-sm">More tools coming soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card
                      key={tool.id}
                      className="group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 border-2 border-gray-800 hover:border-blue-500/50 overflow-hidden bg-gray-800/50 relative"
                    >
                      {/* Badge */}
                      {tool.badge && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                            {tool.badge}
                          </span>
                        </div>
                      )}

                      {/* Gradient Header */}
                      <div className={`h-2 bg-gradient-to-r ${tool.color}`} />

                      <CardHeader>
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors">
                          {tool.title}
                        </CardTitle>
                        <CardDescription className="text-base text-gray-400">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>

                      <CardFooter>
                        <Link to={tool.path} className="w-full">
                          <Button className="w-full group-hover:bg-blue-600 transition-colors">
                            Launch Tool
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Coming Soon Section */}
          <div>
            <Card className="border-2 border-dashed border-gray-700 bg-gray-800/30 text-center p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  More Tools Coming Soon!
                </CardTitle>
                <CardDescription className="text-base text-gray-400 mt-2">
                  We're constantly adding new developer tools. Check back soon
                  for updates!
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </ToolsLayout>
  );
}
