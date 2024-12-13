"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/custom/DashboardHeader";
import { DashboardShell } from "@/components/custom/DashboardShell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addTutorial,
  getAllTutorials,
  updateTutorial,
} from "@/services/TutorialServices";

interface ITutorial {
  _id: string;
  link: string;
}

// Mock data
// const tutorials: ITutorial[] = [
//   { id: 1, link: "https://www.youtube.com/watch?v=example1" },
//   { id: 2, link: "https://www.youtube.com/watch?v=example2" },
//   { id: 3, link: "https://www.youtube.com/watch?v=example3" },
// ];

export default function ManageTutorialsPage() {
  const [selectedTutorial, setSelectedTutorial] = useState<ITutorial | null>(
    null
  );
  const [newTutorialLink, setNewTutorialLink] = useState("");
  const [tutorials, setTutorials] = useState(Array<ITutorial>);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const data = await getAllTutorials();
      setTutorials(data?.data);
    }
    if (!ignore) {
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const openEditDialog = (tutorial: ITutorial) => {
    setSelectedTutorial(tutorial);
  };

  const handleAddTutorial = () => {
    if (!newTutorialLink) {
      alert("Please Add a Link");
      return;
    }
    addTutorial(newTutorialLink);
    console.log("Adding new tutorial:", newTutorialLink);
    setNewTutorialLink("");
  };

  const handleUpdateTutorial = () => {
    if (!selectedTutorial) {
      alert("Please Add a Link");
      return;
    }

    updateTutorial(
      selectedTutorial?._id as string,
      selectedTutorial?.link as string
    );
    console.log("Updating tutorial:", selectedTutorial);
    setSelectedTutorial(null);
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage Tutorials"
        text="View and manage tutorial links."
      />
      <div className="mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <Input
            className="max-w-sm"
            placeholder="Enter new tutorial link"
            value={newTutorialLink}
            onChange={(e) => setNewTutorialLink(e.target.value)}
          />
          <Button onClick={handleAddTutorial}>Add Tutorial</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tutorial Link</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutorials.map((tutorial) => (
              <TableRow key={tutorial._id}>
                <TableCell>{tutorial.link}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(tutorial)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog
        open={selectedTutorial !== null}
        onOpenChange={() => setSelectedTutorial(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tutorial</DialogTitle>
            <DialogDescription>Update the tutorial link.</DialogDescription>
          </DialogHeader>
          {selectedTutorial && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-link">Tutorial Link</Label>
                <Input
                  id="edit-link"
                  value={selectedTutorial.link}
                  onChange={(e) =>
                    setSelectedTutorial({
                      ...selectedTutorial,
                      link: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateTutorial}>
              Update Tutorial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
