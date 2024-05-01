'use client'

import React from 'react';
import DefaultAuthLayout from 'layouts/auth/Default';
import SignInPage from 'views/auth/SignInPage';

export default function SignIn() {
  return (
    <DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'}>
      <SignInPage />
    </DefaultAuthLayout>
  );
}
