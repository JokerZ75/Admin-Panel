import { Cards, Card } from "@/components/ui/Card";
import { Form } from "@/components/ui/Form";
import React from "react";
import FormItem from "../components/ui/Form/Form-Item";
import { type } from "os";
import { FormProvider, useForm } from "react-hook-form";
import { eventNames } from "process";

const Profile = () => {
  const {
    register: changeEmailReg,
    control,
    handleSubmit: handleSubmitEmail,
  } = useForm({});
  const { register: changePasswordReg, handleSubmit: handleSubmitPassword } =
    useForm();
  const { register: deleteAccountReg, handleSubmit: deleteAccountSubmit } =
    useForm();
  const { register: changeUsernameReg, handleSubmit: handleSubmitUsername } =
    useForm();

  return (
    <>
      <div id="main-content-container">
        <div id="heading">
          <h1>Profile</h1>
        </div>
        <Cards>
          <Card bodyID="profile-picture-card">
            <div id="profile-picture">
              <img src="test.jpeg" alt="Profile Image" />
            </div>
            <button id="upload-button">Upload Picture</button>
          </Card>
          <Card bodyID="profile-details-text" title="Profile Details">
            <p className="card-text">Username: DeaconH</p>
            <p className="card-text">Email: Deacon@mail.com</p>
            <p className="card-text">Api Key: idj29skk10aje93d20</p>
            <button id="api-button">Regenerate API KEY</button>
          </Card>
          <Card id="card-actions" bodyID="profile-actions" title="Actions">
            <Form
              id="change-username-form"
              onSubmit={handleSubmitUsername((formValues) => {
                event?.preventDefault();
                console.log(formValues);
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
