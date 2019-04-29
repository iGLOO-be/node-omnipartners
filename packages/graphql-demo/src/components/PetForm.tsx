import { Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { useMutation } from "react-apollo-hooks";
import { SimpleInput } from "../layout/SimpleInput";
import {
  UserPetCreate,
  UserPetCreateVariables,
} from "./__generated__/UserPetCreate";
import {
  UserPetUpdate,
  UserPetUpdateVariables,
} from "./__generated__/UserPetUpdate";
import { BreedSelector } from "./BreedSelector";
import { GetUserPetsQuery } from "./PetList";
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

const UserPetUpdateMutation = gql`
  mutation UserPetUpdate($token: String!, $userPetInput: UserPetUpdateInput!) {
    userPetUpdate(token: $token, userPetInput: $userPetInput) {
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
    {
      refetchQueries: [
        {
          query: GetUserPetsQuery,
          variables: {
            token,
          },
        },
      ],
    },
  );

  const petUpdate = useMutation<UserPetUpdate, UserPetUpdateVariables>(
    UserPetUpdateMutation,
    {
      refetchQueries: [
        {
          query: GetUserPetsQuery,
          variables: {
            token,
          },
        },
      ],
    },
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
              resetState();
            }
          } else if (action === "update") {
            const { data } = await petUpdate({
              variables: {
                token,
                userPetInput: {
                  guid: pet.guid,
                  ...values,
                },
              },
            });

            if (data && data.userPetUpdate && data.userPetUpdate.error) {
              console.log(
                "pet edition, validation error",
                data.userPetUpdate.error.message,
              );
            }
            if (data && data.userPetUpdate && data.userPetUpdate.result) {
              console.log("pet updated", data.userPetUpdate.result);
              resetState();
            }
          }
        }}
        initialValues={{
          name: (pet && pet.name) || "",
          type: (pet && pet.type) || "",
          breed: (pet && pet.breed) || "",
          dob: (pet && pet.dob) || "",
          neutered: pet && pet.neutered ? "Y" : "N",
          gender: (pet && pet.gender) || "",
          pictureUrl: (pet && pet.pictureUrl) || "",
        }}
        render={() => (
          <Form>
            <Field name="name" component={SimpleInput} />
            <Radio choices={["CAT", "DOG"]} label="Type" name="type" />
            <Field name="breed" component={BreedSelector} />
            <Field name="dob" component={SimpleInput} />
            <Radio choices={["Y", "N"]} label="Neutered" name="neutered" />
            <Radio choices={["M", "F"]} label="Gender" name="gender" />
            <Field name="pictureUrl" component={SimpleInput} />
            <button type="submit">Submit</button>
          </Form>
        )}
      />
    </div>
  );
};
