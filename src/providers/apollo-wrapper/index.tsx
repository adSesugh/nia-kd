'use client'

import { useAppSelector } from "@/features/hooks";
import { RootState } from "@/features/store";
import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { store } from "@/features/store";

function getToken() {
  return store.getState().auth.userData.token
}
  
function makeClient() {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL as string,
    });

    const authLink = setContext((_, { headers }) => {
      const token = getToken()
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });
  
    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link:
        typeof window === "undefined"
          ? ApolloLink.from([
              new SSRMultipartLink({
                stripDefer: true,
              }),
              authLink.concat(httpLink),
            ])
          : authLink.concat(httpLink),
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