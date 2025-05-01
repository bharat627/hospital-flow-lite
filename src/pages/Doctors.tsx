
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreVertical, Edit, Trash, UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  contactNumber: string;
  email: string;
  availability: string;
}

const initialDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Sharma",
    specialization: "Cardiology",
    contactNumber: "(123) 456-7890",
    email: "rajesh.sharma@hospital.com",
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
  },
  {
    id: "2",
    name: "Dr. Priya Singh",
    specialization: "Neurology",
    contactNumber: "(234) 567-8901",
    email: "priya.singh@hospital.com",
    availability: "Tue-Sat, 8:00 AM - 4:00 PM",
  },
  {
    id: "3",
    name: "Dr. Vikram Patel",
    specialization: "Orthopedics",
    contactNumber: "(345) 678-9012",
    email: "vikram.patel@hospital.com",
    availability: "Mon-Wed, 10:00 AM - 6:00 PM",
  },
  {
    id: "4",
    name: "Dr. Ananya Desai",
    specialization: "Pediatrics",
    contactNumber: "(456) 789-0123",
    email: "ananya.desai@hospital.com",
    availability: "Wed-Sun, 9:00 AM - 5:00 PM",
  },
  {
    id: "5",
    name: "Dr. Arjun Mehta",
    specialization: "Oncology",
    contactNumber: "(567) 890-1234",
    email: "arjun.mehta@hospital.com",
    availability: "Mon-Fri, 8:00 AM - 4:00 PM",
  },
];

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    id: "",
    name: "",
    specialization: "",
    contactNumber: "",
    email: "",
    availability: "",
  });
  const { toast } = useToast();

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    if (
      !newDoctor.name ||
      !newDoctor.specialization ||
      !newDoctor.contactNumber ||
      !newDoctor.email
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const updatedDoctors = [
      ...doctors,
      {
        ...newDoctor,
        id: String(doctors.length + 1),
      },
    ];
    setDoctors(updatedDoctors);
    setOpenDialog(false);
    toast({
      title: "Doctor Added",
      description: "New doctor has been successfully added",
    });
    setNewDoctor({
      id: "",
      name: "",
      specialization: "",
      contactNumber: "",
      email: "",
      availability: "",
    });
  };

  const handleDeleteDoctor = (id: string) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(updatedDoctors);
    toast({
      title: "Doctor Deleted",
      description: "Doctor has been successfully removed",
    });
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctors</h1>
          <p className="text-muted-foreground">
            Manage and view doctor information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search doctors..."
              className="pl-10 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <UserPlus className="h-4 w-4" />
                <span>Add Doctor</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
                <DialogDescription>
                  Enter the details of the new doctor. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Doctor Name*</Label>
                  <Input
                    id="name"
                    value={newDoctor.name}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization*</Label>
                  <Select
                    value={newDoctor.specialization}
                    onValueChange={(value) =>
                      setNewDoctor({ ...newDoctor, specialization: value })
                    }
                  >
                    <SelectTrigger id="specialization">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Oncology">Oncology</SelectItem>
                      <SelectItem value="Dermatology">Dermatology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number*</Label>
                  <Input
                    id="contact"
                    value={newDoctor.contactNumber}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    value={newDoctor.email}
                    onChange={(e) =>
                      setNewDoctor({ ...newDoctor, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    value={newDoctor.availability}
                    onChange={(e) =>
                      setNewDoctor({
                        ...newDoctor,
                        availability: e.target.value,
                      })
                    }
                    placeholder="e.g. Mon-Fri, 9:00 AM - 5:00 PM"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDoctor}>Save Doctor</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-10 col-span-3">
            <p className="text-muted-foreground">No doctors found</p>
          </div>
        ) : (
          filteredDoctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{doctor.name}</CardTitle>
                      <CardDescription>{doctor.specialization}</CardDescription>
                    </div>
                  </div>
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
                        onClick={() => handleDeleteDoctor(doctor.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-muted-foreground">Contact:</div>
                    <div className="col-span-2">{doctor.contactNumber}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-muted-foreground">Email:</div>
                    <div className="col-span-2">{doctor.email}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-muted-foreground">Available:</div>
                    <div className="col-span-2">{doctor.availability}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Doctors;
