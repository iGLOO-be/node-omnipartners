import { Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import { SimpleInput } from "../layout/SimpleInput";
import { useUser } from "../lib/user/useUser";
import {
  UserPartnerRelationCreate,
  UserPartnerRelationCreateVariables,
} from "./__generated__/UserPartnerRelationCreate";
import { GetUserPartnersQuery } from "./PartnerList";
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

export const PartnerForm = ({
  action,
  partner,
  resetState,
}: {
  action: string;
  partner: any;
  resetState: () => void;
}) => {
  const { userToken } = useUser();
  const partnerRelationCreate = useMutation<
    UserPartnerRelationCreate,
    UserPartnerRelationCreateVariables
  >(UserPartnerRelationCreateMutation, {
    refetchQueries: [
      {
        query: GetUserPartnersQuery,
        variables: {
          token: userToken,
          // userPartnerRelationCreateInput ???
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
              console.log("partner created", data.userPartnerRelationCreate.result);
              resetState();
            }
          } else if (action === "delete") {
            console.log("TODO");
          }
        }}
        initialValues={{
          extId: "",
          relationship: "clientof",
          roles: "",
          status: "submitted"
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
