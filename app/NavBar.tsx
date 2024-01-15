import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex space-x-6' >
        <Link href='/'>Logo</Link>
        <ul className='flex'>
            <li><Link href="/">DashBoard</Link></li>
            <li><Link href="/">Issues</Link></li>
        </ul>
    </nav>
  )
}

export default NavBar