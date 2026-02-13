import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AppsPage from "./pages/AppsPage";
import VideosPage from "./pages/VideosPage";
import AudioPage from "./pages/AudioPage";
import AudioPlayerPage from "./pages/AudioPlayerPage";
import QiblaPage from "./pages/QiblaPage";
import LibraryPage from "./pages/LibraryPage";
import TasbihPage from "./pages/TasbihPage";
import AzkarPage from "./pages/AzkarPage";
import DuasPage from "./pages/DuasPage";
import QuranPage from "./pages/QuranPage";
import MosquesPage from "./pages/MosquesPage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import MarketplacePage from "./pages/MarketplacePage";
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
          <Route path="/audio/:id" element={<AudioPlayerPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/tasbih" element={<TasbihPage />} />
          <Route path="/azkar" element={<AzkarPage />} />
          <Route path="/duas" element={<DuasPage />} />
          <Route path="/quran" element={<QuranPage />} />
          <Route path="/qibla" element={<QiblaPage />} />
          <Route path="/mosques" element={<MosquesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
