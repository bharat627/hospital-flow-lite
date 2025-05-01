
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";

interface PatientControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

const PatientControls = ({
  searchTerm,
  onSearchChange,
  openDialog,
  setOpenDialog,
}: PatientControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search patients..."
          className="pl-10 w-[250px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="gap-1">
            <UserPlus className="h-4 w-4" />
            <span>Add Patient</span>
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};

export default PatientControls;
