"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"
import { 
  Search, Menu, X, Sun, Moon, User, Tool, 
  Heart, LogOut, Grid, Settings, Box, ChevronDown, 
  Package, Home, Compass, Bell
} from "react-feather"

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Track scroll position to apply styles when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsScrolled(offset > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navbarClasses = `
    fixed top-0 left-0 w-full z-40 transition-all duration-300
    ${isScrolled 
      ? 'py-2 bg-[rgb(203,243,239)] backdrop-blur-md shadow-md dark:bg-[rgb(203,243,239)]' 
      : 'py-4 bg-[rgb(203,243,239)] dark:bg-[rgb(203,243,239)]'}
  `

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group animate-float">
            <div className="relative mr-2 text-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--toolnest-primary-500)] to-[var(--toolnest-secondary-500)] opacity-75 blur-sm rounded-full"></div>
              <div className="relative">
                <Box className="text-white" size={28} />
              </div>
            </div>
            <span className="text-2xl font-bold gradient-text tracking-tight">
              ToolNest
            </span>
          </Link>

          {/* Search Bar */}
          <div className={`hidden md:block relative transition-all duration-300 ${isSearchFocused ? 'w-1/3' : 'w-1/4'}`}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tools..."
                className="w-full py-2 pl-10 pr-4 rounded-full border border-[var(--toolnest-gray-200)] focus:border-[var(--toolnest-primary-500)] transition-all bg-[var(--toolnest-gray-50)] dark:bg-[var(--toolnest-gray-800)] dark:text-white dark:border-[var(--toolnest-gray-700)] focus:ring-2 focus:ring-[var(--toolnest-primary-500)]/20 focus:outline-none"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--toolnest-gray-400)] dark:text-[var(--toolnest-gray-500)]" 
              />
            </form>
          </div>

          {/* User Menu / Auth Links */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-700)] transition-colors text-[var(--toolnest-gray-600)] dark:text-[var(--toolnest-gray-300)]"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-1 rounded-full group-hover:bg-[var(--toolnest-gray-100)] dark:group-hover:bg-[var(--toolnest-gray-700)] transition-colors">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--toolnest-primary-200)] dark:border-[var(--toolnest-primary-800)] animate-pulse-subtle">
                    <img
                      src={user?.avatar || 'https://via.placeholder.com/40'}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 ring-2 ring-white dark:ring-[var(--toolnest-gray-800)] ring-opacity-0 group-hover:ring-opacity-100 transition-all duration-300 rounded-full"></div>
                  </div>
                  <span className="text-[var(--toolnest-gray-800)] dark:text-white font-medium">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown size={16} className="text-[var(--toolnest-gray-500)] transition-transform group-hover:rotate-180" />
                </button>
                
                <div className="absolute right-0 w-56 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-20 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 dark:bg-[var(--toolnest-gray-800)] border border-[var(--toolnest-gray-200)] dark:border-[var(--toolnest-gray-700)]">
                  <div className="p-3 border-b border-[var(--toolnest-gray-200)] dark:border-[var(--toolnest-gray-700)] animate-scale-in">
                    <p className="text-sm font-medium text-[var(--toolnest-gray-900)] dark:text-white">{user?.name || 'User'}</p>
                    <p className="text-xs text-[var(--toolnest-gray-500)]">{user?.email || 'user@example.com'}</p>
                  </div>
                  
                  <div className="py-1 animate-slide-up delay-1">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-[var(--toolnest-gray-700)] hover:bg-[var(--toolnest-gray-100)] dark:text-[var(--toolnest-gray-300)] dark:hover:bg-[var(--toolnest-gray-700)]"
                    >
                      <User size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/saved"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-[var(--toolnest-gray-700)] hover:bg-[var(--toolnest-gray-100)] dark:text-[var(--toolnest-gray-300)] dark:hover:bg-[var(--toolnest-gray-700)]"
                    >
                      <Heart size={16} />
                      <span>Saved Tools</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-[var(--toolnest-gray-700)] hover:bg-[var(--toolnest-gray-100)] dark:text-[var(--toolnest-gray-300)] dark:hover:bg-[var(--toolnest-gray-700)]"
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                    <Link
                      to="/partner-upgrade"
                      className="flex items-center space-x-2 px-4 py-2 my-2 rounded-md bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white font-bold text-base shadow-lg hover:scale-105 transition-transform duration-200"
                      style={{ justifyContent: 'center' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.09 6.26L21 9.27l-5 4.87L17.18 21 12 17.27 6.82 21 8 14.14l-5-4.87 6.91-1.01L12 3z" />
                      </svg>
                      <span>Upgrade to Partner</span>
                    </Link>
                  </div>
                  
                  <div className="py-1 border-t border-[var(--toolnest-gray-200)] dark:border-[var(--toolnest-gray-700)] animate-slide-up delay-2">
                    <button
                      onClick={logout}
                      className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-md text-[var(--toolnest-primary-700)] hover:bg-[var(--toolnest-primary-50)] transition-colors dark:text-[var(--toolnest-primary-400)] dark:hover:bg-[var(--toolnest-primary-950)]"
                >
                  Sign In
                </Link>
                
                <Link
                  to="/signup"
                  className="tn-button tn-button-primary rounded-md shadow-sm hover:shadow"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-[var(--toolnest-gray-700)] hover:bg-[var(--toolnest-gray-100)] dark:text-[var(--toolnest-gray-300)] dark:hover:bg-[var(--toolnest-gray-700)] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed inset-0 top-[calc(var(--navbar-height,4rem)+1px)] bg-white dark:bg-[var(--toolnest-gray-900)] z-30 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-5 space-y-6 h-full overflow-y-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tools..."
                className="w-full py-3 pl-10 pr-4 rounded-full border border-[var(--toolnest-gray-200)] focus:border-[var(--toolnest-primary-500)] bg-[var(--toolnest-gray-50)] dark:bg-[var(--toolnest-gray-800)] dark:text-white dark:border-[var(--toolnest-gray-700)]"
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--toolnest-gray-400)]" 
              />
            </form>
            
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-800)] animate-slide-in-right"
                style={{ animationDelay: '0.1s' }}
              >
                <Home size={20} className="text-[var(--toolnest-primary-600)] dark:text-[var(--toolnest-primary-400)]" />
                <span className="font-medium text-[var(--toolnest-gray-800)] dark:text-white">Home</span>
              </Link>
              
              <Link
                to="/explore"
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-800)] animate-slide-in-right"
                style={{ animationDelay: '0.15s' }}
              >
                <Compass size={20} className="text-[var(--toolnest-primary-600)] dark:text-[var(--toolnest-primary-400)]" />
                <span className="font-medium text-[var(--toolnest-gray-800)] dark:text-white">Explore</span>
              </Link>
              
              <div className="pt-4 pb-2 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <h3 className="px-3 text-sm font-semibold text-[var(--toolnest-gray-500)] uppercase tracking-wider">
                  Categories
                </h3>
              </div>
              
              {['Power Tools', 'Hand Tools', 'Garden Tools', 'Measurement', 'Workshop', 'Electrical'].map((category, idx) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-800)] text-[var(--toolnest-gray-700)] dark:text-[var(--toolnest-gray-300)] animate-slide-in-right"
                  style={{ animationDelay: `${0.25 + idx * 0.05}s` }}
                >
                  <span>{category}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-[var(--toolnest-gray-200)] dark:border-[var(--toolnest-gray-700)] mt-4 animate-slide-in-right" style={{ animationDelay: '0.55s' }}>
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-800)]"
                >
                  {theme === 'dark' ? <Sun size={20} className="text-[var(--toolnest-accent-500)]" /> : <Moon size={20} className="text-[var(--toolnest-primary-600)]" />}
                  <span className="font-medium text-[var(--toolnest-gray-800)] dark:text-white">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>
              </div>
              
              {isAuthenticated ? (
                <div className="space-y-2 pt-4 border-t border-[var(--toolnest-gray-200)] dark:border-[var(--toolnest-gray-700)] mt-4 animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-center space-x-3 px-3 py-3">
                    <img
                      src={user?.avatar || 'https://via.placeholder.com/40'}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-[var(--toolnest-primary-500)]"
                    />
                    <div>
                      <p className="font-medium text-[var(--toolnest-gray-900)] dark:text-white">{user?.name || 'User'}</p>
                      <p className="text-sm text-[var(--toolnest-gray-500)]">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                  
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-800)]"
                  >
                    <User size={20} className="text-[var(--toolnest-primary-600)] dark:text-[var(--toolnest-primary-400)]" />
                    <span className="text-[var(--toolnest-gray-800)] dark:text-white">Dashboard</span>
                  </Link>
                  
                  <Link
                    to="/saved"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-800)]"
                  >
                    <Heart size={20} className="text-[var(--toolnest-primary-600)] dark:text-[var(--toolnest-primary-400)]" />
                    <span className="text-[var(--toolnest-gray-800)] dark:text-white">Saved Tools</span>
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-800)]"
                  >
                    <Settings size={20} className="text-[var(--toolnest-primary-600)] dark:text-[var(--toolnest-primary-400)]" />
                    <span className="text-[var(--toolnest-gray-800)] dark:text-white">Settings</span>
                  </Link>
                  
                  <Link
                    to="/partner-dashboard"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[var(--toolnest-gray-100)] dark:hover:bg-[var(--toolnest-gray-800)]"
                  >
                    <Tool size={20} className="text-[var(--toolnest-primary-600)] dark:text-[var(--toolnest-primary-400)]" />
                    <span className="text-[var(--toolnest-gray-800)] dark:text-white">Upgrade to Partner</span>
                  </Link>
                  
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-3 py-2 w-full rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 mt-4"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-4 border-t border-[var(--toolnest-gray-200)] dark:border-[var(--toolnest-gray-700)] mt-4 px-3 animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
                  <Link
                    to="/signin"
                    className="block w-full px-4 py-3 text-center font-medium rounded-md border border-[var(--toolnest-primary-600)] text-[var(--toolnest-primary-700)] dark:border-[var(--toolnest-primary-400)] dark:text-[var(--toolnest-primary-400)]"
                  >
                    Sign In
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="block w-full px-4 py-3 text-center font-medium rounded-md bg-[var(--toolnest-primary-600)] text-white shadow hover:bg-[var(--toolnest-primary-700)] dark:bg-[var(--toolnest-primary-500)] dark:hover:bg-[var(--toolnest-primary-600)]"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
