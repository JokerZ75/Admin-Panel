import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";

export const useUpdateAccount = (
  endPoint: string,
  mutationKey: string,
  refetch: any
) => {
  const authHeader = useAuthHeader();
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationKey: [mutationKey, "update"],
    mutationFn: async (data: any) => {
      const response = await axios.put(
        `http://localhost:8008/users/update/${endPoint}`,
        data,
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Account updated successfully");
      refetch();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Something went wrong");
    },
  });
  return { mutate, isLoading, isError, isSuccess };
};
