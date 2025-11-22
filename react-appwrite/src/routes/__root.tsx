import React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "~/shared/components/ThemeProvider";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  ),
});
