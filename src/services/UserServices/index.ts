"use server";
import axiosInstance from "@/lib/AxiosInstance";
import { ILogin, ISignUp } from "@/types/user.types";
import { jwtDecode } from "jwt-decode";
import { revalidatePath } from "next/cache";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { cookies } from "next/headers";

export const signUp = async (userData: ISignUp) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    throw new Error(error);
  }
};

export const loginUser = async (userData: ILogin) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
    throw new Error(error);
  }
};

export const logout = () => {
  try {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  try {
    let decodedToken = null;

    if (accessToken) {
      decodedToken = await jwtDecode(accessToken);
      return {
        _id: decodedToken._id as string,
        name: decodedToken.name as string,
        photo: decodedToken.photo as string,
        email: decodedToken.email as string,
        role: decodedToken.role as string,
        completedLessons: decodedToken.completedLessons,
      };
    }
    return decodedToken;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    throw new Error("Failed to get new Access Token");
  }
};

export const manageAdmin = async (email: string, newRole: "admin" | "user") => {
  try {
    const res = await axiosInstance({
      url: "/auth/manage-admin",
      method: "PUT",
      withCredentials: true,
      data: { email, newRole },
    });
    revalidatePath("/");
    return res.data;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/auth");
    return data;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};

export const lessonComplete = async (userId: string, lessonNumber: number) => {
  try {
    const { data } = await axiosInstance.put("/auth/lesson-complete", {
      lessonNumber,
      userId,
    });
    return data;
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }
    console.log(error);
  }
};
