"use client"

import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail } from "react-feather"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ToolShare</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Connecting tool owners with people who need them in your community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:info@toolshare.com"
                className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Search Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/category/power-tools"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Power Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/category/hand-tools"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Hand Tools
                </Link>
              </li>
              <li>
                <Link
                  to="/category/garden"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Garden Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            &copy; {currentYear} ToolShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
