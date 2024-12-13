export const dynamic = "force-dynamic";
import { getLessonById } from "@/services/LessonServices";
import { getVocabulary } from "@/services/VocabularyServices";
import LessonDetail from "./LessonDetail";

const page = async ({
  params,
}: {
  params: Promise<{ lessonNumber: string }>;
}) => {
  const lessonNumber = (await params).lessonNumber;
  const { data: lesson } = await getLessonById(lessonNumber);
  lesson.lessonNumber.toString();
  const { data: vocabs } = await getVocabulary(
    lesson?.lessonNumber?.toString()
  );
  return (
    <>
      <LessonDetail lesson={lesson} vocabs={vocabs} />
    </>
  );
};

export default page;
