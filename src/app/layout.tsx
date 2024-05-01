'use client'
import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import { Provider } from 'react-redux';
import { store } from 'store/store';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body id={'root'}>
      <AppWrappers>
        <Provider store={store}>
            {children}
        </Provider>
      </AppWrappers>
      </body>
    </html>
  );
}
