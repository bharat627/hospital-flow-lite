
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MoreVertical, Edit, Trash, UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Patient {
  id: string;
  name: string;
  gender: string;
  age: number;
  contactNumber: string;
  address: string;
  status: string;
  dateAdmitted: string;
}

const initialPatients: Patient[] = [
  {
    id: "1",
    name: "Arjun Patel",
    gender: "Male",
    age: 45,
    contactNumber: "(123) 456-7890",
    address: "123 Main St, Anytown, CA",
    status: "Active",
    dateAdmitted: "2023-06-15",
  },
  {
    id: "2",
    name: "Priya Sharma",
    gender: "Female",
    age: 32,
    contactNumber: "(456) 789-0123",
    address: "456 Elm St, Someville, NY",
    status: "Discharged",
    dateAdmitted: "2023-05-20",
  },
  {
    id: "3",
    name: "Rajesh Kumar",
    gender: "Male",
    age: 56,
    contactNumber: "(789) 012-3456",
    address: "789 Oak St, Othertown, TX",
    status: "Active",
    dateAdmitted: "2023-06-22",
  },
  {
    id: "4",
    name: "Anjali Verma",
    gender: "Female",
    age: 28,
    contactNumber: "(012) 345-6789",
    address: "101 Pine St, Somewhere, FL",
    status: "Active",
    dateAdmitted: "2023-06-10",
  },
  {
    id: "5",
    name: "Vikram Singh",
    gender: "Male",
    age: 39,
    contactNumber: "(234) 567-8901",
    address: "202 Cedar St, Nowhere, WA",
    status: "Discharged",
    dateAdmitted: "2023-05-05",
  },
  {
    id: "6",
    name: "Neha Gupta",
    gender: "Female",
    age: 51,
    contactNumber: "(345) 678-9012",
    address: "303 Birch St, Anywhere, IL",
    status: "Active",
    dateAdmitted: "2023-06-18",
  },
];

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newPatient, setNewPatient] = useState({
    id: "",
    name: "",
    gender: "",
    age: 0,
    contactNumber: "",
    address: "",
    status: "Active",
    dateAdmitted: new Date().toISOString().split("T")[0],
  });
  const { toast } = useToast();

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contactNumber.includes(searchTerm)
  );

  const activePatients = filteredPatients.filter(
    (patient) => patient.status === "Active"
  );
  const dischargedPatients = filteredPatients.filter(
    (patient) => patient.status === "Discharged"
  );

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.gender || !newPatient.contactNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const updatedPatients = [
      ...patients,
      {
        ...newPatient,
        id: String(patients.length + 1),
      },
    ];
    setPatients(updatedPatients);
    setOpenDialog(false);
    toast({
      title: "Patient Added",
      description: "New patient has been successfully added",
    });
    setNewPatient({
      id: "",
      name: "",
      gender: "",
      age: 0,
      contactNumber: "",
      address: "",
      status: "Active",
      dateAdmitted: new Date().toISOString().split("T")[0],
    });
  };

  const handleDeletePatient = (id: string) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
    toast({
      title: "Patient Deleted",
      description: "Patient has been successfully removed",
    });
  };

  const renderPatientList = (patientList: Patient[]) => (
    <div className="rounded-md border">
      <div className="p-4">
        <div className="grid grid-cols-6 gap-4 font-medium">
          <div>Name</div>
          <div>Gender</div>
          <div>Age</div>
          <div>Contact</div>
          <div>Date Admitted</div>
          <div className="text-right">Actions</div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {patientList.map((patient) => (
          <div className="p-4" key={patient.id}>
            <div className="grid grid-cols-6 gap-4">
              <div>{patient.name}</div>
              <div>{patient.gender}</div>
              <div>{patient.age}</div>
              <div>{patient.contactNumber}</div>
              <div>{patient.dateAdmitted}</div>
              <div className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeletePatient(patient.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">
            Manage and view patient information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search patients..."
              className="pl-10 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <UserPlus className="h-4 w-4" />
                <span>Add Patient</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogDescription>
                  Enter the details of the new patient. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Patient Name*</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender*</Label>
                  <Select
                    value={newPatient.gender}
                    onValueChange={(value) =>
                      setNewPatient({ ...newPatient, gender: value })
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newPatient.age || ""}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        age: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number*</Label>
                  <Input
                    id="contact"
                    value={newPatient.contactNumber}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newPatient.address}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, address: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status*</Label>
                  <Select
                    value={newPatient.status}
                    onValueChange={(value) =>
                      setNewPatient({ ...newPatient, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Discharged">Discharged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateAdmitted">Date Admitted*</Label>
                  <Input
                    id="dateAdmitted"
                    type="date"
                    value={newPatient.dateAdmitted}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        dateAdmitted: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPatient}>Save Patient</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 pt-6">
          <Tabs defaultValue="all">
            <div className="px-6">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Patients</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="discharged">Discharged</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="pt-0 pb-6">
              {filteredPatients.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No patients found</p>
                </div>
              ) : (
                renderPatientList(filteredPatients)
              )}
            </TabsContent>
            <TabsContent value="active" className="pt-0 pb-6">
              {activePatients.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    No active patients found
                  </p>
                </div>
              ) : (
                renderPatientList(activePatients)
              )}
            </TabsContent>
            <TabsContent value="discharged" className="pt-0 pb-6">
              {dischargedPatients.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">
                    No discharged patients found
                  </p>
                </div>
              ) : (
                renderPatientList(dischargedPatients)
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
