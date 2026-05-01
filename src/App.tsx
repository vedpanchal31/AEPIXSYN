import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./screens/Index.tsx";
import NotFound from "./screens/NotFound.tsx";
import AppHome from "./screens/app/AppHome.tsx";
import Explore from "./screens/app/Explore.tsx";
import ImageDetail from "./screens/app/ImageDetail.tsx";
import Editor from "./screens/app/Editor.tsx";
import Profile from "./screens/app/Profile.tsx";
import Collections from "./screens/app/Collections.tsx";
import DownloadQuality from "./screens/app/DownloadQuality.tsx";
import SignIn from "./screens/auth/SignIn.tsx";
import SignUp from "./screens/auth/SignUp.tsx";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/app" element={<AppHome />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/image/:id" element={<ImageDetail />} />
        <Route path="/edit/:id" element={<Editor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/download/:id" element={<DownloadQuality />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
