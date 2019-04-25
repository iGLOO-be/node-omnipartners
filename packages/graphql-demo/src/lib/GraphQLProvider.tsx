
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { RetryLink } from "apollo-link-retry";
import fetch from "isomorphic-fetch";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

const createClient = () => {
  const uri = `/graphql`;
  const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.error(graphQLErrors)
    }

    if (networkError) {
      console.error(networkError)
    }
  });

  const link = ApolloLink.from([
    onErrorLink,
    new RetryLink(),
    new HttpLink({
      fetch,
      headers: {},
      uri,
    }),
  ]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
};

export const GraphQLProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = createClient();
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
    </ApolloProvider>
  );
};
