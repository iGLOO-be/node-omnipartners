import React from "react";
import { LoginForm } from "../components/Login";
import { UserCreateForm } from "../components/UserCreateForm";
import { UserUpdateForm } from "../components/UserUpdateForm";

const UserPage = () => (
  <>
    <LoginForm />
    <UserCreateForm />
    <UserUpdateForm />
  </>
)

export default UserPage;
