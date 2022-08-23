import 'src/styles/globals.scss';
import type { AppProps } from 'next/app';
import React, { useReducer } from 'react';
import { RecoilRoot } from 'recoil';

import PresetReducer from 'src/hooks/reducer/cartReducer';
import { PresetDispatchContext, PresetStateContext } from 'src/hooks/context/cartContext';

function Container({ children }: any): React.ReactElement {
  return <div style={{ width: '1200px', height: '100%', margin: '0 auto' }}>{children}</div>;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(PresetReducer, []);

  return (
    <RecoilRoot>
      <PresetDispatchContext.Provider value={dispatch}>
        <PresetStateContext.Provider value={state}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </PresetStateContext.Provider>
      </PresetDispatchContext.Provider>
    </RecoilRoot>
  );
}

export default MyApp;
