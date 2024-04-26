'use client'

import { ApolloLink, HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
// import { createUploadLink } from "apollo-upload-client";
  
function makeClient() {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL,
    });
  
    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link:
        typeof window === "undefined"
          ? ApolloLink.from([
              new SSRMultipartLink({
                stripDefer: true,
              }),
              httpLink,
            ])
          : httpLink,
      credentials: 'same-origin',
      headers: {
        'x-apollo-operation-name': 'NIA-Kd',
        'Apollo-Require-Preflight': 'true',
        'Accept': '*/*'
      },
    });
}
  
  // you need to create a component to wrap your app in
  export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
      <ApolloNextAppProvider makeClient={makeClient}>
        {children}
      </ApolloNextAppProvider>
    );
  }