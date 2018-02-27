import React from "react";
import Link from "next/link";

import Container from "../components/Container";
import H1 from "../components/H1";
import P from "../components/P";

export default () => (
  <Container>
    <H1>Welcome to the RANTS project!</H1>
    <P>
      This page showcases styled-components in action with SSR support. Try
      disabling javascript on this page (and for the rest of the site for that
      matter)!
    </P>
    <P>
      When you're done here head over to the posts page to see how Apollo
      GraphQL and a custom next.js server work together to deliver data to the
      client-side from <strong>jsonplaceholder.typicode.com</strong>.
    </P>
    <P>
      <Link href="/posts" prefetch>
        <a>Go to posts</a>
      </Link>
    </P>
  </Container>
);
