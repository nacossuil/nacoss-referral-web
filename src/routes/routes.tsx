import AdminPage from "@/pages/admin";
import LandingPage from "@/pages/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};
