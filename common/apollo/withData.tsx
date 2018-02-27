import * as React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import Head from "next/head";

import { Page, Context } from "next-extensions";
import initApollo from "./initApollo";

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName<P>(Component: React.ComponentType<P>) {
  return Component.displayName || Component.name || "Unknown";
}

export interface WithDataProps {
  serverState: any;
}

const withData = <P, Q>(
  ComposedComponent: React.ComponentType<P> & Page<P, Q>
) => {
  return class WithData extends React.Component<WithDataProps> {
    public static displayName = `WithData(${getComponentDisplayName(
      ComposedComponent
    )})`;

    public static async getInitialProps(ctx: Context<Q>) {
      // Initial serverState with apollo (empty)
      let serverState = {
        apollo: {
          data: {}
        }
      };

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo();
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <ApolloProvider client={apollo}>
            <ComposedComponent {...composedInitialProps} />
          </ApolloProvider>,
          {
            router: {
              asPath: ctx.asPath,
              pathname: ctx.pathname,
              query: ctx.query
            }
          }
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      serverState = {
        apollo: {
          data: apollo.cache.extract()
        }
      };

      return {
        serverState,
        ...composedInitialProps
      };
    }

    private readonly apollo: ApolloClient<{}>;

    constructor(props: WithDataProps) {
      super(props);
      this.apollo = initApollo(this.props.serverState.apollo.data);
    }

    public render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};

export default withData;
