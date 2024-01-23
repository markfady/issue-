import { Status } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props{ //This props to take count of each status to present it in the UI(prisma.issue.count)
    open:number,
    inProgress:number,
    closed:number,
}

const IssueSummary = ({open,inProgress,closed}:Props) => {
    const container:{ //use typescript to make sure the values are the same in status schema and Label is string
        label:string,
        value:number,
        status:Status
    }[]=[
        {label:"Open Issues",value:open,status:'OPEN'},
        {label:"In Progress Issues",value:inProgress,status:'IN_PROGRESS'},
        {label:"Closed Issues",value:closed,status:'CLOSED'}
    ]
  return (
    <>

    <Heading mb='3' size='4'>Issue Summary</Heading>
    <Flex gap='3'>

    {container.map(item=>(
        <Card key={item.label}>
            <Flex direction='column'>
                <Link href={`/issues/list?status=${item.status}`}>{item.label}</Link>
                <Text size='5' className='font-bold'>{item.value}</Text>
            </Flex>
        </Card>
    ))}

    </Flex>
    </>
  )
}

export default IssueSummary