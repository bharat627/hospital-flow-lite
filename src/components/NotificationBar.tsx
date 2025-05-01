
import React, { useState } from "react";
import { X, BellRing } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  type: "new" | "pending";
}

const NotificationBar = () => {
  // Mock notification data - in a real app, this would come from an API
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", title: "New appointment request from John Doe", type: "new" },
    { id: "2", title: "Pending appointment confirmation for Sarah Smith", type: "pending" },
    { id: "3", title: "New appointment request from Mark Johnson", type: "new" },
  ]);

  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleDismissAll = () => {
    setNotifications([]);
  };

  if (!isVisible || notifications.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-border bg-muted">
      <div className="container flex items-center justify-between py-2">
        <div className="flex items-center">
          <BellRing className="h-4 w-4 mr-2 text-blue-500" />
          <span className="text-sm font-medium">Notifications</span>
          <span className="ml-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {notifications.length}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="container py-2 space-y-2">
        {notifications.map((notification) => (
          <Alert key={notification.id} className="bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${notification.type === 'new' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                <AlertDescription>
                  {notification.title}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {notification.type === "new" ? "New" : "Pending"}
                  </span>
                </AlertDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDismiss(notification.id)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          </Alert>
        ))}
        {notifications.length > 0 && (
          <div className="flex justify-end pt-1 pb-2">
            <Button variant="outline" size="sm" onClick={handleDismissAll}>
              Dismiss all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationBar;
