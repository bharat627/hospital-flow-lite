
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const AppointmentForm = () => {
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appointment Request Submitted",
      description: "We will confirm your appointment shortly.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="hospital">Select Hospital</Label>
        <Select value={hospital} onValueChange={setHospital}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a hospital" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diamond-hospital">Diamond Hospital</SelectItem>
            <SelectItem value="central-medical">Central Medical Center</SelectItem>
            <SelectItem value="mercy-hospital">Mercy Hospital</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="doctor">Select Doctor</Label>
        <Select value={doctor} onValueChange={setDoctor}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dr-smith">Dr. Smith - Cardiology</SelectItem>
            <SelectItem value="dr-johnson">Dr. Johnson - Pediatrics</SelectItem>
            <SelectItem value="dr-williams">Dr. Williams - Neurology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Preferred Date & Time</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            id="date"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Visit</Label>
        <Input
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Brief description of your concern"
        />
      </div>

      <Button type="submit" className="w-full">
        Request Appointment
      </Button>
    </form>
  );
};

export default AppointmentForm;
