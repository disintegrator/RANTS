import * as React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

type PageEnhancer = (C: React.ComponentType) => React.ComponentType;
interface InitializerOptions {
  renderPage: (e: PageEnhancer) => { [k: string]: any };
}

export default class MyDocument extends Document {
  public static getInitialProps({ renderPage }: InitializerOptions) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => (props: {}) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  public render() {
    return (
      <html>
        <Head>
          <title>My page</title>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
