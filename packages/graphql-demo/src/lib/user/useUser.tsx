import gql from "graphql-tag";
import { useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import {
  UseUserFetch,
  UseUserFetchVariables,
} from "./__generated__/UseUserFetch";
import { useUserContext } from "./UserContext";

const UseUserFetchQuery = gql`
  query UseUserFetch($userToken: String!) {
    user(token: $userToken) {
      result {
        token
        owner {
          guid
          dob
          gender
          firstName
          lastName
          title
          email
          mobilePhone
          language
        }
      }
      error {
        message
      }
    }
  }
`;

export const useLogout = ({ logoutOnMount = false } = {}) => {
  const { updateState } = useUserContext();
  const logout = () => {
    updateState({ userToken: null });
  };

  useEffect(() => {
    if (logoutOnMount) {
      logout();
    }
  });

  return {
    logout,
  };
};

export const useUser = () => {
  const { userToken } = useUserContext();
  const token = userToken || "";

  const { data, loading } = useQuery<UseUserFetch, UseUserFetchVariables>(UseUserFetchQuery, {
    fetchPolicy: "cache-and-network",
    skip: !token,
    variables: {
      userToken: token,
    },
  });

  const isLogged =
    !!(data && data.user && data.user.result) || (userToken && loading);
  const isLoading = !data && loading;

  return {
    isLoading,
    isLogged,
    user: { ...data },
    userToken,
  };
};
