"use server";
import axiosInstance from "@/lib/AxiosInstance";
import IVocabulary, { IVocabularyUpdateProps } from "@/types/vocabulary.types";

export const createVocabulary = async (vocabData: Partial<IVocabulary>) => {
  try {
    const { data } = await axiosInstance.post("/vocabulary", vocabData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateVocabulary = async (
  id: string,
  vocabData: Partial<IVocabularyUpdateProps>
) => {
  try {
    const { data } = await axiosInstance.put(`/vocabulary/${id}`, vocabData);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getVocabulary = async (lessonNumber?: string) => {
  const params = new URLSearchParams();
  if (lessonNumber && lessonNumber != "all") {
    params.append("lessonNumber", lessonNumber as string);
  }

  try {
    const { data } = await axiosInstance.get(`/vocabulary`, { params: params });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getVocabularyById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/vocabulary/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteVocabulary = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/vocabulary/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
