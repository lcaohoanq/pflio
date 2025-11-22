import { createFileRoute } from "@tanstack/react-router";
import VSCodeEditorPage from "~/feature/web-editor/pages/VSCodeEditorPage";

export const Route = createFileRoute("/tools/vscode/")({
  component: VSCodeEditorPage,
});
