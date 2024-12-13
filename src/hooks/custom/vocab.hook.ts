import {
  createVocabulary,
  getVocabulary,
  updateVocabulary,
} from "@/services/VocabularyServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllVocabulary = () => {
  return useQuery({
    queryKey: ["GET_VOCABULARY"],
    // DevNote: watch video and fix how to send params
    queryFn: async () => await getVocabulary(),
  });
};

export const useCreateVocabulary = () => {
  return useMutation<any, Error, Record<string, unknown>>({
    mutationKey: ["CREATE_VOCABULARY"],
    mutationFn: async (data) => await createVocabulary(data),
  });
};

export const useUpdateVocabulary = () => {
  return useMutation<
    any,
    Error,
    { id: string; vocabData: Record<string, unknown> }
  >({
    mutationKey: ["UPDATE_VOCABULARY"],
    mutationFn: async ({ id, vocabData }) =>
      await updateVocabulary(id, vocabData),
    onSuccess: () => {
      toast.success("Vocabulary Updated Successfully");
    },
  });
};
