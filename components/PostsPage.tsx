import * as React from "react";
import { graphql, DataValue } from "react-apollo";
import Link from "next/link";

import fetchPosts from "../graphql/client/fetchPosts.graphql";
import { fetchPostsQuery } from "../graphql/client";

export interface Props {
  data?: DataValue<fetchPostsQuery>;
}

const PostsPage = (props: Props) => {
  const { data } = props;
  const posts = (data && data.posts) || [];

  return (
    <React.Fragment>
      <h1>All Posts</h1>
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <Link href={`/posts/${p.id}`}>
              <a>{p.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

const withPosts = graphql<{}, fetchPostsQuery>(fetchPosts);

export default withPosts(PostsPage);
