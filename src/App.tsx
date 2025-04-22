import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components";
import { TaskProvider } from "./contexts/TaskContext";
import { Tasks, Calendar, Profile, Settings, NotFound } from "./pages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TaskProvider>
        <BrowserRouter>
          <main className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Tasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <NavBar />
          </main>
        </BrowserRouter>
      </TaskProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
