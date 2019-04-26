import { Field, Form, Formik } from "formik";
import React from "react";
import { SimpleInput } from "../layout/SimpleInput";

export const UserUpdateForm = () => (
  <div>
    <h1>Update profile</h1>
    <Formik
      onSubmit={values => console.log(values)}
      initialValues={{
        user_city: "",
        user_country: "",
        user_county: "",
        user_dob: "",
        user_email: "",
        user_ext_id: "",
        user_facebook_id: "",
        user_first_name: "",
        user_gender: "",
        user_language: "",
        user_last_name: "",
        user_lat: "",
        user_lng: "",
        user_mobile_phone: "",
        user_national_id: "",
        user_password: "",
        user_postal_code: "",
        user_street1: "",
        user_street2: "",
        user_streetnum: "",
        user_telephone: "",
        user_title: "",
        user_username: "",
        user_website: "",
      }}
      render={() => (
        <Form>
          <Field name="user_first_name" component={SimpleInput} />
        </Form>
      )}
    />
  </div>
);
