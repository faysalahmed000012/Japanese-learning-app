"use client";

import { DashboardShell } from "@/components/custom/DashboardShell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/user.provider";
import { useGetAllLessons } from "@/hooks/custom/lessons.hook";
import { useCreateVocabulary } from "@/hooks/custom/vocab.hook";
import ILesson from "@/types/lesson.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddVocabularyPage() {
  const [word, setWord] = useState("");
  const { user } = useUser();
  const [pronunciation, setPronunciation] = useState("");
  const [meaning, setMeaning] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [whenToSay, setWhenToSay] = useState("");
  const router = useRouter();
  const { data: lessonData } = useGetAllLessons();
  const lessons = lessonData?.data;
  const { mutate: create } = useCreateVocabulary();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend

    const lessonNumber = lessons.find(
      (lesson: ILesson) => lesson.lessonName === lessonName
    )?.lessonNumber;

    if (!lessonNumber) {
      alert("Please Select Lesson");
      return;
    }

    const vocabProps = {
      word,
      pronunciation,
      meaning,
      whenToSay,
      lesson: lessonNumber,
      adminEmail: user?.email as string,
    };
    create(vocabProps);
    console.log("Vocabulary added:", vocabProps);
    // Redirect to vocabulary management page after adding
    router.push("/dashboard/vocabularies");
  };

  return (
    <DashboardShell>
      <Card className="mt-4">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Vocabulary Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="word">Word</Label>
              <Input
                id="word"
                placeholder="Enter Japanese word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pronunciation">Pronunciation</Label>
              <Input
                id="pronunciation"
                placeholder="Enter pronunciation"
                value={pronunciation}
                onChange={(e) => setPronunciation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meaning">Meaning</Label>
              <Input
                id="meaning"
                placeholder="Enter meaning"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meaning">When To Say</Label>
              <Textarea
                id="whenToSay"
                placeholder="Enter whenToSay"
                value={whenToSay}
                onChange={(e) => setWhenToSay(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson">Lesson</Label>
              <Select required value={lessonName} onValueChange={setLessonName}>
                <SelectTrigger id="lesson">
                  <SelectValue placeholder="Select a lesson" />
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
          </CardContent>
          <CardFooter>
            <Button type="submit">Add Vocabulary</Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  );
}
