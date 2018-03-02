import * as React from "react";
import { Context } from "next-extensions";
import Error from "next/error";

import PostPage from "../components/PostPage";
import { withData } from "../common/apollo";

interface Query {
  id?: string;
}

export interface Props {
  id?: string;
}

export class PostRoot extends React.Component<Props> {
  public static getInitialProps(ctx: Context<Query>) {
    return { id: ctx.query.id };
  }
  public render() {
    const { id } = this.props;
    return id ? <PostPage id={id} /> : <Error statusCode={404} />;
  }
}

export default withData(PostRoot);
