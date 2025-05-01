
export interface Patient {
  id: string;
  name: string;
  gender: string;
  age: number;
  contactNumber: string;
  address: string;
  status: string;
  dateAdmitted: string;
}

export const initialPatients: Patient[] = [
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
