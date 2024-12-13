"use client";
import { useUser } from "@/context/user.provider";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface LessonCardProps {
  _id?: string;
  lessonName: string;
  lessonNumber: number;
  vocabularyCount: number;
}

const LessonCard = ({
  _id,
  lessonName,
  lessonNumber,
  vocabularyCount,
}: LessonCardProps) => {
  const { user } = useUser();

  const completed = user?.completedLessons?.includes(lessonNumber);

  return (
    <Card className="h-full flex flex-col card-hover-effect overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-xl">
          Lesson {lessonNumber}{" "}
          {completed && <span className="text-sm">Completed</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-6">
        <h3 className="text-lg font-semibold mb-4">{lessonName}</h3>
        <div>
          <p className="text-gray-600 mb-4">
            {vocabularyCount} vocabulary words
          </p>
          {vocabularyCount > 0 && (
            <Link href={`/lessons/${_id}`}>
              <Button
                disabled={vocabularyCount == 0}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Start Lesson
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
