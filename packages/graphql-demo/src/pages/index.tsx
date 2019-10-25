import { useUserIsLogged } from "@igloo-be-omnipartners/hooks";
import { navigate } from "gatsby";
import React, { useEffect } from "react";
import { LoginForm } from "../components/LoginForm";

const Login = () => {
  const isLogged = useUserIsLogged();

  useEffect(() => {
    if (isLogged) {
      navigate("/pet");
    }
  }, [isLogged]);

  console.log(isLogged);

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSuccess={() => navigate("/pet")} />
    </div>
  );
};

export default Login;
