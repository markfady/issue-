import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'
interface BadgeType{
    status:Status //Use of Status Built in type in prisma
}
const statusMap:Record<Status,{label:string,color:'red' |'violet'|'green'}>={ //This Way Avoid if statement for each status type 
    OPEN:{label:'Open',color:'red'},
    IN_PROGRESS:{label:'In Progress',color:'violet'},
    CLOSED:{label:'Closed',color:'green'}
}
const IssueStatusBadge = ({status}:BadgeType) => {
  return (
   <Badge color={statusMap[status].color}>  
    {statusMap[status].label}
    </Badge>
  )
}

export default IssueStatusBadge