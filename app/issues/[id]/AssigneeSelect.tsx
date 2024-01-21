'use client'
import { User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const AssigneeSelect = () => { //we make api route cause we cannot access prisma in 'use client' 
 const{data:users,error,isLoading} =useQuery<User[]>({ //key to make it unique , Function it's allow us to use any type of fetching but react query doesn't fetch 
    queryKey:['users'],
    queryFn:()=>axios.get('/api/users').then(res=>res.data),
    staleTime:60*1000, //60S React query will not re-fetch list of users after 60 seconds
    retry:3 //only 3 retry to fetch data

  })
    if(isLoading) return <Skeleton/>; //Skeleton for Assign to 
   if(error) return null; //Handle error of fetching data better than useEffect
  return (
    <Select.Root >
  <Select.Trigger placeholder="Assign..." />
  <Select.Content>
    <Select.Group>
      <Select.Label>Suggestions</Select.Label>
      {users?.map(user=> (
      <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
      ))}
    </Select.Group>
  </Select.Content>
</Select.Root>
  )
}

export default AssigneeSelect   