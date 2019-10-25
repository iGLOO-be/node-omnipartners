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
  const res = useQuery<MetadataUserTitles, MetadataUserTitlesVariables>(
    MetadataUserTitlesQuery,
    {
      variables: {
        lang,
      },
    },
  );

  const items =
    (res.data &&
      res.data.metadataUserTitles &&
      res.data.metadataUserTitles.map(d => ({
        label: d.name,
        value: d.code,
      }))) ||
    [];

  return {
    ...res,
    items,
  };
};
