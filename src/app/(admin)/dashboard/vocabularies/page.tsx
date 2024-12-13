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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllLessons } from "@/hooks/custom/lessons.hook";
import {
  useGetAllVocabulary,
  useUpdateVocabulary,
} from "@/hooks/custom/vocab.hook";
import ILesson from "@/types/lesson.types";
import IVocabulary, { IVocabularyUpdateProps } from "@/types/vocabulary.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ManageVocabulariesPage() {
  const [selectedVocabulary, setSelectedVocabulary] =
    useState<IVocabulary | null>(null);
  const [filterLesson, setFilterLesson] = useState("all");
  const router = useRouter();
  const { data } = useGetAllVocabulary();
  const { data: lessonData } = useGetAllLessons();
  const vocabularies = data?.data;
  const lessons = lessonData?.data;
  const [changedLesson, setChangedLesson] = useState();
  const openEditDialog = (vocabulary: IVocabulary) => {
    setSelectedVocabulary(vocabulary);
  };

  const { mutate: update } = useUpdateVocabulary();

  const handleUpdate = () => {
    const lessonNumber = changedLesson
      ? lessons.find((lesson: ILesson) => lesson.lessonName === changedLesson)
          ?.lessonNumber
      : selectedVocabulary?.lesson?.lessonNumber;

    const vocabData: Partial<IVocabularyUpdateProps> = {
      word: selectedVocabulary?.word as string,
      pronunciation: selectedVocabulary?.pronunciation as string,
      whenToSay: selectedVocabulary?.whenToSay as string,
      lesson: lessonNumber as number,
      meaning: selectedVocabulary?.meaning as string,
    };
    update({ id: selectedVocabulary?._id as string, vocabData: vocabData });
    console.log(vocabData);
  };

  const filteredVocabularies =
    filterLesson === "all"
      ? vocabularies
      : vocabularies.filter(
          (v: IVocabulary) => v.lesson.lessonName === filterLesson
        );

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage Vocabularies"
        text="View and manage vocabulary words."
      />
      <div className="mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {/* <Input className="max-w-sm" placeholder="Search vocabularies..." /> */}
            <Select value={filterLesson} onValueChange={setFilterLesson}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Lesson" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lessons</SelectItem>
                {lessons?.map((lesson: ILesson) => (
                  <SelectItem key={lesson._id} value={lesson.lessonName}>
                    {lesson.lessonNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => router.push("/dashboard/vocabularies/add")}>
            Add Vocabulary
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Word</TableHead>
              <TableHead>Pronunciation</TableHead>
              <TableHead>Meaning</TableHead>
              <TableHead>Lesson</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVocabularies?.map((vocabulary: IVocabulary) => (
              <TableRow key={vocabulary._id}>
                <TableCell>{vocabulary.word}</TableCell>
                <TableCell>{vocabulary.pronunciation}</TableCell>
                <TableCell>{vocabulary.meaning}</TableCell>
                <TableCell>{vocabulary?.lesson?.lessonNumber}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(vocabulary)}
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
        open={selectedVocabulary !== null}
        onOpenChange={() => setSelectedVocabulary(null)}
      >
        <DialogContent className="overflow-auto max-h-[80%]">
          <DialogHeader>
            <DialogTitle>Edit Vocabulary</DialogTitle>
            <DialogDescription>
              Update the vocabulary word's details.
            </DialogDescription>
          </DialogHeader>
          {selectedVocabulary && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-word">Word</Label>
                <Input
                  id="edit-word"
                  defaultValue={selectedVocabulary.word}
                  onChange={(e) =>
                    setSelectedVocabulary({
                      ...selectedVocabulary,
                      word: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-pronunciation">Pronunciation</Label>
                <Input
                  id="edit-pronunciation"
                  defaultValue={selectedVocabulary.pronunciation}
                  onChange={(e) =>
                    setSelectedVocabulary({
                      ...selectedVocabulary,
                      pronunciation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-meaning">Meaning</Label>
                <Input
                  id="edit-meaning"
                  defaultValue={selectedVocabulary.meaning}
                  onChange={(e) =>
                    setSelectedVocabulary({
                      ...selectedVocabulary,
                      meaning: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-whenToSay">When To Say</Label>
                <Textarea
                  id="edit-whenToSay"
                  defaultValue={selectedVocabulary.whenToSay}
                  onChange={(e) =>
                    setSelectedVocabulary({
                      ...selectedVocabulary,
                      whenToSay: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-lesson">Lesson</Label>
                <Select
                  defaultValue={selectedVocabulary?.lesson?.lessonName}
                  onValueChange={(value) => setChangedLesson(value)}
                >
                  <SelectTrigger id="edit-lesson">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lessons?.map((lesson: ILesson) => (
                      <SelectItem key={lesson._id} value={lesson.lessonName}>
                        {lesson.lessonName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => handleUpdate()} type="submit">
              Update Vocabulary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
