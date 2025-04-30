
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Calendar, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const PatientLayout = () => {
  const navigate = useNavigate();

  const handleSwitchToStaff = () => {
    // Check if already authenticated
    const isAuthenticated = localStorage.getItem("staffAuth") === "true";
    
    if (isAuthenticated) {
      navigate("/staff");
      toast("Switched to Staff Portal");
    } else {
      navigate("/login");
      toast("Please login to access the Staff Portal");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">HF</span>
              </div>
              <span className="font-semibold text-lg">HospitalFlow</span>
            </div>
            <nav>
              <ul className="flex items-center gap-6">
                <li>
                  <NavLink
                    to="/patient/appointments"
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm font-medium ${
                        isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                      }`
                    }
                  >
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/patient/inquiries"
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm font-medium ${
                        isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                      }`
                    }
                  >
                    <MessageSquare className="h-4 w-4" />
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <Button variant="outline" onClick={handleSwitchToStaff}>
                    Switch to Staff Portal
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
