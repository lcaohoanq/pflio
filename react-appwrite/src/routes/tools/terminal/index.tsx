import { createFileRoute } from "@tanstack/react-router";

import React, { useEffect, useRef } from "react";
import { WebContainer } from "@webcontainer/api";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

// Global WebContainer instance - only boot once
let webContainerInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

const getWebContainer = async (): Promise<WebContainer> => {
  if (webContainerInstance) {
    return webContainerInstance;
  }

  if (!bootPromise) {
    bootPromise = WebContainer.boot().then((instance) => {
      webContainerInstance = instance;
      return instance;
    });
  }

  return bootPromise;
};

const WebContainerTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const shellProcessRef = useRef<any>(null);

  useEffect(() => {
    // --- 1. Initialize Xterm.js ---
    const term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      theme: {
        background: "#1e1e1e",
        foreground: "#d4d4d4",
      },
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    if (terminalRef.current) {
      term.open(terminalRef.current);
      fitAddon.fit();
    }

    xtermRef.current = term;

    // --- 2. Boot WebContainer & Start Shell ---
    const startShell = async () => {
      try {
        // Check if cross-origin isolated
        if (!crossOriginIsolated) {
          term.write("\r\n");
          term.write("❌ WebContainer requires Cross-Origin Isolation\r\n");
          term.write("This feature requires specific HTTP headers:\r\n");
          term.write("  - Cross-Origin-Embedder-Policy: require-corp\r\n");
          term.write("  - Cross-Origin-Opener-Policy: same-origin\r\n\r\n");
          term.write("These headers are configured in vercel.json.\r\n");
          term.write(
            "If you just deployed, please wait a few minutes and refresh.\r\n",
          );
          return;
        }

        term.write("Booting WebContainer...\r\n");

        // Get or boot the WebContainer instance (only boots once)
        const wc = await getWebContainer();

        term.write("Starting Shell...\r\n");

        // Spawn a shell
        const shellProcess = await wc.spawn("jsh", {
          terminal: {
            cols: term.cols,
            rows: term.rows,
          },
        });

        shellProcessRef.current = shellProcess;

        // --- 3. PIPE 1: WebContainer Output -> Xterm ---
        shellProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              term.write(data);
            },
          }),
        );

        // --- 4. PIPE 2: Xterm Input -> WebContainer ---
        const inputWriter = shellProcess.input.getWriter();
        term.onData((data) => {
          inputWriter.write(data);
        });

        term.write('Ready. Type "node -v" or "npm install"\r\n\r\n');
      } catch (error) {
        term.write(
          `\r\nError: ${error instanceof Error ? error.message : String(error)}\r\n`,
        );
        console.error("WebContainer error:", error);
      }
    };

    startShell();

    // Cleanup - only dispose terminal, keep WebContainer alive
    return () => {
      if (shellProcessRef.current) {
        shellProcessRef.current.kill?.();
      }
      term.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-white mb-4">
          WebContainer Terminal
        </h1>
        <div
          ref={terminalRef}
          className="rounded-lg overflow-hidden border border-gray-700"
          style={{ height: "600px", width: "100%" }}
        />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/tools/terminal/")({
  component: WebContainerTerminal,
});
