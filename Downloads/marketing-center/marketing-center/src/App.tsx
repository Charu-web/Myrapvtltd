import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MarketingCenter from "./pages/MarketingCenter";
import { useMediaQuery } from "./hooks/useMediaQuery";

export default function App() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div
      className={`flex h-screen w-full gap-4 overflow-hidden bg-[#F3F3F1] p-4 ${
        isMobile ? "flex-col" : "flex-row"
      }`}
    >
      <Sidebar activeId="marketing" />
      <main className="flex-1 overflow-y-auto rounded-[30px] bg-[#F8F8F7] p-6 sm:p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/marketing" replace />} />
          <Route path="/marketing" element={<MarketingCenter />} />
          <Route path="*" element={<MarketingCenter />} />
        </Routes>
      </main>
    </div>
  );
}
