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
  const scrollToSection = (elementRef: React.RefObject<HTMLElement | null>) => {
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
                </Button>
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
                Browse popular categories to find the right tools for your project
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
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <category.icon className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                      <Badge variant="outline" className="bg-gray-100">
                        {category.count} tools
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section ref={popularToolsRef} className="py-16 px-4 sm:px-6 bg-white" id="popular-tools">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Tools</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the most rented tools in your area
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTools.map((tool, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <img src={tool.image} alt={tool.name} className="w-full h-48 object-cover" />
                      {tool.premium && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500">Premium</Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-lg">{tool.name}</h3>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">${tool.price}/day</div>
                        </div>
                      </div>

                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">
                          {tool.rating} ({tool.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex items-start mb-4">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
                        <div>
                          <div className="text-sm">{tool.location}</div>
                          <div className="text-xs text-gray-500">{tool.distance}</div>
                        </div>
                      </div>

                      <div className="border-t pt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={tool.owner.image}
                            alt={tool.owner.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <div className="text-sm font-medium">{tool.owner.name}</div>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs">{tool.owner.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Rent
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/browse">
                <Button variant="outline" size="lg">
                  View All Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className="py-16 px-4 sm:px-6 bg-gray-50" id="how-it-works">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Renting tools has never been easier with our simple process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: "Search for Tools",
                  description: "Browse our extensive collection or search for specific tools in your area.",
                },
                {
                  step: 2,
                  title: "Book & Pay",
                  description: "Reserve your tools for the dates you need and make a secure payment.",
                },
                {
                  step: 3,
                  title: "Pick Up & Return",
                  description: "Collect the tools from the owner and return them when you're finished.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.step}
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+3rem)] right-[calc(50%-3rem)] h-0.5 bg-green-200"></div>
                  )}
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section ref={whyChooseRef} className="py-16 px-4 sm:px-6 bg-white" id="why-choose-us">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ToolNest</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Benefits that make us the preferred choice for tool rentals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: DollarSign,
                  title: "Save Money",
                  description: "Rent tools at a fraction of the purchase price",
                },
                {
                  icon: Repeat,
                  title: "Sustainability",
                  description: "Reduce waste by sharing resources in your community",
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
    </div>
  )
}
