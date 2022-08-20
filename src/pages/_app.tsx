import 'src/styles/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';

function Container({ children }: any): React.ReactElement {
  return <div style={{ width: '1200px', height: '100%', margin: '0 auto' }}>{children}</div>;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
