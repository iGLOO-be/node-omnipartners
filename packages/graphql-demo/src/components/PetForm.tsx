import { Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import { SimpleInput } from "../layout/SimpleInput";
import {
  UserPetCreate,
  UserPetCreateVariables,
} from "./__generated__/UserPetCreate";
import { BreedSelector } from "./BreedSelector";
import { Radio } from "./Radio";

const UserPetCreateMutation = gql`
  mutation UserPetCreate($token: String!, $userPetInput: UserPetCreateInput!) {
    userPetCreate(token: $token, userPetInput: $userPetInput) {
      result {
        pet {
          name
          guid
          dob
          neutered
          gender
          pictureUrl
        }
      }
      error {
        message
      }
    }
  }
`;

export const PetForm = ({
  action,
  pet,
  token,
  resetState,
}: {
  action: string;
  pet: any;
  resetState: () => void;
  token: string;
}) => {
  const petCreate = useMutation<UserPetCreate, UserPetCreateVariables>(
    UserPetCreateMutation,
  );
  return (
    <div>
      <h1>{action.toUpperCase()}</h1>
      <Formik
        onSubmit={async values => {
          if (action === "create") {
            const { data } = await petCreate({
              variables: {
                token,
                userPetInput: {
                  ...values,
                },
              },
            });

            if (data && data.userPetCreate && data.userPetCreate.error) {
              console.log(
                "pet creation, validation error",
                data.userPetCreate.error.message,
              );
            }
            if (data && data.userPetCreate && data.userPetCreate.result) {
              console.log("pet created", data.userPetCreate.result);
              resetState()
            }
          } else if (action === "update") {
            // TODO mutation update
          }
        }}
        initialValues={{
          name: "",
          type: "",
          breed: "",
          dob: "",
          neutered: "",
          gender: "",
          pictureUrl: "",
        }}
        render={() => (
          <Form>
            <Field name="name" component={SimpleInput} />
            <Radio choices={["CAT", "DOG"]} label="Type" name="type" />
            <Field name="breed" component={BreedSelector} />
            <Field name="dob" type="date" component={SimpleInput} />
            <Radio choices={["Y", "N"]} label="Neutered" name="neutered" />
            <Radio choices={["M", "F"]} label="Gender" name="gender" />
            <Field name="pictureUrl" component={SimpleInput} type="file" />
            <button type="submit">Submit</button>
          </Form>
        )}
      />
    </div>
  );
};
