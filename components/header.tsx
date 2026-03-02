'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0">
          <Image
            src="/logo.png"
            alt="INFNOVA Logo"
            width={140}
            height={50}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Navigation - Centered */}
        <nav className="flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8 md:gap-12">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Courses
          </Link>
          <Link href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons - Right Side */}
        <div className="flex items-center gap-3 md:gap-4">
          <Button variant="ghost" className="text-primary font-semibold hover:text-primary/80 hover:bg-transparent px-0 text-xs md:text-sm">
            Sign In
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 md:px-8 py-2 rounded-lg md:rounded-xl text-xs md:text-base">
            Enroll Now
          </Button>
        </div>
      </div>
    </header>
  )
}
