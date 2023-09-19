import { Cards, Card } from "@/components/ui/Card";
import { Form } from "@/components/ui/Form";
import FormItem from "../components/ui/Form/Form-Item";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import { useUpdateAccount } from "@/lib/hooks/use-updateAcount";

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
    formState: { errors: emailErrors },
    getValues: getEmailValues,
  } = useForm({});
  const {
    register: changePasswordReg,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    getValues: getPasswordValues,
  } = useForm();
  const {
    register: deleteAccountReg,
    handleSubmit: deleteAccountSubmit,
    formState: { errors: deleteErrors },
  } = useForm();
  const {
    register: changeUsernameReg,
    handleSubmit: handleSubmitUsername,
    getValues: getUserValues,
    formState: { errors: usernameErrors },
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
  const { mutate: updateEmail } = useUpdateAccount(
    "email",
    getEmailValues().email,
    refetch()
  );
  const { mutate: updatePassword } = useUpdateAccount(
    "password",
    getUserValues().password,
    refetch()
  );
  const { mutate: deleteAccount } = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(
        "http://localhost:8008/users/update/delete",
        data,
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account Deleted Successfully");
      window.location.reload();
    },
    onError: (err: any) => {
      toast.error("Account Deletion Failed");
    },
  });

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
                register={changeUsernameReg("username", {
                  maxLength: 20,
                  minLength: 3,
                  required: true,
                })}
              />
              {usernameErrors.username && (
                <p>Username must be between 3 and 20 characters</p>
              )}
              <input type="submit" value="Change Username" />
            </Form>
            <Form
              id="change-email-form"
              onSubmit={handleSubmitEmail((formValues) => {
                event?.preventDefault;
                updateEmail(formValues);
              })}
            >
              <FormItem
                Type="text"
                For="newEmail"
                Label="Email"
                placeholder="John@email.com"
                register={changeEmailReg("email", {
                  validate: (value) => {
                    return (
                      value.includes("@") &&
                      value.includes(".") &&
                      value.length > 5
                    );
                  },
                  required: true,
                })}
              />
              {emailErrors.email && <p>Invalid email</p>}
              <input type="submit" value="Change Email" />
            </Form>
            <Form
              id="change-email-form"
              onSubmit={handleSubmitPassword((formValues) => {
                event?.preventDefault();
                updatePassword(formValues);
              })}
            >
              <FormItem
                Type="password"
                For="password"
                Label="Password"
                placeholder="*******"
                required={true}
                register={changePasswordReg("password", {
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                  required: true,
                })}
              />
              {passwordErrors.password && (
                <p>
                  Password must be at least 8 characters long and contain at
                  least one uppercase letter, one lowercase letter and one
                  number
                </p>
              )}
              <FormItem
                Type="password"
                For="confirmPassword"
                Label="Confirm Password"
                placeholder="*******"
                required={true}
                register={changePasswordReg("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    return value === getPasswordValues().password;
                  },
                })}
              />
              {passwordErrors.confirmPassword && <p>Passwords do not match</p>}
              <input type="submit" value="Change Password" />
            </Form>
            <Form
              id="delete-account"
              onSubmit={deleteAccountSubmit((formValues) => {
                event?.preventDefault();
                const cookie = document.cookie.split(";").find((c) => {
                  if (c.includes("_auth_refresh")) return c;
                })?.split("=")[1];
                const newFormValues = {
                  ...formValues,
                  refreshToken: cookie,
                };
                deleteAccount(newFormValues);
              })}
            >
              <FormItem
                Type="text"
                For="username"
                Label="Username"
                placeholder="Type Username to confirm deletion"
                register={deleteAccountReg("username", {
                  required: true,
                  validate: (value) => {
                    return value === data?.username;
                  },
                })}
              />
              {deleteErrors.username && <p>Username does not match</p>}
              <input id="delete-button" type="submit" value="Delete Account" />
            </Form>
          </Card>
        </Cards>
      </div>
    </>
  );
};

export default Profile;
