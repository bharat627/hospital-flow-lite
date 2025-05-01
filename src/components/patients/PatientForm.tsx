
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface PatientFormProps {
  newPatient: {
    id: string;
    name: string;
    gender: string;
    age: number;
    contactNumber: string;
    address: string;
    status: string;
    dateAdmitted: string;
  };
  setNewPatient: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      gender: string;
      age: number;
      contactNumber: string;
      address: string;
      status: string;
      dateAdmitted: string;
    }>
  >;
  onSave: () => void;
  onCancel: () => void;
}

const PatientForm = ({ newPatient, setNewPatient, onSave, onCancel }: PatientFormProps) => {
  return (
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
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>Save Patient</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default PatientForm;
