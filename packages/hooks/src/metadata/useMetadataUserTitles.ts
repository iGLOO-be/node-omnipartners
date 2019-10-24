import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  MetadataUserTitles,
  MetadataUserTitlesVariables,
} from "./__generated__/MetadataUserTitles";

const MetadataUserTitlesQuery = gql`
  query MetadataUserTitles($lang: String!) {
    metadataUserTitles(lang: $lang) {
      name
      code
    }
  }
`;

export const useMetadataUserTitles = (lang: string) => {
  const { data, loading } = useQuery<
    MetadataUserTitles,
    MetadataUserTitlesVariables
  >(MetadataUserTitlesQuery, {
    variables: {
      lang,
    },
  });

  const items =
    (data &&
      data.metadataUserTitles &&
      data.metadataUserTitles.map(d => ({
        label: d.name,
        value: d.code,
      }))) ||
    [];

  return {
    items,
    loading,
  };
};
