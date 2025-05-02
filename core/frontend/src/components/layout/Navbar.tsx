"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"
import { Search, Menu, X, Sun, Moon, User, Tool, Heart, LogOut } from "react-feather"

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsMenuOpen(false)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-500">
            ToolShare
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/category/power-tools" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500">
              Power Tools
            </Link>
            <Link to="/category/hand-tools" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500">
              Hand Tools
            </Link>
            <Link to="/category/garden-tools" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500">
              Garden Tools
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block w-1/3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tools..."
                className="w-full py-2 px-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                🔍
              </button>
            </form>
          </div>

          {/* User Menu / Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <img
                    src={user?.avatar || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-800 dark:text-white">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                </button>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl z-20 invisible group-hover:visible dark:bg-gray-700">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/saved"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                  >
                    Saved Tools
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-500 dark:text-gray-400"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tools..."
                className="w-full py-2 px-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </form>
            
            <nav className="flex flex-col space-y-2 mb-4">
              <Link
                to="/category/power-tools"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Power Tools
              </Link>
              <Link
                to="/category/hand-tools"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Hand Tools
              </Link>
              <Link
                to="/category/garden-tools"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Garden Tools
              </Link>
            </nav>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="flex items-center text-gray-600 dark:text-gray-300"
              >
                {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/saved"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Saved Tools
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex space-x-3">
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
