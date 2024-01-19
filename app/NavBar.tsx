'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const NavBar = () => {
  const currentPath=usePathname(); //When use Hook make use client at the top 
 const{status,data:session}= useSession() //Make AuthProvider component to use this Hook
 console.log(session?.user?.email)
  const links=[ //To avoid re write the Li and Links 
    {label:'Dashboard',href:'/'},
    {label:'Issues',href:'/issues/list'}
  ]
  return (
    <nav className='border-b mb-5 px-5 py-3' >
      <Container>
      <Flex justify='between'>
        <Flex align='center' gap='3'>
        <Link href='/'><AiFillBug/></Link>
        <ul className='flex space-x-6'>
          {links.map(link=>
          <li  key={link.href}> 
          <Link  className={classNames({ //Use classNames to don't manipulate tirnary in HTML code
            'text-zinc-900':link.href===currentPath,
            'text-zinc-500':link.href!==currentPath,
            'hover:text-zinc-800 transition-colors':true //Default at all cases do this style
          })} href={link.href}>{link.label}
          </Link> </li>)}
        </ul>
        </Flex>
        <Box>
    
          {status==="authenticated"&&
          (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar src={session?.user?.image!} fallback="?" size='2' radius='full' className='cursor-pointer'/>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">
                  {session?.user?.email}
                  </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Label>
              <Link href='/api/auth/signout'>Logout</Link>
                </DropdownMenu.Label>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status==="unauthenticated"&&(<Link href='/api/auth/signin'>Login</Link>)}
        </Box>
      </Flex>
      </Container>
    </nav>
  )
}

export default NavBar