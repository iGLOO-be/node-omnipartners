import { useQuery } from "@apollo/react-hooks";
import { Field } from "formik";
import gql from "graphql-tag";
import React from "react";
import { RadioButton } from "../layout/RadioButton";
import { GetTitle } from "./__generated__/GetTitle";

const GetTitleQuery = gql`
  query GetTitle {
    metadataUserTitles {
      code
      name
    }
  }
`;

export const TitleRadio = () => {
  const { data, loading } = useQuery<GetTitle>(GetTitleQuery);

  if (loading) {
    return <span>"Loading ..."</span>;
  }

  if (data && data.metadataUserTitles) {
    return (
      <div style={{ marginBottom: 15 }}>
        Civility
        {data.metadataUserTitles.map(title => (
          <Field
            key={title.code}
            component={RadioButton}
            name="title"
            id={title.code}
            label={title.name}
          />
        ))}
      </div>
    );
  }
  return null;
};
