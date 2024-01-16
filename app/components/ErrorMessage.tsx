import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren, ReactNode } from 'react'

//If there are no validation errors will return null

const ErrorMessage = ({children}:PropsWithChildren) => {
    if(!children) return null 
  return (
    <Text color='red' as='p'>{children}</Text>
  )
}

export default ErrorMessage