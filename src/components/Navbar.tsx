
import React from "react";
import { Bell, Search, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSwitchToPatient = () => {
    navigate("/patient/appointments");
    toast("Switched to Patient Portal");
  };

  const handleLogout = () => {
    localStorage.removeItem("staffAuth");
    toast("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-border bg-white flex items-center px-6">
      <div className="w-full flex items-center justify-between">
        <div className="md:w-64 lg:w-72">
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-8 max-w-xs" 
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline"
            onClick={handleSwitchToPatient}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            <span>Switch to Patient Portal</span>
          </Button>
          <Button 
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-semibold">New appointment request</span>
                  <span className="text-xs text-gray-600">5 mins ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-semibold">Lab results ready</span>
                  <span className="text-xs text-gray-600">1 hour ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-blue-600 justify-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg" alt="@user" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Dr. Smith</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
