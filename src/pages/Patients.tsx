
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import PatientForm from "@/components/patients/PatientForm";
import PatientList from "@/components/patients/PatientList";
import PatientControls from "@/components/patients/PatientControls";
import { Patient, initialPatients } from "@/types/patient";

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

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">
            Manage and view patient information
          </p>
        </div>
        <PatientControls 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
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
              <PatientList patients={filteredPatients} onDelete={handleDeletePatient} />
            </TabsContent>
            <TabsContent value="active" className="pt-0 pb-6">
              <PatientList patients={activePatients} onDelete={handleDeletePatient} />
            </TabsContent>
            <TabsContent value="discharged" className="pt-0 pb-6">
              <PatientList patients={dischargedPatients} onDelete={handleDeletePatient} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <PatientForm
          newPatient={newPatient}
          setNewPatient={setNewPatient}
          onSave={handleAddPatient}
          onCancel={() => setOpenDialog(false)}
        />
      </Dialog>
    </div>
  );
};

export default Patients;
