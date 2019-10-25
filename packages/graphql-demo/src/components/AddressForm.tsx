import {
  useUserAddressCreate,
  useUserAddressUpdate,
} from "@igloo-be-omnipartners/hooks";
import { Field, Form, Formik } from "formik";
import React from "react";
import { SimpleInput } from "../layout/SimpleInput";
import { CountrySelector } from "./CountrySelector";

export const AddressForm = ({
  action,
  address,
  resetState,
}: {
  action: string;
  address: any;
  resetState: () => void;
}) => {
  const { userAddressCreate } = useUserAddressCreate();
  const { userAddressUpdate } = useUserAddressUpdate();

  return (
    <div>
      <h1>{action.toUpperCase()}</h1>
      <Formik
        onSubmit={async values => {
          if (action === "create") {
            const { result, error } = await userAddressCreate(values);

            if (error) {
              console.log("address creation, validation error", error.message);
            }
            if (result) {
              console.log("address created", result);
              resetState();
            }
          } else if (action === "update") {
            const { result, error } = await userAddressUpdate({
              id: `${address.id}`,
              ...values,
            });

            if (error) {
              console.log("address update, validation error", error.message);
            }
            if (result) {
              console.log("address updated", result);
              resetState();
            }
          }
        }}
        initialValues={{
          name: (address && address.name) || "",
          city: (address && address.city) || "",
          country: (address && address.country) || "",
          streetnum: (address && address.streetnum) || "",
          street1: (address && address.street1) || "",
          postalCode: (address && address.postalCode) || "",
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
