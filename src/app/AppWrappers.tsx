'use client';
import React, { ReactNode } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import theme from '../theme/theme';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ToastContainer />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>{' '}
    </CacheProvider>
  );
}
