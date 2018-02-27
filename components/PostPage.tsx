import * as React from "react";
import { graphql, DataValue } from "react-apollo";
import Error from "next/error";

import fetchPost from "../graphql/client/fetchPost.graphql";
import { fetchPostQueryVariables, fetchPostQuery } from "../graphql/client";

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
    <React.Fragment>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
    </React.Fragment>
  );
};

export default graphql<fetchPostQueryVariables, fetchPostQuery>(fetchPost, {
  options: ({ id }) => ({ variables: { id } })
})(PostPage);
