import * as React from "react";
import { Context } from "next-extensions";
import PostPage from "../components/PostPage";
import PostsPage from "../components/PostsPage";
import { withData } from "../common/apollo";

interface Query {
  id?: string;
}

export interface Props {
  id?: string;
}

export class PostsRoot extends React.Component<Props> {
  public static getInitialProps(ctx: Context<Query>) {
    return { id: ctx.query.id };
  }
  public render() {
    const { id } = this.props;
    return id ? <PostPage id={id} /> : <PostsPage />;
  }
}

export default withData(PostsRoot);
