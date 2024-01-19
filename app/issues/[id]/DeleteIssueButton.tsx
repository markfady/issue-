'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteIssueButton = ({issueId}:{issueId:number}) => {

  const navigate=useRouter();
  
  const deleteIssue = async (id: number) => {
    await axios.delete('/api/issues/' + id);
    navigate.push('/issues')
    navigate.refresh()
  };

  
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' >Delete Issue</Button>
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
  )
  }

export default DeleteIssueButton