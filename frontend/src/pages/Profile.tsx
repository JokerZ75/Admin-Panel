import { Cards, Card } from "@/components/ui/Card";
import { Form } from "@/components/ui/Form";
import FormItem from "../components/ui/Form/Form-Item";
import { set, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import { Loading } from "@/components";
import React from "react";
import { useUpdateAccount } from "@/lib/hooks/use-updateAcount";
import { get } from "http";

const Profile = () => {
  const { data, refetch } = useQuery({
    queryKey: ["profile", "details"],
    queryFn: async () => {
      const data = await axios.get("http://localhost:8008/users/", {
        headers: {
          Authorization: authHeader(),
        },
      });
      console.log(data);
      return data.data as unknown as {
        username: string;
        email: string;
        profileImage: string;
      };
    },
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error("Something went wrong, try again later");
    },
  });

  const {
    register: changeEmailReg,
    control,
    handleSubmit: handleSubmitEmail,
  } = useForm({});
  const { register: changePasswordReg, handleSubmit: handleSubmitPassword } =
    useForm();
  const { register: deleteAccountReg, handleSubmit: deleteAccountSubmit } =
    useForm();
  const {
    register: changeUsernameReg,
    handleSubmit: handleSubmitUsername,
    getValues: getUserValues,
  } = useForm();
  const { register: profilePicture, handleSubmit: handleSubmitProfilePicture } =
    useForm();

  const authHeader = useAuthHeader();

  const { mutate: uploadImage } = useMutation({
    mutationFn: async (formData: any) => {
      const data = await axios.post(
        "http://localhost:8008/users/upload",
        formData,
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Image Uploaded Successfully");
      window.location.reload();
    },
    onError: (err: any) => {
      console.log(err.response.status);
      if (err.response.status === 413) {
        toast.error("Image too large");
      } else if (err.response.status === 402) {
        toast.error("Image type not supported");
      } else {
        toast.error("Image Upload Failed");
      }
    },
  });
  const { mutate: updateUsername } = useUpdateAccount(
    "username",
    getUserValues().username,
    refetch()
  );

  return (
    <>
      <div id="main-content-container">
        <div id="heading">
          <h1>Profile</h1>
        </div>
        <Cards>
          <Card bodyID="profile-picture-card">
            <div id="profile-picture">
              {(data && (
                <img src={data?.profileImage} alt="Profile Image" />
              )) || <p>Loading...</p>}
            </div>
            <Form
              id="upload-picture-form"
              onSubmit={handleSubmitProfilePicture((formValues) => {
                event?.preventDefault();
                const formData = new FormData();
                formData.append("profileImage", formValues.profileImage[0]);
                uploadImage(formData);
              })}
            >
              <input
                type="file"
                id="upload-button"
                accept="image/*"
                {...profilePicture("profileImage")}
              />
              <button type="submit" id="upload-button">
                Upload Picture
              </button>
            </Form>
          </Card>
          <Card bodyID="profile-details-text" title="Profile Details">
            {(data && (
              <>
                <p className="card-text">Username: {data?.username}</p>
                <p className="card-text">Email: {data?.email}</p>
              </>
            )) || <p>Loading...</p>}
          </Card>
          <Card
            id="card-actions"
            cardClass="force-wrap"
            bodyID="profile-actions"
            title="Actions"
          >
            <Form
              id="change-username-form"
              onSubmit={handleSubmitUsername((formValues) => {
                event?.preventDefault();
                updateUsername(formValues);
              })}
            >
              <FormItem
                Type="text"
                For="newUsername"
                Label="Username"
                placeholder="John"
                required={true}
                register={changeUsernameReg("username")}
              />
              <input type="submit" value="Change Username" />
            </Form>
            <Form
              id="change-email-form"
              onSubmit={handleSubmitEmail((formValues) => {
                event?.preventDefault;
                console.log(formValues);
              })}
            >
              <FormItem
                Type="text"
                For="newEmail"
                Label="Email"
                placeholder="John@email.com"
                required={true}
                register={changeEmailReg("email")}
              />
              <input type="submit" value="Change Email" />
            </Form>
            <Form
              id="change-email-form"
              onSubmit={handleSubmitPassword((formValues) => {
                event?.preventDefault();
                console.log(formValues);
              })}
            >
              <FormItem
                Type="password"
                For="newPassword"
                Label="Password"
                placeholder="*******"
                required={true}
                register={changePasswordReg("newPassword")}
              />
              <FormItem
                Type="password"
                For="confirmPassword"
                Label="Confirm Password"
                placeholder="*******"
                required={true}
                register={changePasswordReg("confirmPassword")}
              />
              <input type="submit" value="Change Password" />
            </Form>
            <Form
              id="delete-account"
              onSubmit={deleteAccountSubmit((formValues) => {
                event?.preventDefault();
                console.log(formValues);
              })}
            >
              <FormItem
                Type="text"
                For="deleteAccount"
                Label="Username"
                placeholder="Type Username to confirm deletion"
                required={true}
                register={deleteAccountReg("deleteAccount")}
              />
              <input id="delete-button" type="submit" value="Delete Account" />
            </Form>
          </Card>
        </Cards>
      </div>
    </>
  );
};

export default Profile;
