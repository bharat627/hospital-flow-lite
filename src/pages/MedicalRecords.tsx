
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, FileText, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  recordType: string;
  date: string;
  doctor: string;
  details: {
    diagnosis: string;
    symptoms: string[];
    prescription: string[];
    notes: string;
  };
}

const initialRecords: MedicalRecord[] = [
  {
    id: "1",
    patientName: "Arjun Patel",
    patientId: "P-1001",
    recordType: "Consultation",
    date: "2023-07-15",
    doctor: "Dr. Sarah Johnson",
    details: {
      diagnosis: "Influenza Type A",
      symptoms: ["Fever", "Cough", "Fatigue", "Muscle aches"],
      prescription: ["Tamiflu 75mg twice daily for 5 days", "Paracetamol 500mg as needed for fever"],
      notes: "Patient advised to rest and increase fluid intake. Follow-up in 7 days if symptoms persist.",
    },
  },
  {
    id: "2",
    patientName: "Priya Sharma",
    patientId: "P-1002",
    recordType: "Lab Result",
    date: "2023-07-10",
    doctor: "Dr. James Wilson",
    details: {
      diagnosis: "Anemia",
      symptoms: ["Fatigue", "Weakness", "Pale skin"],
      prescription: ["Ferrous sulfate 325mg daily", "Vitamin B12 supplement"],
      notes: "Hemoglobin level: 9.5 g/dL. Follow-up blood test in 4 weeks.",
    },
  },
  {
    id: "3",
    patientName: "Rajesh Kumar",
    patientId: "P-1003",
    recordType: "Surgery",
    date: "2023-07-05",
    doctor: "Dr. Lisa Anderson",
    details: {
      diagnosis: "Appendicitis",
      symptoms: ["Abdominal pain", "Nausea", "Fever"],
      prescription: ["Amoxicillin 500mg three times daily for 7 days", "Ibuprofen 400mg as needed for pain"],
      notes: "Appendectomy performed successfully. Patient recovering well. Follow-up in 2 weeks for stitch removal.",
    },
  },
  {
    id: "4",
    patientName: "Anjali Verma",
    patientId: "P-1004",
    recordType: "Consultation",
    date: "2023-07-12",
    doctor: "Dr. David Lee",
    details: {
      diagnosis: "Migraine",
      symptoms: ["Severe headache", "Nausea", "Sensitivity to light"],
      prescription: ["Sumatriptan 50mg as needed", "Avoid triggers"],
      notes: "Patient reports increased frequency of migraines. Consider preventive medication if episodes continue.",
    },
  },
  {
    id: "5",
    patientName: "Vikram Singh",
    patientId: "P-1005",
    recordType: "Lab Result",
    date: "2023-07-08",
    doctor: "Dr. Sarah Johnson",
    details: {
      diagnosis: "Type 2 Diabetes",
      symptoms: ["Increased thirst", "Frequent urination", "Fatigue"],
      prescription: ["Metformin 500mg twice daily", "Dietary modifications"],
      notes: "HbA1c: 7.8%. Patient advised on lifestyle changes. Schedule follow-up in 3 months.",
    },
  },
];

const MedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>(initialRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [recordTypeFilter, setRecordTypeFilter] = useState("All");
  const [expandedRecords, setExpandedRecords] = useState<string[]>([]);

  const toggleRecordExpand = (id: string) => {
    setExpandedRecords((current) =>
      current.includes(id)
        ? current.filter((recordId) => recordId !== id)
        : [...current, id]
    );
  };

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType =
      recordTypeFilter === "All" || record.recordType === recordTypeFilter;
      
    return matchesSearch && matchesType;
  });

  const recordTypes = ["All", ...Array.from(new Set(records.map((record) => record.recordType)))];

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
          <p className="text-muted-foreground">View and manage patient medical records</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search records..."
              className="pl-10 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={recordTypeFilter} onValueChange={setRecordTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {recordTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Medical Records</CardTitle>
          <CardDescription>
            {filteredRecords.length} records found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredRecords.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No medical records found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Record Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <React.Fragment key={record.id}>
                    <TableRow>
                      <TableCell>{record.patientName}</TableCell>
                      <TableCell>{record.patientId}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {record.recordType}
                        </span>
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => toggleRecordExpand(record.id)}
                            >
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  expandedRecords.includes(record.id)
                                    ? "rotate-180"
                                    : ""
                                )}
                              />
                              <span className="sr-only">Toggle details</span>
                            </Button>
                          </CollapsibleTrigger>
                        </Collapsible>
                      </TableCell>
                    </TableRow>
                    {expandedRecords.includes(record.id) && (
                      <TableRow className="bg-muted/20">
                        <TableCell colSpan={6} className="p-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium">Diagnosis</h4>
                              <p>{record.details.diagnosis}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Symptoms</h4>
                              <ul className="list-disc pl-5">
                                {record.details.symptoms.map((symptom, index) => (
                                  <li key={index}>{symptom}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium">Prescription</h4>
                              <ul className="list-disc pl-5">
                                {record.details.prescription.map((medication, index) => (
                                  <li key={index}>{medication}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium">Notes</h4>
                              <p>{record.details.notes}</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalRecords;
