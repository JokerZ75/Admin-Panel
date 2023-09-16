import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Input } from "../components/ui/Form";
import { Card, Cards } from "@/components/ui/Card";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useSignIn } from "react-auth-kit";

const Login = () => {
  const { register, handleSubmit, getValues } = useForm();
  const signIn = useSignIn();

  const { mutate, data, isError } = useMutation({
    mutationKey: [{
        username: getValues("username"),
        password: getValues("password"),
    }],
    mutationFn: async (data: any) => {
      const res = await axios.post("http://localhost:8008/users/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      signIn({
        token: data.token,
        expiresIn: data.expiresIn,
        tokenType: "Bearer",
        authState: { username: data.user},
        refreshToken: data.refreshToken,
        refreshTokenExpireIn: 3600,
      })
      toast.success("Successfully logged in");
    },
    onError: (error) => {
      toast.error("Something went wrong, try again later");
    },
  });

  return (
    <>
      <div id="main-content-container">
        <div id="heading">
          <h1>Login</h1>
        </div>
        <Cards>
          <Card bodyID="login-card">
            <div id="login-form-container">
              <Form
                onSubmit={handleSubmit((formValues) => {
                  mutate(formValues);
                })}
              >
                <Input
                  Type="text"
                  For="username"
                  Label="Username/Email"
                  placeholder="John123"
                  required={true}
                  register={register("username")}
                />
                <Input
                  Type="password"
                  For="password"
                  Label="Password"
                  placeholder="********"
                  required={true}
                  register={register("password")}
                />
                <input type="submit" value="Login" />
                {isError && <p>Invalid Username Or Password.</p>}
              </Form>
            </div>
          </Card>
          <Card>
            <h2>Don't have an account?</h2>
            <Link className="link-card" to="/signup">
              <h1 className="link-text-card">Sign Up</h1>
            </Link>
          </Card>
        </Cards>
      </div>
    </>
  );
};

export default Login;
