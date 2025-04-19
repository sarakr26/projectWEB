"use client"

import type React from "react"

import { useRef } from "react"
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
  Calendar,
  Quote,
  ArrowUp,
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
    <>
      {/* Hero/Slogan Section */}
      <section className="relative bg-gradient-to-b from-green-50 via-green-50/30 to-white py-28 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 w-96 h-96 rounded-full bg-yellow-200/30 blur-3xl"></div>
          <div className="absolute -left-20 top-1/3 w-72 h-72 rounded-full bg-green-200/40 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 space-y-8"
            >
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block px-4 py-1 bg-green-100 rounded-full text-green-700 font-medium text-sm mb-2"
                >
                  Community-powered tool sharing
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Borrow tools,{" "}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-green-600 relative inline-block"
                  >
                    save money
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-green-600/30 rounded-full"></span>
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    , build anything
                  </motion.span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-xl text-gray-600 max-w-2xl leading-relaxed"
              >
                ToolNest connects you with local tool owners. Rent the tools you need for your DIY projects at a
                fraction of the cost of buying and reduce waste through sharing.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-base px-8"
                  onClick={() => scrollToSection(findToolRef)}
                >
                  Find Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/auth/signup">
                  <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 transition-all text-base">
                    List Your Tools
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="flex items-center gap-4 pt-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden flex items-center justify-center text-xs text-gray-600 font-medium">
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">5,000+</span> users are already sharing tools
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="flex-1 relative"
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-green-600/10 to-transparent w-24 h-24 rounded-bl-3xl"></div>
                <img
                  src="/images/main.png"
                  alt="Person using a power drill for a DIY project"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-200 rounded-full opacity-50 blur-md z-0"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full opacity-50 blur-md z-0"></div>
              
              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute -bottom-5 -left-8 bg-white shadow-lg rounded-lg px-4 py-2 flex items-center gap-2 z-20"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">Verified Tools</div>
                  <div className="text-xs text-gray-500">Quality guaranteed</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-5 right-12 bg-white shadow-lg rounded-lg px-4 py-2 flex items-center gap-2 z-20"
              >
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="font-medium">Save Money</div>
                  <div className="text-xs text-gray-500">Average 70% savings</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Find a Tool Section - Improved */}
      <section 
        ref={findToolRef} 
        className="py-20 px-4 sm:px-6 bg-white relative" 
        id="find-tool"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/20 to-white pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4"
            >
              Search & Discover
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Find the Perfect Tool
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Search for exactly what you need for your next project
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="What tool do you need?" className="pl-12 py-6 text-base rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-sm" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Your location" className="pl-12 py-6 text-base rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-sm" />
              </div>
              <Button className="bg-green-600 hover:bg-green-700 transition-all py-6 rounded-xl text-base font-medium shadow-lg shadow-green-600/20">
                Search Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all text-gray-700">
                Power Tools
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all text-gray-700">
                Hand Tools
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all text-gray-700">
                Garden Equipment
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all text-gray-700">
                Power Washers
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all text-gray-700">
                Ladders
              </Badge>
            </div>
          </motion.div>
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

      {/* How it Works Section - Redesigned */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -left-40 top-40 w-80 h-80 bg-green-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -right-40 bottom-40 w-80 h-80 bg-yellow-100 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4"
            >
              Simple Process
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              How ToolNest Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Borrowing tools has never been easier
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Search className="w-10 h-10 text-blue-600" />,
                title: "Find a Tool",
                description:
                  "Search our extensive database of tools available in your area. Filter by category, price, and availability.",
                delay: 0.3,
                accent: "blue"
              },
              {
                icon: <Calendar className="w-10 h-10 text-green-600" />,
                title: "Book & Pay",
                description:
                  "Reserve your tools for the dates you need. Secure payment through our platform protects both parties.",
                delay: 0.5,
                accent: "green"
              },
              {
                icon: <Hammer className="w-10 h-10 text-yellow-600" />,
                title: "Collect & Use",
                description:
                  "Pick up the tool from the owner and get to work on your project. Return it when you're done.",
                delay: 0.7,
                accent: "yellow"
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: step.delay }}
                className="relative"
              >
                <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100 h-full relative z-10 hover:shadow-2xl transition-all duration-300 group`}>
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-${step.accent}-100 flex items-center justify-center mb-8 group-hover:bg-${step.accent}-200 transition-colors duration-200`}>
                      {step.icon}
                    </div>
                    <span className="absolute top-6 right-8 text-5xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors duration-300">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/4 -right-6 w-12 h-12 text-gray-300 z-10">
                      <ArrowRight className="w-12 h-12" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools Section - Redesigned */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 bg-yellow-100 rounded-full text-yellow-700 text-sm font-medium mb-4"
            >
              Top Rated
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Popular Tools Near You
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Browse the most requested tools in your area
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                name: "Power Drill",
                price: "8.50",
                rating: 4.9,
                image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Power+Drill",
                location: "0.8 miles away",
                delay: 0.3
              },
              {
                name: "Circular Saw",
                price: "12.00",
                rating: 4.7,
                image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Circular+Saw",
                location: "1.2 miles away",
                delay: 0.4
              },
              {
                name: "Pressure Washer",
                price: "25.00",
                rating: 4.8,
                image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Pressure+Washer",
                location: "1.5 miles away",
                delay: 0.5
              },
              {
                name: "Tile Cutter",
                price: "15.00",
                rating: 4.6,
                image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Tile+Cutter",
                location: "2.0 miles away",
                delay: 0.6
              },
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: tool.delay }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-sm font-medium text-gray-900 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {tool.rating}
                  </div>
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                    <div className="text-green-700 font-bold">${tool.price}/day</div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {tool.location}
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 transition-all shadow-md shadow-green-600/10 group-hover:shadow-lg group-hover:shadow-green-600/20">
                    Book Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 transition-all px-8 py-6 text-base">
              View All Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
              {
                icon: Calendar,
                title: "Convenient Delivery",
                description: "Optional tool delivery service available for larger items in select areas",
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

      {/* Footer (Kept same/unchanged) */}
      // ... existing code ...
    </>
  )
}
