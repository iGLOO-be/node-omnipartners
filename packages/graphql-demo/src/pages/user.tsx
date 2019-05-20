import React, { useState } from "react";
import { UserCreateForm } from "../components/UserCreateForm";
import { UserUpdateForm } from "../components/UserUpdateForm";
import { UserRouteValidator } from "../lib/UserRouteValidator";

const User = () => {
  return (
    <UserRouteValidator>
      <UserCreateForm />
      <UserUpdateForm />
    </UserRouteValidator>
  );
};

export default User;
