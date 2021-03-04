import {
  ApolloProvider,
  defaultDataIdFromObject,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloClient,
} from "@apollo/client";
import React, { useEffect, useState } from "react";

const createClient = async () => {
  const uri = process.env.GRAPHQL_ENDPOINT;
  const cache = new InMemoryCache({
    dataIdFromObject: (value: any) => {
      const { __typename } = value;

      let id = defaultDataIdFromObject(value);
      if (__typename === "UserResult") {
        if (value.result && value.result.owner && value.result.owner.guid) {
          id = `${__typename}:${value.result.owner.guid}`;
        } else {
          console.warn("Missing `result.owner.guid` in `UserResult`");
        }
      }
      if (__typename === "User") {
        if (value.owner.guid) {
          id = `${__typename}:${value.owner.guid}`;
        } else {
          console.warn("Missing `owner.guid` in `User`");
        }
      }
      if (__typename === "UserOwner") {
        if (value.guid) {
          id = `${__typename}:${value.guid}`;
        } else {
          console.warn("Missing `guid` in `UserOwner`");
        }
      }
      if (__typename === "UserPet") {
        if (value.guid) {
          id = `${__typename}:${value.guid}`;
        } else {
          console.warn("Missing `guid` in `UserPet`");
        }
      }

      return id;
    },
  });

  return new ApolloClient({
    cache,
    uri,
  });
};

export const GraphQLProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    createClient().then((c) => {
      setClient(c);
    });
  }, []);

  if (!client) {
    return null;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
