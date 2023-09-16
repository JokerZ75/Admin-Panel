import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";

interface Payload {
  _id?: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  products: any[];
  amount: number;
  status: "Success" | "Pending" | "Cancelled";
  shipped: "Shipped" | "Pending";
}

export const usePost = () => {
  const authHeader = useAuthHeader();
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationKey: ["order", "add"],
    mutationFn: async (data: Payload) => {
      const response = await axios.post(
        "http://localhost:8008/orders/add",
        data,
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Order created successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { mutate, isLoading, isError, isSuccess };
};

export const useUpdate = () => {
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationKey: ["order", "update"],
    mutationFn: async (data: Payload) => {
      const response = await axios.put(
        `http://localhost:8008/orders/update/${data._id}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Order updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return { mutate, isLoading, isError, isSuccess };
};

export const useDelete = () => {
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationKey: ["order", "delete"],
    mutationFn: async (id: string) => {
      const response = await axios.delete(`http://localhost:8008/orders/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Order deleted successfully");
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
  });

  return { mutate, isLoading, isError, isSuccess };
};
