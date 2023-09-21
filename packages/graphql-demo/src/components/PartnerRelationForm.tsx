import { useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { SimpleInput } from "../layout/SimpleInput";
import {
  UserPartnerRelationCreate,
  UserPartnerRelationCreateVariables,
} from "./__generated__/UserPartnerRelationCreate";

import { useUserToken } from "@igloo-be-omnipartners/hooks";
import { GetUserPartnersQuery } from "./PartnerRelationList";
import { Radio } from "./Radio";

const UserPartnerRelationCreateMutation = gql`
  mutation UserPartnerRelationCreate(
    $token: String!
    $userPartnerInput: UserPartnerRelationCreateInput!
  ) {
    userPartnerRelationCreate(
      token: $token
      userPartnerInput: $userPartnerInput
    ) {
      result {
        user {
          id
          owner {
            id
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

export const PartnerRelationForm = ({
  action,
  partner,
  resetState,
}: {
  action: string;
  partner: any;
  resetState: () => void;
}) => {
  const userToken = useUserToken();
  const [partnerRelationCreate] = useMutation<
    UserPartnerRelationCreate,
    UserPartnerRelationCreateVariables
  >(UserPartnerRelationCreateMutation, {
    refetchQueries: [
      {
        query: GetUserPartnersQuery,
        variables: {
          token: userToken,
        },
      },
    ],
  });

  return (
    <div>
      <h1>{action.toUpperCase()}</h1>
      <Formik
        onSubmit={async values => {
          if (action === "create") {
            const { data } = await partnerRelationCreate({
              variables: {
                token: userToken,
                userPartnerInput: {
                  ...values,
                },
              },
            });

            if (
              data &&
              data.userPartnerRelationCreate &&
              data.userPartnerRelationCreate.error
            ) {
              console.log(
                "partner creation, validation error",
                data.userPartnerRelationCreate.error.message,
              );
            }
            if (
              data &&
              data.userPartnerRelationCreate &&
              data.userPartnerRelationCreate.result
            ) {
              console.log(
                "partner relation created",
                data.userPartnerRelationCreate.result,
              );
              resetState();
            }
          }
        }}
        initialValues={{
          extId: "",
          relationship: "clientof",
          roles: "",
          status: "submitted",
        }}
        render={() => (
          <Form>
            <Field name="extId" component={SimpleInput} />
            <Field name="relationship" component={SimpleInput} disabled />
            <Field name="roles" component={SimpleInput} />
            <Radio
              choices={["submitted", "accepted", "pending", "refused"]}
              label="Status"
              name="status"
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      />
    </div>
  );
};
