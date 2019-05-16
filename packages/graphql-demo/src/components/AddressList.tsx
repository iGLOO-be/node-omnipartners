import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Loading } from "../layout/Loading";
import { useUser } from "../lib/user/useUser";
import {
  GetUserAddresses,
  GetUserAddressesVariables,
} from "./__generated__/GetUserAddresses";

export const GetUserAddressesQuery = gql`
  query GetUserAddresses($token: String!) {
    user(token: $token) {
      result {
        owner {
          guid
        }
        addresses {
          id
          name
          streetnum
          street1
          postalCode
          city
          country
        }
      }
      error {
        message
      }
    }
  }
`;

export const AddressList = ({
  handleCreate,
  handleUpdate,
}: {
  handleCreate: () => void;
  handleUpdate: (pet: any) => void;
}) => {
  const { userToken } = useUser();
  const { data, loading } = useQuery<
    GetUserAddresses,
    GetUserAddressesVariables
  >(GetUserAddressesQuery, {
    fetchPolicy: "cache-and-network",
    variables: {
      token: userToken,
    },
  });

  const isLoading = !data && loading;

  return (
    <>
      {data &&
      data.user &&
      data.user.result &&
      data.user.result.addresses &&
      !isLoading ? (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>streetnum</th>
              <th>street1</th>
              <th>postalCode</th>
              <th>city</th>
              <th>country</th>
            </tr>
          </thead>
          <tbody>
            {data.user.result.addresses.map(address => (
              <tr key={address.id}>
                <td>{address.name}</td>
                <td>{address.streetnum}</td>
                <td>{address.street1}</td>
                <td>{address.postalCode}</td>
                <td>{address.city}</td>
                <td>{address.country}</td>
                <td>
                  <button onClick={() => handleUpdate(address)}>edit</button>
                </td>
                <td>
                  <button onClick={() => console.log("DELETE", address)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td>
                <button onClick={handleCreate}>create</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </>
  );
};
