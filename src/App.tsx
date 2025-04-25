
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import MedicalRecords from "./pages/MedicalRecords";
import Settings from "./pages/Settings";
import Appointments from "./pages/Appointments";
import Inquiries from "./pages/Inquiries";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import PatientLayout from "./components/PatientLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Hospital Staff Interface */}
          <Route path="/staff" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="settings" element={<Settings />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="inquiries" element={<Inquiries />} />
          </Route>

          {/* Patient Interface */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route path="appointments" element={<Appointments />} />
            <Route path="inquiries" element={<Inquiries />} />
          </Route>

          {/* Redirect root to patient interface */}
          <Route path="/" element={<Navigate to="/patient/appointments" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
