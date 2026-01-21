import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AppsPage from "./pages/AppsPage";
import VideosPage from "./pages/VideosPage";
import AudioPage from "./pages/AudioPage";
import LibraryPage from "./pages/LibraryPage";
import TasbihPage from "./pages/TasbihPage";
import AzkarPage from "./pages/AzkarPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/audio" element={<AudioPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/tasbih" element={<TasbihPage />} />
          <Route path="/azkar" element={<AzkarPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
