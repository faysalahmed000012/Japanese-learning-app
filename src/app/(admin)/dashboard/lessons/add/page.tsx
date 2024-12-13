"use client";

import DashboardHeader from "@/components/custom/DashboardHeader";
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
import { useCreateLesson } from "@/hooks/custom/lessons.hook";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddLessonPage() {
  const [lessonName, setLessonName] = useState("");
  const [lessonNumber, setLessonNumber] = useState(0);
  const router = useRouter();
  const { mutate: create } = useCreateLesson();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    create({ lessonName, lessonNumber });
    router.push("/dashboard/lessons");
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Add New Lesson"
        text="Create a new lesson for your course."
      />
      <Card className="mt-4">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Lesson Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lesson-name">Lesson Name</Label>
              <Input
                id="lesson-name"
                placeholder="Enter lesson name"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson-number">Lesson Number</Label>
              <Input
                id="lesson-number"
                type="number"
                placeholder="Enter lesson number"
                value={lessonNumber}
                onChange={(e) => setLessonNumber(Number(e.target.value))}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Add Lesson</Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  );
}
