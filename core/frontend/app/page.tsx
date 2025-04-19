"use client"

import type React from "react"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  Wrench,
  Hammer,
  Drill,
  Scissors,
  PaintBucket,
  CheckCircle,
  Users,
  DollarSign,
  Repeat,
  Menu,
  X,
} from "lucide-react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

const categories = [
  { name: "Power Tools", icon: Drill, count: 245 },
  { name: "Hand Tools", icon: Hammer, count: 189 },
  { name: "Garden Tools", icon: Scissors, count: 124 },
  { name: "Painting", icon: PaintBucket, count: 97 },
]

const featuredTools = [
  {
    id: 1,
    name: "Professional Drill Kit",
    image: "/placeholder.svg?height=200&width=200",
    price: 15,
    rating: 4.9,
    reviews: 124,
    location: "Seattle",
    distance: "2.5 miles away",
    premium: true,
    owner: {
      name: "Michael S.",
      rating: 4.8,
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 2,
    name: "Heavy Duty Circular Saw",
    image: "/placeholder.svg?height=200&width=200",
    price: 18,
    rating: 4.7,
    reviews: 89,
    location: "Portland",
    distance: "3.1 miles away",
    premium: false,
    owner: {
      name: "Jessica T.",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 3,
    name: "Electric Pressure Washer",
    image: "/placeholder.svg?height=200&width=200",
    price: 25,
    rating: 4.8,
    reviews: 156,
    location: "Bellevue",
    distance: "1.8 miles away",
    premium: true,
    owner: {
      name: "David L.",
      rating: 4.7,
      image: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: 4,
    name: "Cordless Lawn Mower",
    image: "/placeholder.svg?height=200&width=200",
    price: 22,
    rating: 4.6,
    reviews: 78,
    location: "Tacoma",
    distance: "4.2 miles away",
    premium: false,
    owner: {
      name: "Sarah K.",
      rating: 4.5,
      image: "/placeholder.svg?height=40&width=40",
    },
  },
]

// Logo component
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

// Mobile Menu component
function MobileMenu({
  onFindTool,
  onFindWhatYouNeed,
  onPopularTools,
  onHowItWorks,
  onWhyChoose,
}: {
  onFindTool: () => void
  onFindWhatYouNeed: () => void
  onPopularTools: () => void
  onHowItWorks: () => void
  onWhyChoose: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (callback: () => void) => {
    setIsOpen(false)
    callback()
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="text-gray-500">
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <Logo />
              <span className="text-xl font-bold text-green-600">ToolNest</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="px-4 py-6 space-y-6">
            <button
              onClick={() => handleClick(onFindTool)}
              className="block text-lg w-full text-left hover:text-green-600"
            >
              Find a Tool
            </button>
            <button
              onClick={() => handleClick(onFindWhatYouNeed)}
              className="block text-lg w-full text-left hover:text-green-600"
            >
              Categories
            </button>
            <button
              onClick={() => handleClick(onPopularTools)}
              className="block text-lg w-full text-left hover:text-green-600"
            >
              Popular Tools
            </button>
            <button
              onClick={() => handleClick(onHowItWorks)}
              className="block text-lg w-full text-left hover:text-green-600"
            >
              How It Works
            </button>
            <button
              onClick={() => handleClick(onWhyChoose)}
              className="block text-lg w-full text-left hover:text-green-600"
            >
              Why Choose Us
            </button>
            <div className="pt-6 border-t">
              <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full mb-4">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-green-600 hover:bg-green-700">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

export default function LandingPage() {
  // Refs for scroll targets
  const findToolRef = useRef<HTMLElement>(null)
  const findWhatYouNeedRef = useRef<HTMLElement>(null)
  const popularToolsRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const whyChooseRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)

  // Smooth scroll function
  const scrollToSection = (elementRef: React.RefObject<HTMLElement>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Logo />
                <span className="text-xl font-bold text-green-600">ToolNest</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection(findToolRef)}
                className="text-gray-600 hover:text-gray-900 hover:underline"
              >
                Find a Tool
              </button>
              <button
                onClick={() => scrollToSection(findWhatYouNeedRef)}
                className="text-gray-600 hover:text-gray-900 hover:underline"
              >
                Categories
              </button>
              <button
                onClick={() => scrollToSection(popularToolsRef)}
                className="text-gray-600 hover:text-gray-900 hover:underline"
              >
                Popular Tools
              </button>
              <button
                onClick={() => scrollToSection(howItWorksRef)}
                className="text-gray-600 hover:text-gray-900 hover:underline"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection(whyChooseRef)}
                className="text-gray-600 hover:text-gray-900 hover:underline"
              >
                Why Choose Us
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/signup" className="hidden sm:block">
                <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
              </Link>
              <MobileMenu
                onFindTool={() => scrollToSection(findToolRef)}
                onFindWhatYouNeed={() => scrollToSection(findWhatYouNeedRef)}
                onPopularTools={() => scrollToSection(popularToolsRef)}
                onHowItWorks={() => scrollToSection(howItWorksRef)}
                onWhyChoose={() => scrollToSection(whyChooseRef)}
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero/Slogan Section */}
        <section className="relative bg-gradient-to-b from-green-50 to-white py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 space-y-6"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
                >
                  Borrow tools, <span className="text-green-600">save money</span>, build anything
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-xl text-gray-600 max-w-2xl"
                >
                  ToolNest connects you with local tool owners. Rent the tools you need for your DIY projects at a
                  fraction of the cost of buying.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => scrollToSection(findToolRef)}
                  >
                    Find Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link href="/auth/signup">
                    <Button size="lg" variant="outline">
                      List Your Tools
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex-1 relative"
              >
                <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=600&text=DIY+Project"
                    alt="People sharing tools"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-200 rounded-full z-0"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full z-0"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Find a Tool Section */}
        <section ref={findToolRef} className="py-16 px-4 sm:px-6 bg-white" id="find-tool">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find a Tool</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Search for the perfect tool for your next project
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="What tool do you need?" className="pl-10" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Your location" className="pl-10" />
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  Search Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  Power Tools
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  Garden Equipment
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  Painting Supplies
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                  Plumbing Tools
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Find What You Need Section */}
        <section ref={findWhatYouNeedRef} className="py-16 px-4 sm:px-6 bg-gray-50" id="find-what-you-need">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find What You Need</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Browse our extensive collection of tools across various categories
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  <Link href={`/browse/${category.name.toLowerCase().replace(/\s+/g, "-")}`} className="block p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <category.icon className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.count} tools</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section ref={popularToolsRef} className="py-16 px-4 sm:px-6 bg-white" id="popular-tools">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Tools Near You</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover high-quality tools available for rent in your area
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTools.map((tool, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                    {tool.premium && (
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">FEATURED</Badge>
                      </div>
                    )}
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={tool.image || "/placeholder.svg"}
                        alt={tool.name}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{tool.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1 font-medium">{tool.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{tool.location}</span>
                        <span className="mx-2">•</span>
                        <span>{tool.distance}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="font-bold text-green-600">${tool.price}/day</div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section ref={howItWorksRef} className="py-16 px-4 sm:px-6 bg-gray-50" id="how-it-works">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Renting tools has never been easier</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gray-200"></div>

              {[
                {
                  icon: Search,
                  title: "Find Tools",
                  description: "Browse thousands of tools available in your neighborhood",
                },
                {
                  icon: Repeat,
                  title: "Book & Pay",
                  description: "Reserve the tools you need for your project dates",
                },
                {
                  icon: Wrench,
                  title: "Get to Work",
                  description: "Pick up your tools and complete your project",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i}
                  className="text-center relative z-10"
                >
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <step.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-200">
                      <span className="text-sm font-bold text-gray-700">{i + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose ToolNest */}
        <section ref={whyChooseRef} className="py-16 px-4 sm:px-6 bg-white" id="why-choose">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ToolNest</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We make tool rental simple, affordable, and reliable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: DollarSign,
                  title: "Save Money",
                  description: "Rent tools at a fraction of the purchase price",
                },
                {
                  icon: CheckCircle,
                  title: "Quality Guaranteed",
                  description: "All tools are verified and rated by users",
                },
                {
                  icon: Users,
                  title: "Community Trust",
                  description: "Connect with verified local tool owners",
                },
                {
                  icon: Wrench,
                  title: "Wide Selection",
                  description: "Find exactly what you need for any project",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section ref={statsRef} className="py-16 px-4 sm:px-6 bg-gray-50" id="statistics">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10,000+", label: "Tools Available" },
                { value: "5,000+", label: "Active Users" },
                { value: "$250,000+", label: "Money Saved" },
                { value: "15,000+", label: "Completed Rentals" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i}
                  className="flex flex-col items-center"
                >
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 py-12">
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
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
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
              <ul className="space-y-2">
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
              <p className="text-gray-400 mb-4">
                Earn extra income by renting out your tools to local DIY enthusiasts.
              </p>
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
    </div>
  )
}
