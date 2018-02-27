import * as React from "react";
import { graphql, DataValue } from "react-apollo";
import Error from "next/error";

import fetchPost from "../graphql/client/fetchPost.graphql";
import { fetchPostQueryVariables, fetchPostQuery } from "../graphql/client";

import Container from "./Container";
import H1 from "./H1";
import P from "./P";

export interface Props {
  data?: DataValue<fetchPostQuery>;
}

const PostPage = (props: Props) => {
  const { data } = props;

  const post = data && data.post;
  if (!post) {
    return <Error statusCode={404} />;
  }

  return (
    <Container>
      <H1>{post.title}</H1>
      <P>{post.body}</P>
    </Container>
  );
};

export default graphql<fetchPostQueryVariables, fetchPostQuery>(fetchPost, {
  options: ({ id }) => ({ variables: { id } })
})(PostPage);
