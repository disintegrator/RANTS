declare type Maybe<T> = T | void;

declare namespace NodeJS {
  export interface Process {
    browser: boolean;
  }
}

declare module "*.graphql" {
  import { DocumentNode } from "graphql";
  const content: DocumentNode;
  export default content;
}
