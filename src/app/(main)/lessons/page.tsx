import LessonCard from "@/components/custom/LessonCard";
import { getAllLessons } from "@/services/LessonServices";
import ILesson from "@/types/lesson.types";

const LessonsPage = async () => {
  const { data } = await getAllLessons();

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-70vh rounded-b-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Japanese Lessons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((lesson: ILesson) => (
          <LessonCard key={lesson._id} {...lesson} />
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
