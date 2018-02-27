declare module "next-extensions" {
  import { IncomingMessage, ServerResponse } from "http";
  import { ComponentType } from "react";

  interface ClientContext<Q extends {}> {
    query: Q;
    pathname: string;
    asPath: string;
    jsonPageRes: Response;
    err?: Error;
  }

  interface ServerContext<Q extends {}> {
    query: Q;
    pathname: string;
    asPath: string;
    req: IncomingMessage;
    res: ServerResponse;
    err?: Error;
  }

  export type Context<Q = {}> = ClientContext<Q> | ServerContext<Q>;

  export interface Page<Props = {}, Q = {}> {
    getInitialProps?: (ctx: Context<Q>) => Partial<Props>;
  }
}
