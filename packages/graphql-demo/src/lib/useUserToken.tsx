import gql from "graphql-tag";
import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import {
  UseUserTokenLogin,
  UseUserTokenLoginVariables,
} from "./__generated__/UseUserTokenLogin";

const UseUserTokenLoginQuery = gql`
  query UseUserTokenLogin($identifier: String!, $password: String!) {
    userLogin(identifier: $identifier, password: $password) {
      result {
        token
      }
      error {
        message
      }
    }
  }
`;

const readFromStorage = () =>
  window.localStorage.getItem("omnipartners.graphql-demo.useUserToken");
const writeFromStorage = (token: string) =>
  window.localStorage.setItem("omnipartners.graphql-demo.useUserToken", token);

export const useUserToken = () => {
  const [token, setToken] = useState(readFromStorage() || "");
  const updateToken = (value: string) => {
    setToken(value);
    writeFromStorage(value);
  };

  const { refetch } = useQuery<UseUserTokenLogin, UseUserTokenLoginVariables>(
    UseUserTokenLoginQuery,
    {
      skip: true,
    },
  );

  return {
    token,
    renderInput: (
      <div style={{ marginBottom: 15 }}>
        <input
          value={token}
          onChange={e => {
            updateToken(e.currentTarget.value);
          }}
        />
        <button
          onClick={async e => {
            e.preventDefault();

            const identifier = prompt("Login ?");
            const password = prompt("Password ?");

            if (identifier && password) {
              const { data } = await refetch({ identifier, password });
              if (data.userLogin && data.userLogin.result) {
                updateToken(data.userLogin.result.token);
              } else if (data.userLogin && data.userLogin.error) {
                alert(data.userLogin.error.message);
              }
            }
          }}
        >
          Login
        </button>
      </div>
    ),
  };
};
