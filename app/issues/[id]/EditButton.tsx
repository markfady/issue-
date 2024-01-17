import React from 'react'
import { Button } from '@radix-ui/themes'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
const EditButton = ({id}:{id:number}) => {
  return (
    <Button>
    <Pencil2Icon/>
    <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
  </Button>
  )
}

export default EditButton