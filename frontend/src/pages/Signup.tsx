import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Input } from "../components/ui/Form";
import { Card, Cards } from "@/components/ui/Card";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { get } from "http";
import toast from "react-hot-toast";

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({});

  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationKey: ["signup", getValues()],
    mutationFn: async (data: any) => {
      const res = await axios.post("http://localhost:8008/users/add", data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Successfully signed up");
    },
    onError: (error : any) => {;
      if (error.response.status === 409) {
        toast.error("Username or email already taken");
      } else {
        toast.error("Something went wrong, try again later");
      }
    },
  });

  return (
    <>
      <div id="main-content-container">
        <div id="heading">
          <h1>Sign up</h1>
        </div>
        <Cards>
          <Card bodyID="login-card">
            <div id="login-form-container">
              <Form
                onSubmit={handleSubmit((formValues) => {
                  // @ts-expect-error
                  event.preventDefault();
                  formValues = {
                    username: formValues.username,
                    email: formValues.email,
                    password: formValues.password,
                  };
                  const response = mutate(formValues);
                  console.log(response);
                })}
              >
                <Input
                  Type="text"
                  For="username"
                  Label="Username"
                  placeholder="John123"
                  register={register("username", {
                    maxLength: 20,
                    minLength: 3,
                    required: true,
                  })}
                />
                {errors.username && (
                  <p>Username must be between 3 and 20 characters</p>
                )}
                <Input
                  Type="email"
                  For="email"
                  Label="Email"
                  placeholder="John123@email.com"
                  register={register("email", {
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
                {errors.email && <p>Invalid email</p>}
                <Input
                  Type="password"
                  For="password"
                  Label="Password"
                  placeholder="********"
                  register={register("password", {
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    required: true,
                  })}
                />
                {errors.password && (
                  <p>
                    Password must be at least 8 characters long and contain at
                    least one uppercase letter, one lowercase letter and one
                    number
                  </p>
                )}
                <Input
                  Type="password"
                  For="confirm-password"
                  Label="Confirm Password"
                  placeholder="********"
                  required={true}
                  register={register("confirm-password", {
                    required: true,
                    validate: (value) => {
                      return value === getValues("password");
                    },
                  })}
                />
                {errors["confirm-password"] && <p>Passwords must match</p>}
                <input type="submit" value="Register" />
              </Form>
            </div>
          </Card>
          <Card>
            <h2>Already have an account?</h2>
            <Link className="link-card" to="/">
              <h1 className="link-text-card">Login</h1>
            </Link>
          </Card>
        </Cards>
      </div>
    </>
  );
};

export default Signup;
