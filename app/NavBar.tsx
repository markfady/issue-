'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const NavBar = () => {




  return (
    <nav className='border-b mb-5 px-5 py-3' >
      <Container>
      <Flex justify='between'>
        <Flex align='center' gap='3'>
        <Link href='/'><AiFillBug/></Link>
    <NavLinks/>
        </Flex>
        <AuthStatus/>
      </Flex>
      </Container>
    </nav>
  )
}
const NavLinks=()=>{
  const currentPath=usePathname(); //When use Hook make use client at the top 
  const links=[ //To avoid re write the Li and Links 
  {label:'Dashboard',href:'/'},
  {label:'Issues',href:'/issues/list'}
]
return (
  <ul className='flex space-x-6'>
  {links.map(link=>
  <li  key={link.href}> 
  <Link  className={classNames({ //Use classNames to don't manipulate tirnary in HTML code
    '!text-zinc-900':link.href===currentPath, //! to override the na-link class make dashboard dark not grey
    'nav-link':true   //Default at all cases do this style
  })} href={link.href}>{link.label}
  </Link> </li>)}
</ul>
)

}
const AuthStatus=()=>{
  const{status,data:session}= useSession() //Make AuthProvider component to use this Hook
    if(status==='loading') return <Skeleton width='3rem'/> //Must give skeleton width of the space to work
    if(status==='unauthenticated')  return  <Link href='/api/auth/signin' className='nav-link'>Login</Link>
  return(
    <Box>
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
  </Box>
  )

}

export default NavBar