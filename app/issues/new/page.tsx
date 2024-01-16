'use client'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
const NewIssue = () => {
  return (
    <div  className='max-w-xl space-y-3'>
    <TextField.Root>  {/* Form Must be use client  */}
    <TextField.Input placeholder="Title" />
  </TextField.Root>
  <SimpleMDE placeholder="Description" /> {/*Markdown editor replaces TextArea of radixUI */}
  <Button>Submit New Issue</Button>
    </div>

  )
}

export default NewIssue