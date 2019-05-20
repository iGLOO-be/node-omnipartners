import { navigate } from "gatsby";
import React from "react"
import { Loading } from "../layout/Loading";
import { useUser } from "./user/useUser";

export const UserRouteValidator = (props) => {
  const { isLoading, isLogged } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLogged) {
    navigate('/')
    return null
  }

  return props.children
}