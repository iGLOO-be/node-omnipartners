import { useUserIsLogged } from "@igloo-be-omnipartners/hooks";
import { navigate } from "gatsby";
import React from "react";
import { LoginForm } from "../components/LoginForm";

const Login = () => {
  const isLogged = useUserIsLogged();

  if (isLogged) {
    navigate("/pet");
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSuccess={() => navigate("/pet")} />
    </div>
  );
};

export default Login;
