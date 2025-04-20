"use client"

import type React from "react"

import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { Menu, X, ArrowRight } from "lucide-react"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="transform group-hover:rotate-12 transition-transform duration-300">
                <Logo className="text-white" />
              </div>
              <span className="text-xl font-bold text-green-400 group-hover:text-white transition-colors duration-300">ToolNest</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            {[
              { href: "#find-tool", label: "Find a Tool" },
              { href: "#find-what-you-need", label: "Categories" },
              { href: "#popular-tools", label: "Popular Tools" },
              { href: "#how-it-works", label: "How It Works" },
              { href: "#why-choose-us", label: "Why Choose Us" }
            ].map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="relative text-gray-300 hover:text-white transition-all duration-300 group py-2 px-4 rounded-md overflow-hidden cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.href.substring(1));
                  if (element) {
                    const yOffset = -80;
                    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                    
                    window.scrollTo({
                      top: y,
                      behavior: 'smooth'
                    });
                    
                    // Add a highlight animation to the section
                    element.classList.add('section-highlight');
                    setTimeout(() => {
                      element.classList.remove('section-highlight');
                    }, 1500);
                  }
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-600/0 to-green-600/0 group-hover:from-green-600/20 group-hover:to-green-600/5 transition-all duration-300 rounded-md transform scale-95 group-hover:scale-100"></span>
                <span className="absolute inset-0 border border-transparent group-hover:border-green-500/30 rounded-md transition-all duration-300 scale-95 group-hover:scale-100"></span>
                <span className="relative z-10 flex items-center">
                  <span className="block w-0 group-hover:w-3 h-0.5 bg-green-400 mr-0 group-hover:mr-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-green-400/0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button 
                className="bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-white relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                <span className="relative flex items-center">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <Link href="/auth/signup" className="hidden sm:block overflow-hidden">
              <Button 
                className="bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-white relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                <span className="relative flex items-center">
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(href.substring(1));
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
        
        // Add a highlight animation to the section
        element.classList.add('section-highlight');
        setTimeout(() => {
          element.classList.remove('section-highlight');
        }, 1500);
      }
    }, 300); // Small delay to let the mobile menu close first
  };

  return (
    <div className="md:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)} 
        className="text-gray-300 hover:text-white relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-0 h-full bg-green-600/20 group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
        <Menu className="h-6 w-6 relative z-10 transform group-hover:rotate-90 transition-transform duration-300" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <div className="transform group-hover:rotate-12 transition-transform duration-300">
                <Logo className="text-white" />
              </div>
              <span className="text-xl font-bold text-green-400 group-hover:text-white transition-colors duration-300">ToolNest</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              className="text-gray-300 hover:text-white relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-0 h-full bg-red-600/20 group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
              <X className="h-6 w-6 relative z-10 transform group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </div>

          <nav className="px-4 py-6 space-y-4">
            {[
              { href: "#find-tool", label: "Find a Tool" },
              { href: "#find-what-you-need", label: "Categories" },
              { href: "#popular-tools", label: "Popular Tools" },
              { href: "#how-it-works", label: "How It Works" },
              { href: "#why-choose-us", label: "Why Choose Us" }
            ].map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="block text-lg text-gray-300 hover:text-green-400 transition-all duration-300 transform hover:translate-x-2 flex items-center p-4 rounded-lg relative group cursor-pointer overflow-hidden" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent group-hover:from-green-600/20 group-hover:to-green-600/5 transition-all duration-300 rounded-lg"></span>
                <span className="w-0 h-0.5 bg-green-400 mr-0 group-hover:w-6 group-hover:mr-3 transition-all duration-300 relative z-10"></span>
                <span className="relative z-10">{item.label}</span>
                <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="h-4 w-4 text-green-400" />
                </span>
              </a>
            ))}
            <div className="pt-6 border-t border-gray-800">
              <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                <Button 
                  className="w-full mb-4 bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-white relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                  <span className="relative flex items-center justify-center">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-white relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                  <span className="relative flex items-center justify-center">
                    Sign Up
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo className="text-white" />
              <span className="text-xl font-bold text-white">ToolNest</span>
            </div>
            <p className="text-gray-400 mb-4">Connecting DIY enthusiasts with local tool owners since 2023.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 01-1.136.306 4.107 4.107 0 001.925 3.408 8.19 8.19 0 01-5.614 1.868 11.648 11.648 0 006.258 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">List Your Tools</h3>
            <p className="text-gray-400 mb-4">Earn extra income by renting out your tools to local DIY enthusiasts.</p>
            <Link href="/list-tools">
              <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
            </Link>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} ToolNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-8 h-8 ${className}`}>
      <div className="absolute inset-0 rounded-full bg-green-600 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
    </div>
  )
}
