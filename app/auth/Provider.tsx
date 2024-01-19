'use client'
import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'
 
const AuthProvider = ({children}:PropsWithChildren) => { //to use useSession() must be wrapped inside this component  ,sessionProvider is component use react context to pass authentication session to component tree
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthProvider