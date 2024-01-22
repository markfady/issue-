'use client';
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const statuses:{label:string,value?:Status}[]=[
    {label:'All'},
    {label:'Open',value:'OPEN'},
    {label:'In Progress',value:'IN_PROGRESS'},
    {label:'Closed',value:'CLOSED'}
]

const IssueStatusFilter = () => {
    const router=useRouter()
    const searchParams=useSearchParams();

  return (
    <Select.Root
    defaultValue={searchParams.get('status') || ''}
    onValueChange={(status)=>{
      const params = new URLSearchParams();

      // Set the 'status' parameter
      if (status) params.set('status', status);
  
      // Retrieve the current values of 'orderBy' from the existing URLSearchParams
      const orderBy = searchParams.get('orderBy');
  
      // Set the 'orderBy' parameter if it exists
      if (orderBy) params.set('orderBy', orderBy);
  
      const order=searchParams.get('order')
      if (order) params.set('order', order);

      // Build the query string
      const query = params.toString();
  
      // Update the URL using the router.push method
      router.push(`/issues/list?${query}`);
    }}>
    <Select.Trigger placeholder='Filter by status...' />
    <Select.Content >
  {statuses.map((status) => (
    <Select.Item
      key={status.value}  
      value={status.value ?? 'All'}
    >
      {status.label}
    </Select.Item>
  ))}
</Select.Content>
  </Select.Root>
  )
}

export default IssueStatusFilter