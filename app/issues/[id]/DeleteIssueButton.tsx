'use client'
import Spinner from '@/app/components/Spinner'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({issueId}:{issueId:number}) => {
  const[error,setError]=useState(false);
  const [isDeleting,setDeleting]=useState(false)
  const navigate=useRouter();

  const deleteIssue = async (id: number) => {
    try {
      setDeleting(true)
      await axios.delete('/api/issues/' + id);
      navigate.push('/issues/list')
      navigate.refresh()
      
    } catch (error) {
      setError(true)
    }
  };

  
  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' disabled={isDeleting}>
          Delete Issue
          {isDeleting&& <Spinner/>}
          </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>
          Confirm Deletion
        </AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this Issue?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button variant="solid" color="red" onClick={() => deleteIssue(issueId)}>
          Delete Issue
        </Button>
      </AlertDialog.Action>
</Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>
            Error
          </AlertDialog.Title>
          <AlertDialog.Description>
          This issue cannot be deleted right now
          </AlertDialog.Description>
          <Button variant="soft" color="gray" onClick={()=>setError(false)}>
       Ok
        </Button>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
  }

export default DeleteIssueButton