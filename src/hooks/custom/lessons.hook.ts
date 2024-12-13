import {
  createLesson,
  getAllLessons,
  updateLesson,
} from "@/services/LessonServices";
import { ILessonData } from "@/types/lesson.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateLesson = () => {
  return useMutation<any, Error, ILessonData>({
    mutationKey: ["ADD_LESSON"],
    mutationFn: async (lessonData) => await createLesson(lessonData),
    onSuccess: () => {
      toast.success("Lesson Created Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateLesson = () => {
  return useMutation<
    any,
    Error,
    { lessonId: string; data: Partial<ILessonData> }
  >({
    mutationKey: ["UPDATE_LESSON"],
    mutationFn: async (updateData) =>
      await updateLesson(updateData.lessonId, updateData.data),
    onSuccess: () => toast.success("Lesson Updated Successfully"),
  });
};

export const useGetAllLessons = () => {
  return useQuery({
    queryKey: ["GET_LESSONS"],
    queryFn: async () => await getAllLessons(),
  });
};
