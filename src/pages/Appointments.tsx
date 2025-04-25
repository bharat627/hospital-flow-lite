
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentForm from "@/components/AppointmentForm";

const Appointments = () => {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book Appointment</h1>
        <p className="text-muted-foreground">
          Schedule an appointment with one of our specialists
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Request Form</CardTitle>
        </CardHeader>
        <CardContent>
          <AppointmentForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
