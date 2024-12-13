"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { ILessonData } from "@/types/lesson.types";

export const createLesson = async (lessonData: ILessonData) => {
  try {
    const res = await axiosInstance.post("/lessons", lessonData);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateLesson = async (
  lessonId: string,
  updateData: Partial<ILessonData>
) => {
  try {
    const { data } = await axiosInstance.put(
      `/lessons/${lessonId}`,
      updateData
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllLessons = async () => {
  try {
    const { data } = await axiosInstance.get("/lessons");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getLessonById = async (lessonId: string) => {
  try {
    const { data } = await axiosInstance.get(`/lessons/${lessonId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteLesson = async (lessonId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/lessons/${lessonId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
