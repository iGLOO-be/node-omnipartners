import { Field, Form, Formik } from "formik";
import React from "react";
import { SimpleInput } from "../layout/SimpleInput";
import { BreedSelector } from "./BreedSelector";
import { Radio } from "./Radio";

export const PetForm = () => {
  return (
    <div>
      <h1>Create/Edit pet</h1>
      <Formik
        onSubmit={async values => {
          console.log(values);
        }}
        initialValues={{
          name: "",
          type: "",
          breed: "",
          dob: "",
          neutered: "",
          gender: "",
          picture: "",
        }}
        render={() => (
          <Form>
            <Field name="name" component={SimpleInput} />
            <Radio choices={["CAT", "DOG"]} label="Type" name="type" />
            <Field name="breed" component={BreedSelector} />
            <Field name="dob" component={SimpleInput} />
            <Radio choices={["yes", "no"]} label="Neutered" name="neutered" />
            <Radio choices={["M", "F"]} label="Gender" name="gender" />
            <Field name="picture" component={SimpleInput} type="file" />
            <button type="submit">Submit</button>
          </Form>
        )}
      />
    </div>
  );
};
