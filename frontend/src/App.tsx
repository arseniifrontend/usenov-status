import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage/HomePage";
import { StatusPage } from "./pages/StatusPage";
import { WidgetStudioPage } from "./pages/WidgetStudioPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/live" element={<StatusPage />} />
                <Route path="/widget" element={<WidgetStudioPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;