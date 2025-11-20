import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  React.useEffect(() => {
    fetch(import.meta.env.VITE_N8N_PORTFOLIO_VISIT_WEBHOOK_URL! ?? "hehe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ua: navigator.userAgent,
        time: new Date().toISOString(),
      }),
    }).catch(() => {});
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
