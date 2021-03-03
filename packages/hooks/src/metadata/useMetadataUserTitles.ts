import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  MetadataUserTitles,
  MetadataUserTitlesVariables,
} from "./__generated__/MetadataUserTitles";

export * from "./__generated__/MetadataUserTitles";

const MetadataUserTitlesQuery = gql`
  query MetadataUserTitles($lang: String!) {
    metadataUserTitles(lang: $lang) {
      name
      code
    }
  }
`;

export function useMetadataUserTitles(
  optionsOrLang:
    | string
    | {
        skip?: boolean;
        lang: string;
      },
) {
  const lang =
    typeof optionsOrLang === "object" ? optionsOrLang.lang : optionsOrLang;
  const skip = typeof optionsOrLang === "object" ? optionsOrLang.skip : false;

  const res = useQuery<MetadataUserTitles, MetadataUserTitlesVariables>(
    MetadataUserTitlesQuery,
    {
      variables: {
        lang,
      },
      skip,
    },
  );

  const items =
    (res.data &&
      res.data.metadataUserTitles &&
      res.data.metadataUserTitles.map((d) => ({
        label: d.name,
        value: d.code,
      }))) ||
    [];

  return {
    ...res,
    items,
  };
}
