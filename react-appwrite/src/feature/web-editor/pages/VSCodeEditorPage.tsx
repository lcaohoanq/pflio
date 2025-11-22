import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "~/shared/components/ui/button";
import { Card } from "~/shared/components/ui/card";
import { Play, Download, Copy, Check, Eye, EyeOff } from "lucide-react";
import { ToolsLayout } from "~/feature/tools/layouts/ToolsLayout";

export default function VSCodeEditorPage() {
  const [code, setCode] = useState(`// Welcome to the Browser Code Editor!
// Powered by Monaco Editor (the same editor that powers VS Code)

function greet(name) {
  return \`Hello, \${name}! Welcome to the editor.\`;
}

console.log(greet("Developer"));

// Try writing some code here!
`);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  const handleRunCode = () => {
    try {
      // Capture console.log output
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(
          args
            .map((arg) =>
              typeof arg === "object"
                ? JSON.stringify(arg, null, 2)
                : String(arg),
            )
            .join(" "),
        );
        originalLog(...args);
      };

      // Execute the code
      eval(code);

      // Restore console.log
      console.log = originalLog;

      setOutput(logs.join("\n") || "Code executed successfully (no output)");
      // Automatically show console when code is run
      setShowConsole(true);
    } catch (error) {
      setOutput(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
      // Automatically show console when there's an error
      setShowConsole(true);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${language === "javascript" ? "js" : language === "typescript" ? "ts" : "txt"}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "kotlin", label: "Kotlin" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "dockerfile", label: "Dockerfile" },
    { value: "txt", label: "Plain Text" },
    { value: "yaml", label: "YAML" },
    { value: "json", label: "JSON" },
    { value: "markdown", label: "Markdown" },
  ];

  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "vs-light", label: "Light" },
    { value: "hc-black", label: "High Contrast" },
  ];

  return (
    <ToolsLayout>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10">
          <div className="px-6 py-3 flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              VS Code Editor
            </h1>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-sm hover:border-gray-600 transition-colors"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>

              {/* Theme Selector */}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-sm hover:border-gray-600 transition-colors"
              >
                {themes.map((themeOption) => (
                  <option key={themeOption.value} value={themeOption.value}>
                    {themeOption.label}
                  </option>
                ))}
              </select>

              {/* Console Toggle */}
              <Button
                onClick={() => setShowConsole(!showConsole)}
                variant={showConsole ? "default" : "outline"}
                size="sm"
                className="gap-2"
              >
                {showConsole ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                Console
              </Button>

              {/* Action Buttons */}
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              {language === "javascript" && (
                <Button
                  onClick={handleRunCode}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Play className="h-4 w-4" />
                  Run Code
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 lg:p-6 space-y-4">
          <div
            className={`grid gap-4 h-[calc(100vh-120px)] transition-all duration-500 ease-in-out ${
              showConsole ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {/* Editor */}
            <Card
              className={`border-gray-800 bg-gray-900 overflow-hidden transition-all duration-500 ease-in-out ${
                showConsole
                  ? "lg:col-span-2"
                  : "col-span-1 mx-auto w-full max-w-6xl"
              }`}
            >
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme={theme}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: true,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                  readOnly: false,
                  domReadOnly: false,
                  contextmenu: true,
                  selectOnLineNumbers: true,
                }}
              />
            </Card>

            {/* Output Console */}
            {showConsole && (
              <Card className="border-gray-800 bg-gray-900 overflow-hidden flex flex-col animate-in fade-in slide-in-from-right duration-500">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="font-semibold text-lg">Console Output</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {language === "javascript"
                      ? 'Click "Run Code" to see output'
                      : "Output console (JavaScript only)"}
                  </p>
                </div>
                <div className="flex-1 p-4 overflow-auto">
                  <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                    {output || "No output yet..."}
                  </pre>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </ToolsLayout>
  );
}
