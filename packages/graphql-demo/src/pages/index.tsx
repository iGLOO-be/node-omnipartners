import { navigate } from "gatsby";
import React from "react";
import { LoginForm } from "../components/LoginForm";
import { useUser } from "../lib/user/useUser";

const Login = () => {
  const { isLogged } = useUser();

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
