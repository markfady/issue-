'use client'
import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const AssigneeSelect = ({issue}:{issue:Issue}) => { //we make api route cause we cannot access prisma in 'use client' 
 const{data:users,error,isLoading} =useQuery<User[]>({ //key to make it unique , Function it's allow us to use any type of fetching but react query doesn't fetch 
    queryKey:['users'],
    queryFn:()=>axios.get('/api/users').then(res=>res.data),
    staleTime:60*1000, //60S React query will not re-fetch list of users after 60 seconds
    retry:3 //only 3 retry to fetch data

  })
    if(isLoading) return <Skeleton/>; //Skeleton for Assign to 
   if(error) return null; //Handle error of fetching data better than useEffect
  return (
    <Select.Root
    defaultValue={issue.assignedToUserId || "unassigned"}
     onValueChange={(userId)=>{
      axios.patch(`/api/issues/`+issue.id,{assignedToUserId: userId === "unassigned" ? null : userId}) //if you selected unassigned make null inDB , if you selected user takes id and sent it to the patch database of the issue
    }}>
  <Select.Trigger placeholder="Assign..." />
  <Select.Content>
    <Select.Group>
      <Select.Label>Suggestions</Select.Label>
      <Select.Item value="unassigned">Unassigned</Select.Item>
      {users?.map(user=> (
      <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
      ))}
    </Select.Group>
  </Select.Content>
</Select.Root>
  )
}

export default AssigneeSelect   