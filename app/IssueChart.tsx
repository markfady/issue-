'use client'
import { Heading } from '@radix-ui/themes'
import {ResponsiveContainer,XAxis,YAxis,BarChart,Bar} from 'recharts'
interface Props{ //This props to take count of each status to present it in the UI(prisma.issue.count)
    open:number,
    inProgress:number,
    closed:number,
}

const IssueChart = ({open,inProgress,closed}:Props) => {
    const container:{ //use typescript to make sure the values are the same in status schema and Label is string
        label:string,
        value:number
    }[]=[
        {label:"Open Issues",value:open},
        {label:"In Progress Issues",value:inProgress},
        {label:"Closed Issues",value:closed}
    ]
  return (
    <>
    <Heading size='4' mb='5' mt='5'>Chart of Issues</Heading>
    <ResponsiveContainer width='100%' height={300}>
        <BarChart data={container}>
            <XAxis dataKey="label"/>
            <YAxis/>
            <Bar dataKey="value" barSize={60} style={{fill:'var(--accent-9)'}}/>
        </BarChart>
    </ResponsiveContainer>
    </>
  )
}

export default IssueChart