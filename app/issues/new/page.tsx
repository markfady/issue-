'use client'
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm ,Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface IssueForm{
  title:string;
  description:string;
}
const NewIssue = () => {
  const router = useRouter();
  const [error,setError]=useState(''); //State handle error of form
  const {register,control,handleSubmit}=useForm<IssueForm>()
  return (
    <div className='max-w-xl '>
      {error&&<Callout.Root color='red' className='mb-5'>
  <Callout.Text>
 {error}  {/*view error state in radix UI */}
  </Callout.Text>
</Callout.Root>}
    <form  className=' space-y-3'
    onSubmit={handleSubmit(async(data)=>{
    try { //Try,catch to handle error of axios
      await axios.post('/api/issues',data);
      router.push('/issues')
    } catch (error) {
      setError('unExpected Error occurred'); //set error in state
    }

    }
   )}>
    <TextField.Root>  {/* Form Must be use client  */}
    <TextField.Input placeholder="Title" {...register('title')}/>
  </TextField.Root>
  {/*Markdown editor replaces TextArea of radixUI */}
  <Controller
  name='description'
  control={control}
  render={({field})=><SimpleMDE placeholder='Description' {...field}/> } 
  /> 
  <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssue