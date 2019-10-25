import { ApolloProvider } from "@apollo/react-hooks";
import {
  defaultDataIdFromObject,
  InMemoryCache,
  NormalizedCacheObject,
} from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { onError } from "apollo-link-error";
import { RetryLink } from "apollo-link-retry";
import fetch from "isomorphic-fetch";
import localforage from "localforage";
import React, { useEffect, useState } from "react";

const createClient = async () => {
  const uri = process.env.GRAPHQL_ENDPOINT;
  const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.error("graphQL Errors", graphQLErrors);
    }

    if (networkError) {
      console.error("network errors", networkError);
    }
  });

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

  // await before instantiating ApolloClient, else queries might run before the cache is persisted
  await persistCache({
    cache,
    storage: localforage as any,
  });

  const link = ApolloLink.from([
    onErrorLink,
    new RetryLink(),
    new BatchHttpLink({
      fetch,
      headers: {},
      uri,
    }),
  ]);

  return new ApolloClient({
    cache,
    link,
  });
};

export const GraphQLProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    createClient().then(c => {
      setClient(c);
    });
  }, []);

  if (!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};
