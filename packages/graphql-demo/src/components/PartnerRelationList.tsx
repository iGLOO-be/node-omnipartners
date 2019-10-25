import { useMutation, useQuery } from "@apollo/react-hooks";
import { useUserToken } from "@igloo-be-omnipartners/hooks";
import gql from "graphql-tag";
import React from "react";
import { Loading } from "../layout/Loading";
import {
  GetUserPartners,
  GetUserPartnersVariables,
} from "./__generated__/GetUserPartners";
import {
  UserPartnerRelationDelete,
  UserPartnerRelationDeleteVariables,
} from "./__generated__/UserPartnerRelationDelete";

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

const UserPartnerRelationDeleteMutation = gql`
  mutation UserPartnerRelationDelete(
    $token: String!
    $userPartnerInput: UserPartnerRelationDeleteInput!
  ) {
    userPartnerRelationDelete(
      token: $token
      userPartnerInput: $userPartnerInput
    ) {
      result {
        user {
          owner {
            guid
          }
          partners {
            clientof {
              extId
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

export const PartnerRelationList = ({
  handleCreate,
  resetState,
}: {
  handleCreate: () => void;
  resetState: () => void;
}) => {
  const userToken = useUserToken();
  const { data, loading } = useQuery<GetUserPartners, GetUserPartnersVariables>(
    GetUserPartnersQuery,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        token: userToken,
      },
    },
  );

  const [partnerRelationDelete] = useMutation<
    UserPartnerRelationDelete,
    UserPartnerRelationDeleteVariables
  >(UserPartnerRelationDeleteMutation, {
    refetchQueries: [
      {
        query: GetUserPartnersQuery,
        variables: {
          token: userToken,
        },
      },
    ],
  });

  const handleDelete = async partner => {
    const { data: deletedData } = await partnerRelationDelete({
      variables: {
        token: userToken,
        userPartnerInput: {
          extId: partner.extId,
          relationship: "clientof",
        },
      },
    });

    if (
      deletedData &&
      deletedData.userPartnerRelationDelete &&
      deletedData.userPartnerRelationDelete.error
    ) {
      console.log(
        "partner creation, validation error",
        deletedData.userPartnerRelationDelete.error.message,
      );
    }
    if (
      deletedData &&
      deletedData.userPartnerRelationDelete &&
      deletedData.userPartnerRelationDelete.result
    ) {
      console.log(
        "partner relation deleted",
        deletedData.userPartnerRelationDelete.result,
      );
      resetState();
    }
  };

  const isLoading = !data && loading;

  return (
    <>
      <h2>Partner relation list</h2>
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
