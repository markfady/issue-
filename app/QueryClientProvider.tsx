'use client' //react context only in client componenta
import {QueryClient,QueryClientProvider as ReactQueryClientProvider} from '@tanstack/react-query'
import { PropsWithChildren } from 'react';
const queryClient=new QueryClient(); //contain cache for storing data came from backend
const QueryClientProvider = ({children}:PropsWithChildren) => { //used to get data from backend and cache them in the client so we don't need to fetch them every time
  return (
       <ReactQueryClientProvider client={queryClient}>  {/*this uses react context so it can share QueryClient to our component tree */}
        {children}
         </ReactQueryClientProvider>
    )
}

export default QueryClientProvider