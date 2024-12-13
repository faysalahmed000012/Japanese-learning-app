"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/context/user.provider";
import { lessonComplete } from "@/services/UserServices";
import ILesson from "@/types/lesson.types";
import IVocabulary from "@/types/vocabulary.types";
import { Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
// import Confetti from 'react-confetti'

const LessonDetail = ({
  lesson,
  vocabs,
}: {
  lesson: ILesson;
  vocabs: IVocabulary[];
}) => {
  const { lessonName, lessonNumber } = lesson;
  const lessonVocabulary = vocabs;
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  const currentVocab = lessonVocabulary[currentIndex];
  const progress = Math.round(
    ((currentIndex + 1) / lessonVocabulary.length) * 100
  );

  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(currentVocab.pronunciation);
    utterance.lang = "ja-JP";
    speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentIndex < lessonVocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = () => {
    setShowConfetti(true);
    lessonComplete(user?._id as string, lessonNumber);
    setTimeout(() => {
      router.push("/lessons");
    }, 3000);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        Lesson {lessonNumber} ({lessonName})
      </h1>
      <div className="mb-6 md:w-3/4 md:mx-auto flex items-center justify-center">
        <Progress value={progress} className="w-full md:w-3/4  mr-4" />
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <Card className="max-w-2xl mx-auto japanese-pattern">
        <CardContent className="p-6">
          {!isCompleted ? (
            <div>
              <div className="flex gap-3 items-center ">
                <h2 className="text-3xl font-bold">{currentVocab?.word}</h2>
                <Button
                  className="h-10 w-10 bg-black rounded-full text-white"
                  onClick={playPronunciation}
                  variant="ghost"
                >
                  <Volume2 className="h-10 w-10" />
                </Button>
              </div>
              <p className="text-lg mb-4">/{currentVocab?.pronunciation}/</p>
              <p className="text-lg mb-2 ">
                Meaning:{" "}
                <span className="font-bold text-xl">
                  {currentVocab?.meaning}
                </span>
              </p>
              <p className="text-lg mb-4">
                When to say: {currentVocab?.whenToSay}
              </p>
              <p className="text-gray-500 mb-6 text-sm">
                author: {currentVocab?.adminEmail}
              </p>
              <div className="flex justify-between">
                <Button onClick={handlePrevious} disabled={currentIndex === 0}>
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  {currentIndex === lessonVocabulary.length - 1
                    ? "Finish"
                    : "Next"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Lesson Completed!</h2>
              <Button onClick={handleComplete} className="mt-4">
                Complete Lesson
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      {showConfetti && <Fireworks autorun={{ speed: 3 }} />}
    </div>
  );
};

export default LessonDetail;
