
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
import AuthGuard from "./components/AuthGuard";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Hospital Staff Interface */}
          <Route element={<AuthGuard />}>
            <Route path="/staff" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="medical-records" element={<MedicalRecords />} />
              <Route path="settings" element={<Settings />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="inquiries" element={<Inquiries />} />
            </Route>
          </Route>

          {/* Patient Interface */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route index element={<Navigate to="/patient/appointments" replace />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="inquiries" element={<Inquiries />} />
          </Route>

          {/* Landing page - User can choose interface */}
          <Route path="/" element={<Navigate to="/patient/appointments" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
