
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash } from "lucide-react";

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

interface PatientListProps {
  patients: Patient[];
  onDelete: (id: string) => void;
}

const PatientList = ({ patients, onDelete }: PatientListProps) => {
  if (patients.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No patients found</p>
      </div>
    );
  }

  return (
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
        {patients.map((patient) => (
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
                      onClick={() => onDelete(patient.id)}
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
};

export default PatientList;
