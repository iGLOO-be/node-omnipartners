import { useUserPetsCreate, useUserPetsUpdate } from "@igloo-be-omnipartners/hooks";
import { Field, Form, Formik } from "formik";
import React from "react";
import yn from "yn";
import { SimpleInput } from "../layout/SimpleInput";
import { BreedSelector } from "./BreedSelector";
import { Radio } from "./Radio";

export const PetForm = ({
  action,
  pet,
  resetState,
}: {
  action: string;
  pet: any;
  resetState: () => void;
}) => {
  const { userPetsCreate } = useUserPetsCreate();
  const { userPetsUpdate } = useUserPetsUpdate();

  return (
    <div>
      <h1>{action.toUpperCase()}</h1>
      <Formik
        onSubmit={async values => {
          if (action === "create") {
            const { result, error } = await userPetsCreate({
              ...values,
              neutered: yn(values.neutered),
            });

            if (error) {
              console.log(
                "pet creation, validation error",
                error.message,
              );
            }
            if (result) {
              console.log("pet created", result);
              resetState();
            }
          } else if (action === "update") {
            const { result, error } = await userPetsUpdate({
              guid: pet.guid,
              ...values,
              neutered: yn(values.neutered),
            });
            if (error) {
              console.log(
                "pet update, validation error",
                error.message,
              );
            }
            if (result) {
              console.log("pet updated", result);
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
            <Field
              name="dob"
              component={SimpleInput}
              placeholder="dd-MM-yyyy"
            />
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
