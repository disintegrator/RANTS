import * as React from "react";
import { graphql, DataValue } from "react-apollo";
import Link from "next/link";

import fetchPosts from "../graphql/client/fetchPosts.graphql";
import { fetchPostsQuery } from "../graphql/client";

import Container from "./Container";
import H1 from "./H1";

export interface Props {
  data?: DataValue<fetchPostsQuery>;
}

const PostsPage = (props: Props) => {
  const { data } = props;
  const posts = (data && data.posts) || [];

  return (
    <Container>
      <H1>All Posts</H1>
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <Link
              href={{ pathname: "/post", query: { id: p.id } }}
              as={`/posts/${p.id}`}
              prefetch
            >
              <a>{p.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

const withPosts = graphql<{}, fetchPostsQuery>(fetchPosts);

export default withPosts(PostsPage);
