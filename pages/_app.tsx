import type { AppProps } from 'next/app';
import { FC } from 'react';

import '../styles/reset.css';
import '../styles/main.css';

const MyApp: FC<AppProps> = (appProps: AppProps) => {
  return <appProps.Component {...appProps.pageProps} />;
};

export default MyApp;
