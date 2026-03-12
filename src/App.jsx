import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TemplatesPage from "./pages/TemplatesPage";
import TemplateBuyPage from "./pages/TemplateBuyPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import PaymentPage from "./pages/PaymentPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route
                    path="/templates/:id/buy"
                    element={<TemplateBuyPage />}
                />
                <Route
                    path="/templates/:id/confirm"
                    element={<ConfirmationPage />}
                />
                <Route
                    path="/templates/:id/payment"
                    element={<PaymentPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}
