import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "~/feature/portfolio/pages/PortfolioPage";

export const Route = createFileRoute("/")({
  component: Portfolio,
});
