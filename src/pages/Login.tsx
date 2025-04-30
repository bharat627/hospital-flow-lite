
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Hardcoded credentials check
    setTimeout(() => {
      if (username === "Diamondhospital@1" && password === "dimond@2131") {
        // Store authentication state in localStorage
        localStorage.setItem("staffAuth", "true");
        toast("Login successful");
        navigate("/staff");
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 1000); // Simulate network request
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">HF</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Staff Portal</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the staff dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username"
                type="text"
                placeholder="Diamondhospital@1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
        <div className="p-6 pt-0 text-center">
          <Button 
            variant="link" 
            onClick={() => navigate("/patient/appointments")}
          >
            Return to Patient Portal
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
