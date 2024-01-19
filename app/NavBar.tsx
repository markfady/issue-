'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'
const NavBar = () => {
  const currentPath=usePathname(); //When use Hook make use client at the top 
 const{status,data:session}= useSession() //Make AuthProvider component to use this Hook
  const links=[ //To avoid re write the Li and Links 
    {label:'Dashboard',href:'/'},
    {label:'Issues',href:'/issues/list'}
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center' >
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
        <Box>
          {status==="authenticated"&&(<Link href='/api/auth/signout'>Logout</Link>)}
          {status==="unauthenticated"&&(<Link href='/api/auth/signin'>Login</Link>)}
        </Box>
    </nav>
  )
}

export default NavBar