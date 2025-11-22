import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/components/ui/card";
import { Button } from "~/shared/components/ui/button";
import { Code2, Terminal, ArrowRight } from "lucide-react";
import { ToolsLayout } from "~/feature/tools/layouts/ToolsLayout";

export function ToolsPage() {
  const tools = [
    {
      id: "vscode",
      title: "VS Code Editor",
      description:
        "A browser-based code editor powered by Monaco Editor. Write, edit, and experiment with code directly in your browser.",
      icon: Code2,
      path: "/tools/vscode",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "terminal",
      title: "Web Terminal",
      description:
        "A simulated terminal environment in your browser. Practice command-line skills and run basic shell commands.",
      icon: Terminal,
      path: "/tools/terminal",
      color: "from-green-500 to-lime-500",
    },
    // Add more tools here in the future
  ];

  return (
    <ToolsLayout>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Developer Tools
          </h1>
          <p className="text-gray-400 text-lg">
            Select a tool to get started or explore all available tools below
          </p>
        </div>

        {/* Tools Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 border-2 border-gray-800 hover:border-blue-500/50 overflow-hidden bg-gray-800/50"
                >
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

          {/* Coming Soon Section */}
          <div className="mt-12">
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
