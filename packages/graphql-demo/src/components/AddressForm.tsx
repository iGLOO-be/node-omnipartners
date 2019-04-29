import { Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import { SimpleInput } from "../layout/SimpleInput";
import { UserAddressCreate, UserAddressCreateVariables } from "./__generated__/UserAddressCreate";
import { UserAddressUpdate, UserAddressUpdateVariables } from "./__generated__/UserAddressUpdate";
import { CountrySelector } from "./CountrySelector";

const UserAddressCreateMutation = gql`
  mutation UserAddressCreate(
    $token: String!
    $userAddressInput: UserAddressCreateInput!
  ) {
    userAddressCreate(token: $token, userAddressInput: $userAddressInput) {
      result {
        address {
          id
          name
          city
          country
          streetnum
          street1
          postalCode
        }
      }
      error {
        message
      }
    }
  }
`;

const UserAddressUpdateMutation = gql`
  mutation UserAddressUpdate(
    $token: String!
    $userAddressInput: UserAddressUpdateInput!
  ) {
    userAddressUpdate(token: $token, userAddressInput: $userAddressInput) {
      result {
        address {
          id
          name
          city
          country
          streetnum
          street1
          postalCode
        }
      }
      error {
        message
      }
    }
  }
`;

export const AddressForm = ({
  action,
  address,
  token,
  resetState,
}: {
  action: string;
  address: any;
  resetState: () => void;
  token: string;
}) => {
  const addressCreate = useMutation<UserAddressCreate, UserAddressCreateVariables>(
    UserAddressCreateMutation,
  );

  const addressUpdate = useMutation<UserAddressUpdate, UserAddressUpdateVariables>(
    UserAddressUpdateMutation,
  );
  return (
    <div>
      <h1>{action.toUpperCase()}</h1>
      <Formik
        onSubmit={async values => {
          if (action === "create") {
            const { data } = await addressCreate({
              variables: {
                token,
                userAddressInput: {
                  ...values,
                },
              },
            });

            if (
              data &&
              data.userAddressCreate &&
              data.userAddressCreate.error
            ) {
              console.log(
                "address creation, validation error",
                data.userAddressCreate.error.message,
              );
            }
            if (
              data &&
              data.userAddressCreate &&
              data.userAddressCreate.result
            ) {
              console.log("address created", data.userAddressCreate.result);
              resetState();
            }
          } else if (action === "update") {
            const { data } = await addressUpdate({
              variables: {
                token,
                userAddressInput: {
                  id: `${address.id}`,
                  ...values,
                },
              },
            });

            if (
              data &&
              data.userAddressUpdate &&
              data.userAddressUpdate.error
            ) {
              console.log(
                "address edition, validation error",
                data.userAddressUpdate.error.message,
              );
            }
            if (
              data &&
              data.userAddressUpdate &&
              data.userAddressUpdate.result
            ) {
              console.log("address updated", data.userAddressUpdate.result);
              resetState();
            }
          }
        }}
        initialValues={{
          name: address && address.name || "",
          city: address && address.city || "",
          country: address && address.country || "",
          streetnum: address && address.streetnum || "",
          street1: address && address.street1 || "",
          postalCode: address && address.postalCode || "",
        }}
        render={() => (
          <Form>
            <Field name="name" component={SimpleInput} />
            <Field name="city" component={SimpleInput} />
            <CountrySelector />
            <Field name="streetnum" component={SimpleInput} />
            <Field name="street1" component={SimpleInput} />
            <Field name="postalCode" component={SimpleInput} />
            <button type="submit">Submit</button>
          </Form>
        )}
      />
    </div>
  );
};
