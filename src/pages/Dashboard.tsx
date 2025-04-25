
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserRound,
  Activity,
  CalendarCheck,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const patientData = [
  { name: "Jan", patients: 400 },
  { name: "Feb", patients: 300 },
  { name: "Mar", patients: 500 },
  { name: "Apr", patients: 280 },
  { name: "May", patients: 590 },
  { name: "Jun", patients: 430 },
  { name: "Jul", patients: 650 },
];

const departmentData = [
  { name: "Cardiology", visits: 400 },
  { name: "Orthopedics", visits: 300 },
  { name: "Neurology", visits: 200 },
  { name: "Pediatrics", visits: 350 },
  { name: "Oncology", visits: 150 },
  { name: "Dermatology", visits: 180 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to HospitalFlow management system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,853</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                +4.5%
              </span>{" "}
              from last month
            </p>
            <Progress value={65} className="h-1 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
            <UserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                +2.1%
              </span>{" "}
              from last month
            </p>
            <Progress value={48} className="h-1 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Department Activity
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16,598</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowDown className="h-4 w-4 mr-1" />
                -2.3%
              </span>{" "}
              from last month
            </p>
            <Progress value={78} className="h-1 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Appointments
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">129</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                +8.2%
              </span>{" "}
              from yesterday
            </p>
            <Progress value={92} className="h-1 mt-3" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Patient Statistics</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patientData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Department Visits</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="p-4">
                <div className="grid grid-cols-4 gap-4 font-medium">
                  <div>Name</div>
                  <div>Admission Date</div>
                  <div>Doctor</div>
                  <div>Status</div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div className="p-4" key={i}>
                    <div className="grid grid-cols-4 gap-4">
                      <div>John Doe</div>
                      <div>2023-07-{10 + i}</div>
                      <div>Dr. Sarah Johnson</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  patient: "Michael Brown",
                  doctor: "Dr. James Wilson",
                  time: "10:00 AM",
                  department: "Cardiology",
                },
                {
                  patient: "Emily Davis",
                  doctor: "Dr. Sarah Johnson",
                  time: "11:30 AM",
                  department: "Neurology",
                },
                {
                  patient: "Robert Miller",
                  doctor: "Dr. Lisa Anderson",
                  time: "2:15 PM",
                  department: "Orthopedics",
                },
                {
                  patient: "Jennifer White",
                  doctor: "Dr. David Lee",
                  time: "3:45 PM",
                  department: "Pediatrics",
                },
              ].map((appointment, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div>
                    <h4 className="font-medium">{appointment.patient}</h4>
                    <p className="text-sm text-muted-foreground">
                      {appointment.doctor}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
