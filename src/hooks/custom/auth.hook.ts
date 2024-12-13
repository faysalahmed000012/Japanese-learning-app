import {
  getAllUsers,
  loginUser,
  manageAdmin,
  signUp,
} from "@/services/UserServices";
import { ILogin, ISignUp } from "@/types/user.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSignup = () => {
  return useMutation<any, Error, ISignUp>({
    mutationKey: ["USER_SIGNUP"],
    mutationFn: async (userData) => await signUp(userData),
    onSuccess: () => {
      toast.success("User Registration Successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLogin = () => {
  return useMutation<any, Error, ILogin>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User Login Successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useManageAdmin = () => {
  return useMutation<any, Error, { email: string; newRole: "user" | "admin" }>({
    mutationKey: ["USER_UPDATE"],
    mutationFn: async ({ email, newRole }) => await manageAdmin(email, newRole),
    onSuccess: () => {
      toast.success("User Role Changed Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["ALL_USERS"],
    queryFn: async () => await getAllUsers(),
  });
};
