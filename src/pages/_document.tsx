import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet='UTF-8' />
          <meta name='keyword' content='market, kurly, tor, hackathon,KU, ku, konkuk' />
          <meta name='description' content='Market Kurly ku-soda Hackathon' />
          <meta name='author' content='ku-soda-tor' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
