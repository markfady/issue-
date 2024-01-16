'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import classNames from 'classnames'
const NavBar = () => {
  const currentPath=usePathname(); //When use Hook make use client at the top 
  const links=[ //To avoid re write the Li and Links 
    {label:'Dashboard',href:'/'},
    {label:'Issues',href:'/issues'}
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center' >
        <Link href='/'><AiFillBug/></Link>
        <ul className='flex space-x-6'>
          {links.map(link=><Link key={link.href} className={classNames({ //Use classNames to don't manipulate tirnary in HTML code
            'text-zinc-900':link.href===currentPath,
            'text-zinc-500':link.href!==currentPath,
            'hover:text-zinc-800 transition-colors':true //Default at all cases do this style
          })} href={link.href}>{link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default NavBar