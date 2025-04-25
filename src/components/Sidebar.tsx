
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  UserRound,
  FileText,
  Settings,
  Menu,
  X,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Patients",
      path: "/patients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Doctors",
      path: "/doctors",
      icon: <UserRound className="h-5 w-5" />,
    },
    {
      title: "Medical Records",
      path: "/medical-records",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Appointments",
      path: "/appointments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Inquiries",
      path: "/inquiries",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "bg-white border-r border-border transition-all duration-300 h-screen sticky top-0",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center h-16 border-b border-border px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-hospital-600 flex items-center justify-center">
              <span className="text-white font-bold">HF</span>
            </div>
            <span className="font-semibold text-lg">HospitalFlow</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-full flex justify-center">
            <div className="h-8 w-8 rounded-md bg-hospital-600 flex items-center justify-center">
              <span className="text-white font-bold">HF</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "ml-auto",
            isCollapsed ? "rotate-180" : ""
          )}
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 rounded-md transition-colors",
                    isActive
                      ? "bg-hospital-100 text-hospital-700"
                      : "hover:bg-gray-100",
                    isCollapsed ? "justify-center" : ""
                  )
                }
              >
                {item.icon}
                {!isCollapsed && <span className="ml-3">{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
