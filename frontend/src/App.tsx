import { BrowserRouter, Route, Routes } from "react-router-dom";

import { StatusPage } from "./pages/StatusPage";
import { WidgetStudioPage } from "./pages/WidgetStudioPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StatusPage />} />
        <Route path="/studio" element={<WidgetStudioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;