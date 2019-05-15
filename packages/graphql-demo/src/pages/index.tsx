import { navigate } from "gatsby";
import React from "react";
import { LoginForm } from "../components/LoginForm";

const Login = () => (
  <div>
    <h1>Login</h1>
    <LoginForm onSuccess={() => navigate("/dashboard")} />
  </div>
);

export default Login;
