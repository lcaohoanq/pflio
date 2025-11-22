import { createFileRoute } from "@tanstack/react-router";
import { ToolsPage } from "~/feature/tools/pages/ToolsPage";

export const Route = createFileRoute("/tools/")({
  component: ToolsPage,
});
