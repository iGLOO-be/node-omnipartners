import gql from "graphql-tag";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Loading } from "../layout/Loading";
import { useUser } from "../lib/user/useUser";
import {
  GetUserPartners,
  GetUserPartnersVariables,
} from "./__generated__/GetUserPartners";

export const GetUserPartnersQuery = gql`
  query GetUserPartners($token: String!) {
    user(token: $token) {
      result {
        owner {
          guid
        }
        partners {
          clientof {
            extId
            type
            roles
            partner {
              extId
              street1
              streetnum
              postalCode
              city
              country
              email
              phone
            }
          }
        }
      }
      error {
        message
      }
    }
  }
`;

export const PartnerList = ({
  handleCreate,
  handleDelete,
}: {
  handleCreate: () => void;
  handleDelete: (pet: any) => void;
}) => {
  const { userToken } = useUser();
  const { data, loading } = useQuery<GetUserPartners, GetUserPartnersVariables>(
    GetUserPartnersQuery,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        token: userToken,
      },
    },
  );

  const isLoading = !data && loading;

  return (
    <>
      {data &&
      data.user &&
      data.user.result &&
      data.user.result.partners &&
      !isLoading ? (
        <table>
          <thead>
            <tr>
              <th>clientof</th>
            </tr>
            <tr>
              <th>extId</th>
              <th>type</th>
              <th>roles</th>
              <th>partner detail</th>
            </tr>
          </thead>
          <tbody>
            {data.user.result.partners.clientof.map(partner => (
              <tr key={partner.extId}>
                <td>{partner.extId}</td>
                <td>{partner.type}</td>
                <td>{partner.roles}</td>
                <td>
                  <pre>{JSON.stringify(partner.partner, null, 2)}</pre>
                </td>
                <td>
                  <button onClick={() => handleDelete(partner)}>delete</button>
                </td>
              </tr>
            ))}
            <tr>
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
