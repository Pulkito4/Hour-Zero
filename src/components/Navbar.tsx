import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Share2, Star } from 'lucide-react'

const Navbar = () => {
    
  return (
    <nav className='flex items-center justify-between bg-gradient-to-r from-black via-purple-900 to-black text-white px-6 py-4 font-work-sans text-lg'>
    <div className='flex items-center gap-6 px-2 '>
      <Link href="/" className='flex items-center gap-2 hover:text-purple-200 transition-colors mr-3'>
        <Image src='/logo.png' alt="logo" width={70} height={70} className='hover:opacity-90' />
    
      </Link>
      <Link href={"/"} className='hover:text-purple-200 transition-colors'>
        Home
      </Link>
      <Link href="/about" className='hover:text-purple-200 transition-colors '>
        About Us
      </Link>
      <Link href="/services" className='hover:text-purple-200 transition-colors '>
        Contact Us
      </Link>
    </div>

    {/* <div>
      <h1 className='text-center'>HOUR ZERO</h1>
    </div> */}
    
    <div className='flex items-center gap-4'>
      <Button className='border border-white'>
        <Star/>
      </Button>
      <Button className=' border border-white'>
        <Share2/>
      </Button>
    </div>
  </nav>
  )
}

export default Navbar