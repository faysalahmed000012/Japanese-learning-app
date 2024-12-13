"use client";

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
import { useGetAllLessons, useUpdateLesson } from "@/hooks/custom/lessons.hook";
import ILesson from "@/types/lesson.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ManageLessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);
  const { mutate: update } = useUpdateLesson();
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetAllLessons();
  const lessons = data?.data;
  const router = useRouter();

  const openEditDialog = (lesson: ILesson) => {
    setSelectedLesson(lesson);
  };

  const handleUpdate = () => {
    console.log(selectedLesson);
    const updateLessonData = {
      lessonId: selectedLesson!._id as string,
      data: {
        lessonName: selectedLesson!.lessonName,
        lessonNumber: selectedLesson!.lessonNumber,
      },
    };
    update(updateLessonData);
    setSelectedLesson(null);
  };

  const filteredLessons = lessons?.filter((lesson: ILesson) =>
    lesson.lessonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage Lessons"
        text="View and manage lessons."
      />
      <div className="mt-4 space-y-4">
        <div className="flex justify-between">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            placeholder="Search lessons..."
          />
          <Button onClick={() => router.push("/dashboard/lessons/add")}>
            Add Lesson
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lesson Number</TableHead>
              <TableHead>Lesson Name</TableHead>
              <TableHead>Vocabulary Count</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLessons?.map((lesson: ILesson) => (
              <TableRow key={lesson._id}>
                <TableCell>{lesson.lessonNumber}</TableCell>
                <TableCell>{lesson.lessonName}</TableCell>
                <TableCell>{lesson.vocabularyCount}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(lesson)}
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
        open={selectedLesson !== null}
        onOpenChange={() => setSelectedLesson(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
            <DialogDescription>Update the lesson's details.</DialogDescription>
          </DialogHeader>
          {selectedLesson && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Lesson Name</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedLesson.lessonName}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      lessonName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-number">Lesson Number</Label>
                <Input
                  id="edit-number"
                  type="number"
                  defaultValue={selectedLesson.lessonNumber}
                  onChange={(e) =>
                    setSelectedLesson({
                      ...selectedLesson,
                      lessonNumber: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => handleUpdate()}>Update Lesson</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
