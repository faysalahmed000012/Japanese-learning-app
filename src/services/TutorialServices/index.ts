"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { revalidatePath } from "next/cache";

export const addTutorial = async (link: string) => {
  try {
    const { data } = await axiosInstance.post("/tutorial", { link });
    revalidatePath("/dashboard");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateTutorial = async (id: string, link: string) => {
  try {
    const { data } = await axiosInstance.put(`/tutorial/${id}`, { link });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllTutorials = async () => {
  try {
    const { data } = await axiosInstance.get("/tutorial");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteTutorial = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/tutorial/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
