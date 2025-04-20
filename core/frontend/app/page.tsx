"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
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
  CheckCircle,
  Users,
  DollarSign,
  Clock,
  Calendar,
  Quote,
  ArrowUp,
  PaintBucket,
  Axe,
  Zap,
  Ruler,
  HardHat,
  Car,
  Warehouse,
  Leaf
} from "lucide-react"

// Create a fixed set of categories without complex icons
const allCategoryData = [
  { name: "Power Tools", count: 245, iconType: "drill" },
  { name: "Hand Tools", count: 189, iconType: "hammer" },
  { name: "Garden Tools", count: 124, iconType: "leaf" },
  { name: "Painting", count: 97, iconType: "paintBucket" },
  { name: "Woodworking", count: 78, iconType: "axe" },
  { name: "Plumbing", count: 112, iconType: "wrench" },
  { name: "Electrical", count: 93, iconType: "zap" },
  { name: "Measuring", count: 67, iconType: "ruler" },
  { name: "Safety Equipment", count: 42, iconType: "hardHat" },
  { name: "Automotive", count: 55, iconType: "car" },
  { name: "Ladders & Scaffolding", count: 36, iconType: "warehouse" },
  { name: "Lawn & Landscaping", count: 89, iconType: "scissors" }
];

// Tools data organized by category
const toolsByCategory = {
  "Power Tools": [
    {
      name: "Professional Drill Kit",
      price: "8.50",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Pro+Drill+Kit",
      location: "0.8 miles away",
      delay: 0.3
    },
    {
      name: "Impact Driver",
      price: "7.25",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Impact+Driver",
      location: "1.2 miles away",
      delay: 0.4
    },
    {
      name: "Circular Saw",
      price: "12.00",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Circular+Saw",
      location: "1.5 miles away",
      delay: 0.5
    },
    {
      name: "Reciprocating Saw",
      price: "10.50",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Reciprocating+Saw",
      location: "2.0 miles away",
      delay: 0.6
    }
  ],
  "Hand Tools": [
    {
      name: "Socket Wrench Set",
      price: "5.50",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Socket+Set",
      location: "0.5 miles away",
      delay: 0.3
    },
    {
      name: "Premium Hammer",
      price: "3.25",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Premium+Hammer",
      location: "1.0 miles away",
      delay: 0.4
    },
    {
      name: "Screwdriver Set",
      price: "4.00",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Screwdriver+Set",
      location: "1.3 miles away",
      delay: 0.5
    },
    {
      name: "Pliers Kit",
      price: "3.75",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Pliers+Kit",
      location: "1.8 miles away",
      delay: 0.6
    }
  ],
  "Garden Tools": [
    {
      name: "Cordless Lawn Mower",
      price: "22.00",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Lawn+Mower",
      location: "0.7 miles away",
      delay: 0.3
    },
    {
      name: "Hedge Trimmer",
      price: "13.50",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Hedge+Trimmer",
      location: "1.1 miles away",
      delay: 0.4
    },
    {
      name: "Garden Tiller",
      price: "18.00",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Garden+Tiller",
      location: "1.4 miles away",
      delay: 0.5
    },
    {
      name: "Pressure Washer",
      price: "25.00",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Pressure+Washer",
      location: "1.9 miles away",
      delay: 0.6
    }
  ],
  "Painting": [
    {
      name: "Paint Sprayer",
      price: "15.00",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Paint+Sprayer",
      location: "0.6 miles away",
      delay: 0.3
    },
    {
      name: "Airless Sprayer",
      price: "18.50",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Airless+Sprayer",
      location: "1.0 miles away",
      delay: 0.4
    },
    {
      name: "Premium Roller Set",
      price: "6.75",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Roller+Set",
      location: "1.5 miles away",
      delay: 0.5
    },
    {
      name: "Extension Ladder",
      price: "12.25",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Extension+Ladder",
      location: "2.1 miles away",
      delay: 0.6
    }
  ],
  "Woodworking": [
    {
      name: "Table Saw",
      price: "22.50",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Table+Saw",
      location: "0.9 miles away",
      delay: 0.3
    },
    {
      name: "Router",
      price: "12.25",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Router",
      location: "1.3 miles away",
      delay: 0.4
    },
    {
      name: "Miter Saw",
      price: "18.00",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Miter+Saw",
      location: "1.6 miles away",
      delay: 0.5
    },
    {
      name: "Belt Sander",
      price: "9.50",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Belt+Sander",
      location: "2.2 miles away",
      delay: 0.6
    }
  ],
  "Plumbing": [
    {
      name: "Pipe Wrench Set",
      price: "7.50",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Pipe+Wrench",
      location: "0.7 miles away",
      delay: 0.3
    },
    {
      name: "Drain Snake",
      price: "9.25",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Drain+Snake",
      location: "1.2 miles away",
      delay: 0.4
    },
    {
      name: "Pipe Cutter",
      price: "6.00",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Pipe+Cutter",
      location: "1.5 miles away",
      delay: 0.5
    },
    {
      name: "Soldering Kit",
      price: "8.75",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Soldering+Kit",
      location: "1.9 miles away",
      delay: 0.6
    }
  ],
  "Electrical": [
    {
      name: "Wire Stripper Set",
      price: "5.50",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Wire+Stripper",
      location: "0.6 miles away",
      delay: 0.3
    },
    {
      name: "Multimeter",
      price: "7.25",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Multimeter",
      location: "1.1 miles away",
      delay: 0.4
    },
    {
      name: "Circuit Tester",
      price: "4.50",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Circuit+Tester",
      location: "1.4 miles away",
      delay: 0.5
    },
    {
      name: "Cable Conduit Kit",
      price: "8.25",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Conduit+Kit",
      location: "1.8 miles away",
      delay: 0.6
    }
  ],
  "Measuring": [
    {
      name: "Laser Level",
      price: "11.50",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Laser+Level",
      location: "0.8 miles away",
      delay: 0.3
    },
    {
      name: "Tape Measure Set",
      price: "3.75",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Tape+Measure",
      location: "1.2 miles away",
      delay: 0.4
    },
    {
      name: "Digital Caliper",
      price: "6.00",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Digital+Caliper",
      location: "1.5 miles away",
      delay: 0.5
    },
    {
      name: "Angle Finder",
      price: "4.25",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Angle+Finder",
      location: "1.9 miles away",
      delay: 0.6
    }
  ],
  "Safety Equipment": [
    {
      name: "Hard Hat",
      price: "4.50",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Hard+Hat",
      location: "0.7 miles away",
      delay: 0.3
    },
    {
      name: "Safety Goggles",
      price: "3.25",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Safety+Goggles",
      location: "1.1 miles away",
      delay: 0.4
    },
    {
      name: "Work Gloves",
      price: "2.75",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Work+Gloves",
      location: "1.4 miles away",
      delay: 0.5
    },
    {
      name: "Respirator Kit",
      price: "5.50",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Respirator+Kit",
      location: "1.8 miles away",
      delay: 0.6
    }
  ],
  "Automotive": [
    {
      name: "OBD Scanner",
      price: "14.50",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=OBD+Scanner",
      location: "0.9 miles away",
      delay: 0.3
    },
    {
      name: "Torque Wrench",
      price: "8.75",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Torque+Wrench",
      location: "1.3 miles away",
      delay: 0.4
    },
    {
      name: "Car Jack",
      price: "12.00",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Car+Jack",
      location: "1.6 miles away",
      delay: 0.5
    },
    {
      name: "Battery Charger",
      price: "9.50",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Battery+Charger",
      location: "2.0 miles away",
      delay: 0.6
    }
  ],
  "Ladders & Scaffolding": [
    {
      name: "Extension Ladder",
      price: "15.50",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Extension+Ladder",
      location: "0.8 miles away",
      delay: 0.3
    },
    {
      name: "Step Ladder",
      price: "9.25",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Step+Ladder",
      location: "1.2 miles away",
      delay: 0.4
    },
    {
      name: "Multi-Position Ladder",
      price: "18.00",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Multi+Ladder",
      location: "1.5 miles away",
      delay: 0.5
    },
    {
      name: "Scaffolding Set",
      price: "25.50",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Scaffolding",
      location: "1.9 miles away",
      delay: 0.6
    }
  ],
  "Lawn & Landscaping": [
    {
      name: "Lawn Mower",
      price: "22.50",
      rating: 4.8,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Lawn+Mower",
      location: "0.7 miles away",
      delay: 0.3
    },
    {
      name: "Leaf Blower",
      price: "12.75",
      rating: 4.7,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Leaf+Blower",
      location: "1.1 miles away",
      delay: 0.4
    },
    {
      name: "Hedge Trimmer",
      price: "13.50",
      rating: 4.9,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Hedge+Trimmer",
      location: "1.4 miles away",
      delay: 0.5
    },
    {
      name: "Weed Whacker",
      price: "10.25",
      rating: 4.6,
      image: "https://placehold.co/300x300/e9f5e9/1a8754?text=Weed+Whacker",
      location: "1.8 miles away",
      delay: 0.6
    }
  ],
};

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

export default function LandingPage() {
  // Refs for scroll targets
  const findToolRef = useRef<HTMLElement>(null)
  const findWhatYouNeedRef = useRef<HTMLElement>(null)
  const popularToolsRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const whyChooseRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  
  // Simple boolean state for showing all categories
  const [showMore, setShowMore] = useState(false)

  // Smooth scroll function
  const scrollToSection = (elementRef: React.RefObject<HTMLElement | null>) => {
    if (elementRef.current) {
      const yOffset = -80;
      const y = elementRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      
      elementRef.current.classList.add('section-highlight');
      setTimeout(() => {
        elementRef.current?.classList.remove('section-highlight');
      }, 1500);
    }
  }

  // Simple helper to render the correct icon based on type
  const renderCategoryIcon = (iconType: string) => {
    switch(iconType) {
      case 'drill':
        return <Drill className="h-8 w-8 text-green-600" />;
      case 'hammer':
        return <Hammer className="h-8 w-8 text-green-600" />;
      case 'scissors':
        return <Scissors className="h-8 w-8 text-green-600" />;
      case 'wrench':
        return <Wrench className="h-8 w-8 text-green-600" />;
      case 'paintBucket':
        return <PaintBucket className="h-8 w-8 text-green-600" />;
      case 'axe':
        return <Axe className="h-8 w-8 text-green-600" />;
      case 'zap':
        return <Zap className="h-8 w-8 text-green-600" />;
      case 'ruler':
        return <Ruler className="h-8 w-8 text-green-600" />;
      case 'hardHat':
        return <HardHat className="h-8 w-8 text-green-600" />;
      case 'car':
        return <Car className="h-8 w-8 text-green-600" />;
      case 'warehouse':
        return <Warehouse className="h-8 w-8 text-green-600" />;
      case 'leaf':
        return <Leaf className="h-8 w-8 text-green-600" />;
      default:
        return <Wrench className="h-8 w-8 text-green-600" />;
    }
  };
  
  // State to track selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // State to show category-specific tools section
  const [showCategoryTools, setShowCategoryTools] = useState(false);
  
  // State to display the browse button when a category is selected
  const [showBrowseButton, setShowBrowseButton] = useState(false);
  
  // Determine how many categories to show
  const categoriesToShow = showMore ? allCategoryData : allCategoryData.slice(0, 4);
  
  // Animation variants for category grid items
  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -10,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
        ease: "easeIn"
      }
    })
  };

  // Animation for expanding/collapsing the grid
  const containerVariants = {
    expanded: { 
      height: 'auto',
      transition: { 
        staggerChildren: 0.05,
        duration: 0.5,
        when: "beforeChildren"
      }
    },
    collapsed: {
      height: 'auto',
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.5,
        when: "afterChildren"
      }
    }
  };

  // Reference for category tools section
  const categoryToolsRef = useRef<HTMLElement>(null)
  
  // Function to handle category selection
  const handleCategorySelection = (categoryName: string) => {
    // If the user clicks on the same category that is currently selected
    if (categoryName === selectedCategory) {
      setSelectedCategory(null);
      setShowBrowseButton(false);
    } else {
      // If we're currently showing category tools and select a different category
      if (showCategoryTools) {
        setSelectedCategory(categoryName);
        setShowCategoryTools(false);
        setShowBrowseButton(true);
        // Scroll back to the categories section
        setTimeout(() => {
          scrollToSection(findWhatYouNeedRef);
        }, 100);
      } else {
        // Normal case - just select the category and show browse button
        setSelectedCategory(categoryName);
        setShowBrowseButton(true);
      }
    }
  };

  // Function to handle the "Browse Category Tools" button click
  const handleBrowseCategoryTools = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryTools(true);
    // Scroll to the category tools section with a slight delay to ensure it's visible
    setTimeout(() => {
      scrollToSection(categoryToolsRef);
    }, 100);
  };

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
                  className="bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-base px-8 relative overflow-hidden group"
                  onClick={() => scrollToSection(findToolRef)}
                >
                  <span className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                  <span className="relative flex items-center">
                  Find Tools
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
                <Link href="/auth/signup">
                  <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 transition-all text-base group relative overflow-hidden">
                    <span className="absolute inset-0 w-0 h-full bg-green-100/50 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                    <span className="relative">List Your Tools</span>
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
        className="py-20 px-4 sm:px-6 bg-white relative transition-all duration-700" 
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
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 animate-float"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-50 blur-md transition-all duration-500"></div>
                <div className="relative bg-white rounded-xl">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                  <Input 
                    placeholder="What tool do you need?" 
                    className="pl-12 py-6 text-base rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-sm hover:border-green-300 hover:shadow-md transition-all duration-300 backdrop-blur-sm z-20"
                  />
                  <div className="absolute inset-x-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 z-30 transform origin-top scale-95 group-focus-within:scale-100">
                    <div className="p-3 border-b border-gray-100">
                      <h4 className="font-medium text-sm text-gray-500">Popular Searches</h4>
              </div>
                    <ul className="py-2">
                      {['Power Drill', 'Circular Saw', 'Pressure Washer', 'Ladder', 'Paint Sprayer'].map((item, i) => (
                        <li 
                          key={i} 
                          className="px-4 py-2 hover:bg-green-50 cursor-pointer flex items-center text-gray-700 transition-all duration-200 hover:pl-6 group/item"
                        >
                          <Search className="h-4 w-4 mr-2 text-gray-400 group-hover/item:text-green-500 transition-colors duration-200" />
                          {item}
                          <span className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 text-green-500">→</span>
                        </li>
                      ))}
                    </ul>
              </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-50 blur-md transition-all duration-500"></div>
                <div className="relative bg-white rounded-xl">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                  <Input 
                    placeholder="Your location" 
                    className="pl-12 py-6 text-base rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 shadow-sm hover:border-green-300 hover:shadow-md transition-all duration-300 backdrop-blur-sm z-20"
                  />
                  <div className="absolute inset-x-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 z-30 transform origin-top scale-95 group-focus-within:scale-100">
                    <div className="p-3 border-b border-gray-100">
                      <h4 className="font-medium text-sm text-gray-500">Nearby Locations</h4>
                    </div>
                    <ul className="py-2">
                      {['Current Location', 'Seattle, WA', 'Portland, OR', 'Bellevue, WA', 'Tacoma, WA'].map((item, i) => (
                        <li 
                          key={i} 
                          className="px-4 py-2 hover:bg-green-50 cursor-pointer flex items-center text-gray-700 transition-all duration-200 hover:pl-6 group/item"
                        >
                          <MapPin className="h-4 w-4 mr-2 text-gray-400 group-hover/item:text-green-500 transition-colors duration-200" />
                          {item}
                          <span className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 text-green-500">→</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative group h-full flex">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-600 rounded-xl opacity-50 blur-md group-hover:opacity-80 group-hover:blur-lg transition-all duration-500"></div>
                <Button 
                  className="bg-green-600 hover:bg-green-700 py-6 rounded-xl text-base font-medium text-white shadow-lg shadow-green-600/20 hover:shadow-green-600/40 transition-all duration-300 relative w-full flex items-center justify-center transform group-hover:-translate-y-1 z-10 overflow-hidden"
                >
                  <div className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-xl"></div>
                  <span className="relative z-10 flex items-center">
                Search Tools
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
              </Button>
              </div>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              {['Power Tools', 'Hand Tools', 'Garden Equipment', 'Power Washers', 'Ladders'].map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * i + 0.6 }}
                >
                  <Badge 
                    variant="outline" 
                    className="px-4 py-2 border border-gray-200 bg-gray-50 hover:bg-green-50 hover:text-green-700 hover:border-green-200 cursor-pointer transition-all duration-300 text-gray-700 transform hover:-translate-y-1 hover:shadow-md group"
                  >
                    <span className="relative">
                      {category}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                    </span>
              </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Find What You Need Section */}
      <section 
        ref={findWhatYouNeedRef} 
        className="py-24 bg-gray-50 relative overflow-hidden transition-all duration-700" 
        id="find-what-you-need"
      >
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -right-40 top-40 w-80 h-80 bg-green-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -left-40 bottom-40 w-80 h-80 bg-yellow-100 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4"
            >
              Browse Categories
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Find What You Need
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Browse popular categories to find the right tools for your project
            </motion.p>
          </div>

          {/* Interactive category grid */}
              <motion.div
            variants={containerVariants}
            initial="collapsed"
            animate={showMore ? "expanded" : "collapsed"}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {categoriesToShow.map((category, index) => (
              <motion.div
                key={category.name}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={gridItemVariants}
                onClick={() => handleCategorySelection(category.name)}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 
                  ${selectedCategory === category.name ? 'ring-2 ring-green-500 ring-offset-2' : ''}
                  group hover:shadow-xl hover:border-green-200 transition-all duration-300 cursor-pointer 
                  transform hover:-translate-y-2 hover:scale-110 relative isolate`}
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 15 
                  }
                }}
              >
                <div className="p-8 flex flex-col items-center text-center relative overflow-hidden">
                  {/* Background decorative element */}
                  <div className="absolute -right-6 -top-6 w-12 h-12 bg-green-100 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500 blur-md"></div>
                  
                  {/* Icon with animation */}
                  <motion.div 
                    whileHover={{ 
                      rotate: [0, -10, 10, -5, 0], 
                      scale: 1.15,
                      transition: { duration: 0.5 }
                    }}
                    className={`w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 
                      group-hover:bg-green-200 transition-all duration-300 relative 
                      ${selectedCategory === category.name ? 'bg-green-200' : ''}`}
                  >
                    {/* Pulsing effect when selected */}
                    {selectedCategory === category.name && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 0, 0.7],
                        }}
                        transition={{ 
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 2
                        }}
                        className="absolute inset-0 bg-green-300 rounded-full"
                      />
                    )}
                    {renderCategoryIcon(category.iconType)}
                  </motion.div>
                  
                  {/* Name with underline effect */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 relative group-hover:text-green-700 transition-colors duration-300">
                    {category.name}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: selectedCategory === category.name ? '100%' : 0 }}
                      className="h-0.5 bg-green-500 mt-1 absolute bottom-0 left-0"
                    />
                  </h3>
                  
                  {/* Badge with animation */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge className={`
                      ${selectedCategory === category.name ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} 
                      border-0 px-3 py-1 transition-colors duration-300 group-hover:bg-green-100 group-hover:text-green-700`}
                    >
                      {category.count} tools
                    </Badge>
                  </motion.div>
                  
                  {/* Selection indicator */}
                  {selectedCategory === category.name && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Enhanced gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                {/* Additional hover effects */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-300 to-green-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-all duration-500 -z-20"></div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Toggle button with enhanced animation */}
          <div className="text-center mt-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                variant="outline" 
                className="border-green-600 text-green-700 hover:bg-green-50 transition-all px-8 py-6 text-base overflow-hidden relative group"
                onClick={() => {
                  // Add a slight delay when showing less categories to allow for animation
                  if (showMore) {
                    setTimeout(() => {
                      setShowMore(false);
                      // If we're showing less, we should also hide the browse button
                      setShowBrowseButton(false);
                    }, 50);
                  } else {
                    setShowMore(true);
                  }
                }}
              >
                {showMore ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-t from-green-500/20 to-green-400/5 group-hover:h-full transition-all duration-500 ease-out rounded-md"></span>
                ) : (
                  <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-green-400/20 to-green-500/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                )}
                <motion.span 
                  className="relative flex items-center justify-center"
                  initial={false}
                  transition={{ duration: 0.2 }}
                >
                  {showMore ? (
                    <>
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center"
                      >
                        <span className="mr-2">Show Less</span>
                        <motion.div
                          animate={{ y: [0, -3, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            repeatType: "mirror", 
                            duration: 1,
                            repeatDelay: 0.5
                          }}
                          className="group-hover:-translate-y-1 transition-transform duration-300"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </motion.div>
                      </motion.span>
                    </>
                  ) : (
                    <>
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center"
                      >
                        <span className="mr-2">View All Categories</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            repeatType: "mirror", 
                            duration: 1,
                            repeatDelay: 0.5
                          }}
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </motion.span>
                    </>
                  )}
                </motion.span>
              </Button>
            </motion.div>
            
            {!showMore && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mt-3"
              >
                <p className="text-sm text-gray-500">
                  Discover <span className="font-semibold text-green-600">{allCategoryData.length - 4}</span> more categories of tools
                </p>
                <motion.div 
                  className="flex justify-center gap-1 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {allCategoryData.slice(4, 8).map((cat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 0.3 }}
                      className="w-2 h-2 rounded-full bg-green-200"
                    />
                  ))}
                  <motion.div className="w-6 h-2 rounded-full bg-green-400" />
                  {allCategoryData.slice(8).map((cat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 + (i * 0.1), duration: 0.3 }}
                      className="w-2 h-2 rounded-full bg-green-200"
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
            
            {showBrowseButton && selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mt-6"
              >
                <Button
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white group relative overflow-hidden"
                  onClick={() => handleBrowseCategoryTools(selectedCategory)}
                >
                  <span className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                  <span className="relative flex items-center">
                    Browse {selectedCategory} Tools
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>
            )}
            
            {showMore && !selectedCategory && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-sm text-gray-500 mt-3"
              >
                Select a category to browse tools
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Category-specific Tools Section */}
      {showCategoryTools && selectedCategory && (
        <section 
          ref={categoryToolsRef}
          id="category-tools"
          className="py-24 bg-white relative transition-all duration-700">
          <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
                className="inline-block px-3 py-1 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4"
            >
                Category Tools
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3"
            >
                <span>{selectedCategory}</span>
                {renderCategoryIcon(allCategoryData.find(cat => cat.name === selectedCategory)?.iconType || 'default')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
                Available {selectedCategory} tools in your area
            </motion.p>
          </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {(toolsByCategory[selectedCategory as keyof typeof toolsByCategory] || []).map((tool, index) => (
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

            <div className="text-center mt-12 space-y-4">
              <Button 
                variant="outline" 
                className="border-green-600 text-green-700 hover:bg-green-50 transition-all px-8 py-6 text-base group relative overflow-hidden"
                onClick={() => {
                  setShowCategoryTools(false);
                  setShowBrowseButton(true); // Keep the browse button visible after closing
                  // Scroll back to the categories section
                  scrollToSection(findWhatYouNeedRef);
                }}
              >
                <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-green-400/20 to-green-500/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                <span className="relative flex items-center">
                  Close Category View
                  <ArrowUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
              </Button>
              
              <div>
                <Button 
                  variant="ghost" 
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all text-sm group relative overflow-hidden"
                  onClick={() => {
                    // Don't close the category tools view
                    // setSelectedCategory(null);
                    // setShowCategoryTools(false);
                    // setShowBrowseButton(false);
                    
                    // Just scroll back to the categories section
                    scrollToSection(findWhatYouNeedRef);
                  }}
                >
                  <span className="absolute inset-0 w-0 h-full bg-gray-200/30 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                  <span className="relative flex items-center">
                    Back to Categories
                    <ArrowUp className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300" />
                  </span>
                </Button>
              </div>
          </div>
        </div>
      </section>
      )}

      {/* Popular Tools Section - Redesigned */}
      <section 
        ref={popularToolsRef}
        id="popular-tools"
        className="py-24 bg-white relative transition-all duration-700">
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
            <Button 
              variant="outline" 
              className="border-green-600 text-green-700 hover:bg-green-50 transition-all px-8 py-6 text-base group relative overflow-hidden"
              onClick={() => scrollToSection(popularToolsRef)}
            >
              <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-green-400/20 to-green-500/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
              <span className="relative flex items-center">
              View All Tools
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works Section - Redesigned */}
      <section 
        ref={howItWorksRef}
        id="how-it-works"
        className="py-24 bg-gray-50 relative overflow-hidden transition-all duration-700">
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

      {/* Why Choose Us Section */}
      <section 
        ref={whyChooseRef} 
        className="py-24 bg-white relative overflow-hidden transition-all duration-700" 
        id="why-choose-us">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-50 to-transparent"></div>
        <div className="absolute -right-40 top-40 w-80 h-80 bg-green-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -left-40 bottom-40 w-80 h-80 bg-yellow-100 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4"
            >
              Our Benefits
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Why Choose ToolNest
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Benefits that make us the preferred choice for tool rentals
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: DollarSign,
                title: "Save Money",
                description: "Rent tools at a fraction of the purchase price",
                colorBg: "bg-green-100",
                colorText: "text-green-600",
                colorHover: "group-hover:bg-green-200",
                delay: 0.3,
              },
              {
                icon: Clock,
                title: "Sustainability",
                description: "Reduce waste by sharing resources in your community",
                colorBg: "bg-blue-100",
                colorText: "text-blue-600",
                colorHover: "group-hover:bg-blue-200",
                delay: 0.4,
              },
              {
                icon: CheckCircle,
                title: "Quality Guaranteed",
                description: "All tools are verified and rated by users",
                colorBg: "bg-yellow-100",
                colorText: "text-yellow-600",
                colorHover: "group-hover:bg-yellow-200",
                delay: 0.5,
              },
              {
                icon: Users,
                title: "Community Trust",
                description: "Connect with verified local tool owners",
                colorBg: "bg-purple-100",
                colorText: "text-purple-600",
                colorHover: "group-hover:bg-purple-200",
                delay: 0.6,
              },
              {
                icon: Wrench,
                title: "Wide Selection",
                description: "Find exactly what you need for any project",
                colorBg: "bg-red-100",
                colorText: "text-red-600",
                colorHover: "group-hover:bg-red-200",
                delay: 0.7,
              },
              {
                icon: Calendar,
                title: "Convenient Delivery",
                description: "Optional tool delivery service available for larger items in select areas",
                colorBg: "bg-orange-100",
                colorText: "text-orange-600",
                colorHover: "group-hover:bg-orange-200",
                delay: 0.8,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 group hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl ${feature.colorBg} flex items-center justify-center mb-6 ${feature.colorHover} transition-colors duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.colorText}`} />
                </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-center mt-16"
          >
            <Button 
              className="bg-green-600 hover:bg-green-700 transition-all px-8 py-6 text-base shadow-lg shadow-green-600/20 group relative overflow-hidden"
              onClick={() => scrollToSection(findToolRef)}
            >
              <span className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
              <span className="relative flex items-center">
                Join ToolNest Today
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Back to top button */}
      <div className="fixed bottom-8 right-8 z-40">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg shadow-green-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-green-600/30 group"
        >
          <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      </div>

      <style jsx global>{`
        .section-highlight {
          animation: highlight 1.5s ease-out;
          position: relative;
        }
        
        @keyframes highlight {
          0% { 
            box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
          }
          30% { 
            box-shadow: 0 0 0 25px rgba(22, 163, 74, 0.15);
          }
          100% { 
            box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
          }
        }
        
        .section-highlight::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 8px;
          animation: pulse-border 1.5s ease-out;
          pointer-events: none;
          z-index: 1;
        }
        
        @keyframes pulse-border {
          0% {
            box-shadow: inset 0 0 0 0 rgba(22, 163, 74, 0);
            border: 2px solid rgba(22, 163, 74, 0);
          }
          30% {
            box-shadow: inset 0 0 40px 0 rgba(22, 163, 74, 0.1);
            border: 2px solid rgba(22, 163, 74, 0.3);
          }
          100% {
            box-shadow: inset 0 0 0 0 rgba(22, 163, 74, 0);
            border: 2px solid rgba(22, 163, 74, 0);
          }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        
        @keyframes pulse-subtle {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        section {
          scroll-margin-top: 80px;
        }
      `}</style>
    </>
  )
}
