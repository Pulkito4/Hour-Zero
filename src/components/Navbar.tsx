"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Share2, Copy } from 'lucide-react'
import { Button } from './ui/button'  // Assuming Button is imported like this

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }

  return (
    <nav className='bg-gradient-to-r from-black via-purple-900 to-black text-white px-6 py-4 font-work-sans'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between'>
          {/* Logo and Brand */}
          <Link href="/" className='flex items-center gap-2'>
            <Image src='/logo.png' alt="logo" width={70} height={70} className='hover:opacity-90' />
            <span className="text-xl font-semibold">
              Hour <span className="text-purple-400">Zero</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-6'>
            <Link href="/" className='hover:text-purple-200 transition-colors text-lg'>
              Home
            </Link>
            <Link href="/about" className='hover:text-purple-200 transition-colors text-lg'>
              About Us
            </Link>
            <Link href="/services" className='hover:text-purple-200 transition-colors text-lg'>
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className='md:hidden'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

           {/* Share and Copy Buttons on the same line */}
        <div className='flex items-center gap-4 mt-4'>
          <Button className='border border-white'>
            <Share2 size={20} />
          </Button>
          <Button className='border border-white' onClick={handleCopy}>
            <Copy size={20} />
          </Button>
        </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden pt-4'>
            <div className='flex flex-col gap-4'>
              <Link href="/" className='hover:text-purple-200 transition-colors'>
                Home
              </Link>
              <Link href="/about" className='hover:text-purple-200 transition-colors'>
                About Us
              </Link>
              <Link href="/services" className='hover:text-purple-200 transition-colors'>
                Contact Us
              </Link>
            </div>
          </div>
        )}

       
      </div>
    </nav>
  )
}

export default Navbar
