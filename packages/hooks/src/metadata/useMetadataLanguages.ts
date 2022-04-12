import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  MetadataLanguages,
  MetadataLanguagesVariables,
} from "./__generated__/MetadataLanguages";

export * from "./__generated__/MetadataLanguages";

const MetadataLanguagesQuery = gql`
  query MetadataLanguages($lang: String!) {
    metadataLanguages(lang: $lang) {
      name
      code
    }
  }
`;

export function useMetadataLanguages(
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

  const res = useQuery<MetadataLanguages, MetadataLanguagesVariables>(
    MetadataLanguagesQuery,
    {
      variables: {
        lang,
      },
      skip,
    },
  );

  const items =
    (res.data &&
      res.data.metadataLanguages &&
      res.data.metadataLanguages.map((d) => ({
        label: d.name,
        value: d.code,
      }))) ||
    [];

  return {
    ...res,
    items,
  };
}
