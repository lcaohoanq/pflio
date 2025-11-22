import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/components/ui/card";
import { Button } from "~/shared/components/ui/button";
import { Code2, ArrowRight } from "lucide-react";
import NavBar from "~/shared/components/navbar";

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
      icon: Code2,
      path: "/tools/terminal",
      color: "from-green-500 to-lime-500",
    },
    // Add more tools here in the future
  ];

  return (
    <div className="from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      {/* <header className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </Link>
          <h1 className="text-xl font-semibold">Developer Tools</h1>
        </div>
      </header> */}

      <NavBar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-500/50 overflow-hidden"
                >
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${tool.color}`} />

                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-base">
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
        </div>
      </main>
    </div>
  );
}
