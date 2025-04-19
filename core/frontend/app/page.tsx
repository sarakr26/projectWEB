"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
  Wrench,
  Home,
  ChevronRight,
  CheckCircle,
  DollarSign,
  Heart,
  PenToolIcon as Tool,
  Hammer,
  Drill,
  Scissors,
  PaintBucket,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  { name: "Plumbing", icon: Tool, count: 76 },
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

const testimonials = [
  {
    id: 1,
    content:
      "ToolNest saved me hundreds of dollars on my kitchen renovation. I rented a tile cutter for a weekend instead of buying one I'd only use once.",
    author: "Jennifer R.",
    role: "DIY Enthusiast",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: 2,
    content:
      "As a homeowner who loves DIY projects, ToolNest has been a game-changer. The quality of tools available is impressive, and the process is seamless.",
    author: "Marcus T.",
    role: "Homeowner",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
  {
    id: 3,
    content:
      "I've made over $2,000 renting out my professional tools on ToolNest. It's a great way to offset the cost of expensive equipment.",
    author: "Carlos M.",
    role: "Professional Contractor",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
  },
]

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [searchLocation, setSearchLocation] = useState("")
  const [searchTool, setSearchTool] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-100 rounded-full opacity-30 blur-3xl"></div>
        </div>

        <div className="container px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge className="px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200 rounded-full">
                  Rent tools, save money, help the planet
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
              >
                The smart way to{" "}
                <span className="text-green-600 relative">
                  borrow tools
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 9C71.5 3.5 138.5 3 297 9" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>{" "}
                in your neighborhood
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
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg">
                  Find Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  List Your Tools
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center gap-4 pt-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=32&width=32&text=${i}`}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">2,500+</span> people joined this month
                </div>
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
                  src="/placeholder.svg?height=500&width=600&text=DIY+Project"
                  alt="People sharing tools"
                  className="w-full h-auto object-cover"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Tool className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Save up to 80% on tool costs</div>
                      <div className="text-sm text-gray-600">Compared to buying new tools for one-time projects</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-200 rounded-full z-0"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transform -translate-y-16">
            <h2 className="text-2xl font-semibold text-center mb-6">Find the perfect tool for your project</h2>
            <Tabs defaultValue="rent" className="w-full mb-6">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                <TabsTrigger value="rent">Rent a Tool</TabsTrigger>
                <TabsTrigger value="list">List Your Tool</TabsTrigger>
              </TabsList>
              <TabsContent value="rent" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="What tool do you need?"
                      className="pl-10"
                      value={searchTool}
                      onChange={(e) => setSearchTool(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Your location"
                      className="pl-10"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Search Tools
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 justify-center pt-2">
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
              </TabsContent>
              <TabsContent value="list" className="space-y-4">
                <div className="text-center max-w-md mx-auto">
                  <p className="mb-4">Start earning money by listing your tools on ToolNest</p>
                  <Button className="bg-green-600 hover:bg-green-700 w-full">List Your First Tool</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Tools Available", icon: Tool },
              { value: "5,000+", label: "Active Users", icon: User },
              { value: "$250,000+", label: "Money Saved", icon: DollarSign },
              { value: "15,000+", label: "Completed Rentals", icon: CheckCircle },
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
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200">Browse by Category</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find exactly what you need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our extensive collection of tools across various categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200">Featured Tools</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular tools near you</h2>
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
                    <button className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{tool.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1 font-medium">{tool.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({tool.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{tool.location}</span>
                      <span className="mx-2">•</span>
                      <span>{tool.distance}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                        <img
                          src={tool.owner.image || "/placeholder.svg"}
                          alt={tool.owner.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {tool.owner.name} • {tool.owner.rating}★
                      </span>
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

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200">Testimonials</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What our users say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who are saving money and completing projects with ToolNest
            </p>
          </div>

          <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-100 rounded-full -ml-16 -mb-16 opacity-50"></div>

            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="flex space-x-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={`w-3 h-3 rounded-full ${i === currentTestimonial ? "bg-green-600" : "bg-gray-300"}`}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="relative h-[250px]">
                {testimonials.map((testimonial, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: i === currentTestimonial ? 1 : 0,
                      x: i === currentTestimonial ? 0 : 20,
                      zIndex: i === currentTestimonial ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                    style={{ display: i === currentTestimonial ? "block" : "none" }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-xl italic mb-8 max-w-3xl">"{testimonial.content}"</p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{testimonial.author}</div>
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200">How It Works</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Renting tools has never been easier</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our simple process makes it easy to find and rent the tools you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gray-200"></div>

            {[
              {
                icon: Search,
                title: "Find Tools",
                description: "Browse thousands of tools available in your neighborhood",
                color: "green",
              },
              {
                icon: Calendar,
                title: "Book & Pay",
                description: "Reserve the tools you need for your project dates",
                color: "blue",
              },
              {
                icon: Wrench,
                title: "Get to Work",
                description: "Pick up your tools and complete your project",
                color: "yellow",
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

          <div className="mt-16 text-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200">Why Choose ToolNest</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits for everyone</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're renting or listing tools, ToolNest offers amazing benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Home className="h-6 w-6 mr-2 text-green-600" />
                For Tool Owners
              </h3>
              <ul className="space-y-4">
                {[
                  "Earn money from tools you already own",
                  "Set your own availability and pricing",
                  "Our insurance protects your tools",
                  "Premium listings to boost visibility",
                  "Manage bookings through our easy-to-use platform",
                ].map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p>{benefit}</p>
                  </motion.li>
                ))}
              </ul>
              <Button className="mt-8 bg-green-600 hover:bg-green-700">Become a Partner</Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Wrench className="h-6 w-6 mr-2 text-green-600" />
                For DIY Enthusiasts
              </h3>
              <ul className="space-y-4">
                {[
                  "Save money by renting instead of buying",
                  "Access high-quality tools for any project",
                  "Delivery options available",
                  "Verified partners and tool ratings",
                  "24/7 customer support for any issues",
                ].map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p>{benefit}</p>
                  </motion.li>
                ))}
              </ul>
              <Button className="mt-8 bg-green-600 hover:bg-green-700">Find Tools</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Ready to start your next project?</h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of DIY enthusiasts who are saving money and completing projects with ToolNest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-green-700">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200">Download Our App</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Take ToolNest with you everywhere</h2>
              <p className="text-xl text-gray-600 mb-6">
                Get the ToolNest mobile app to easily browse, book, and manage tool rentals on the go.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Browse tools even when you're offline",
                  "Get notifications for bookings and messages",
                  "Scan tools for quick check-in and check-out",
                  "Manage your listings and bookings on the go",
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p>{feature}</p>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.5227 19.3851C16.9324 20.0066 16.2764 19.9747 15.6456 19.7213C14.9831 19.4679 14.3523 19.4361 13.6581 19.7213C12.8063 20.0385 12.3099 19.9747 11.7832 19.3851C8.82323 16.2171 9.32903 11.2336 12.7746 11.0758C13.6581 11.1077 14.2889 11.5506 14.8156 11.5825C15.6139 11.4884 16.3715 11.0455 17.1915 11.0758C18.2001 11.1396 18.9577 11.5188 19.4635 12.2349C17.0832 13.6507 17.5573 16.6919 19.7169 17.4399C19.3364 18.1241 18.8624 18.8083 18.3248 19.4042C17.7664 19.9938 17.2289 20.3109 16.5347 20.3109C15.8722 20.2789 15.3347 19.9619 14.8156 19.7213C14.2889 19.4679 13.8242 19.4361 13.6581 19.7213L13.6581 19.7213Z" />
                    <path d="M14.6495 9.5C14.6495 7.8 15.9167 6.4 17.4823 6.2C17.4823 8.2 15.9167 9.7 14.6495 9.5Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.7347 24H3.26527C1.45455 24 0 22.5455 0 20.7347V3.26527C0 1.45455 1.45455 0 3.26527 0H20.7347C22.5455 0 24 1.45455 24 3.26527V20.7347C24 22.5455 22.5455 24 20.7347 24ZM20.7347 22.5C21.7151 22.5 22.5 21.7151 22.5 20.7347V3.26527C22.5 2.28494 21.7151 1.5 20.7347 1.5H3.26527C2.28494 1.5 1.5 2.28494 1.5 3.26527V20.7347C1.5 21.7151 2.28494 22.5 3.26527 22.5H20.7347Z"
                    />
                  </svg>
                  App Store
                </Button>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.2548 10.0209L4.9174 17.4797C4.91911 17.4814 4.92075 17.4831 4.92239 17.4848C5.24855 18.1161 5.9179 18.5 6.66667 18.5H17.3333C18.0821 18.5 18.7514 18.1161 19.0776 17.4848C19.0792 17.4831 19.0809 17.4814 19.0826 17.4797L11.7452 10.0209C11.9148 9.85095 12 9.6372 12 9.41667C12 9.19614 11.9148 8.98239 11.7452 8.81244L19.0826 1.35407C19.0809 1.35238 19.0792 1.35069 19.0776 1.34901C18.7514 0.717711 18.0821 0.333336 17.3333 0.333336H6.66667C5.9179 0.333336 5.24855 0.717711 4.92239 1.34901C4.92075 1.35069 4.91911 1.35238 4.9174 1.35407L12.2548 8.81244C12.0852 8.98239 12 9.19614 12 9.41667C12 9.6372 12.0852 9.85095 12.2548 10.0209Z" />
                  </svg>
                  Google Play
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden p-2">
                <img
                  src="/placeholder.svg?height=600&width=300&text=Mobile+App"
                  alt="ToolNest Mobile App"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-200 rounded-full z-0"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200">FAQ</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about ToolNest</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How does ToolNest work?",
                answer:
                  "ToolNest connects people who need tools with those who have tools to rent. Browse available tools in your area, book the ones you need for your project, and return them when you're done. If you own tools, you can list them for rent and earn money when others use them.",
              },
              {
                question: "Is my tool protected if I rent it out?",
                answer:
                  "Yes! All rentals on ToolNest are covered by our protection plan. If a tool is damaged during a rental period, we'll cover the repair or replacement costs, subject to our terms and conditions.",
              },
              {
                question: "How much can I earn by renting out my tools?",
                answer:
                  "Earnings vary based on the type of tool, its condition, and demand in your area. Many of our partners earn between $50-$500 per month renting out their tools. Professional-grade tools and equipment typically earn more.",
              },
              {
                question: "How do I know the tools are good quality?",
                answer:
                  "All tools on ToolNest have ratings and reviews from previous renters. We also verify all tool listings and encourage owners to provide detailed descriptions and photos. If a tool doesn't meet your expectations, our customer service team is ready to help.",
              },
              {
                question: "What if I need to cancel my booking?",
                answer:
                  "You can cancel a booking up to 24 hours before the rental period for a full refund. Cancellations within 24 hours may be subject to a cancellation fee. Tool owners have their own cancellation policies which are displayed on their listings.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/faq" className="text-green-600 hover:underline font-medium">
              View all FAQs
              <ArrowRight className="inline-block ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-green-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay updated with ToolNest</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Subscribe to our newsletter for DIY tips, new tool alerts, and exclusive offers
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-3 text-center">
                By subscribing, you agree to our{" "}
                <Link href="#" className="underline">
                  Privacy Policy
                </Link>
                . We'll never share your email address.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function User({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
