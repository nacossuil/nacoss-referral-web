import { Toaster } from "sonner";
import { AppRoutes } from "./routes/routes";

function App() {
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (ref) localStorage.setItem("referredBy", ref);

  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
