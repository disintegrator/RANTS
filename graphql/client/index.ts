/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface fetchPostQueryVariables {
  id: string,
};

export interface fetchPostQuery {
  post:  {
    id: string,
    title: string,
    body: string,
  } | null,
};

export interface fetchPostsQuery {
  posts:  Array< {
    id: string,
    title: string,
  } > | null,
};
