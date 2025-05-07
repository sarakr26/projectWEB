"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useQuery } from "react-query"
import { Star, Heart, MapPin, Calendar, Clock, ChevronLeft, ChevronRight } from "react-feather"
import { useAuth } from "../contexts/AuthContext"

// Mock data fetching function
const fetchToolDetails = async (id: string) => {
  // In a real app, this would be an API call
  return {
    id,
    name: "Cordless Drill - DeWalt 20V MAX",
    description:
      "Professional-grade cordless drill with two batteries, charger, and carrying case. Perfect for home improvement projects, furniture assembly, and general DIY tasks.",
    price: 15,
    deposit: 50,
    rating: 4.8,
    reviewCount: 24,
    location: "Brooklyn, NY",
    distance: 1.2,
    owner: {
      id: "owner1",
      name: "Michael Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      reviewCount: 42,
      responseRate: 98,
      responseTime: "within an hour",
      memberSince: "March 2022",
    },
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    specifications: [
      { name: "Brand", value: "DeWalt" },
      { name: "Model", value: "DCD777C2" },
      { name: "Power Source", value: "Battery Powered" },
      { name: "Voltage", value: "20V" },
      { name: "Weight", value: "2.6 lbs" },
      { name: "Includes", value: "2 Batteries, Charger, Case" },
    ],
    features: [
      "Brushless motor for longer runtime and durability",
      "Compact and lightweight design",
      "LED light for improved visibility",
      "Ergonomic handle for comfort",
      "2-speed transmission for versatility",
    ],
    reviews: [
      {
        id: "review1",
        user: {
          name: "Sarah M.",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 5,
        date: "2023-04-15",
        text: "Great drill! It was clean, fully charged, and worked perfectly for my project. Michael was very responsive and helpful.",
      },
      {
        id: "review2",
        user: {
          name: "David L.",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 4,
        date: "2023-03-22",
        text: "The drill worked well for my needs. Pickup and drop-off were easy. Would rent again.",
      },
      {
        id: "review3",
        user: {
          name: "Jessica K.",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        rating: 5,
        date: "2023-02-10",
        text: "Perfect condition and Michael was super flexible with pickup times. Highly recommend!",
      },
    ],
    availability: {
      // In a real app, this would be a calendar with available dates
      available: true,
      nextAvailable: "Today",
    },
  }
}

export default function ToolDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [isSaved, setIsSaved] = useState(false)

  const { data: tool, isLoading } = useQuery(["tool", id], () => fetchToolDetails(id || ""), {
    enabled: !!id,
  })

  const handlePrevImage = () => {
    if (tool) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? tool.images.length - 1 : prevIndex - 1))
    }
  }

  const handleNextImage = () => {
    if (tool) {
      setCurrentImageIndex((prevIndex) => (prevIndex === tool.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const handleSaveToggle = () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return
    }

    setIsSaved(!isSaved)
  }

  const handleRentRequest = () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return
    }

    // In a real app, this would send a request to the backend
    alert("Rental request sent!")
  }

  if (isLoading || !tool) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  // Calculate rental cost
  const calculateRentalCost = () => {
    if (!startDate || !endDate) return 0

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return days * tool.price
  }

  const rentalCost = calculateRentalCost()
  const serviceFee = rentalCost * 0.1 // 10% service fee
  const totalCost = rentalCost + serviceFee

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to search results
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Images and details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image gallery */}
          <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="aspect-w-4 aspect-h-3 relative">
              <img
                src={tool.images[currentImageIndex] || "/placeholder.svg"}
                alt={tool.name}
                className="w-full h-full object-cover"
              />

              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>

              <button
                onClick={handleSaveToggle}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md"
                aria-label={isSaved ? "Remove from saved" : "Save tool"}
              >
                <Heart
                  className={`h-5 w-5 ${isSaved ? "text-red-500 fill-red-500" : "text-gray-500 dark:text-gray-400"}`}
                />
              </button>
            </div>

            <div className="flex justify-center mt-2 space-x-2 p-2">
              {tool.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-12 rounded overflow-hidden border-2 ${
                    index === currentImageIndex ? "border-green-500 dark:border-green-400" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Tool details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>

              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-700 dark:text-gray-300">{tool.rating}</span>
                </div>
                <span className="mx-1 text-gray-500 dark:text-gray-400">·</span>
                <span className="text-gray-500 dark:text-gray-400">{tool.reviewCount} reviews</span>
                <span className="mx-1 text-gray-500 dark:text-gray-400">·</span>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {tool.location} ({tool.distance} miles away)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
              <p className="text-gray-700 dark:text-gray-300">{tool.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tool.specifications.map((spec, index) => (
                  <div key={index} className="flex">
                    <span className="font-medium text-gray-900 dark:text-white w-1/3">{spec.name}:</span>
                    <span className="text-gray-700 dark:text-gray-300">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Features</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {tool.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reviews</h2>
              <div className="space-y-6">
                {tool.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                    <div className="flex items-start">
                      <img
                        src={review.user.avatar || "/placeholder.svg"}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900 dark:text-white">{review.user.name}</h3>
                          <span className="mx-2 text-gray-500 dark:text-gray-400">·</span>
                          <span className="text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex items-center mt-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Booking and owner info */}
        <div className="space-y-8">
          {/* Booking card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">${tool.price}</span>
                <span className="text-gray-500 dark:text-gray-400"> / day</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-gray-700 dark:text-gray-300">{tool.rating}</span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">({tool.reviewCount})</span>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
              <div className="flex">
                <div className="w-1/2 p-3 border-r border-gray-200 dark:border-gray-700">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">START DATE</label>
                  <input
                    type="date"
                    className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none"
                    onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
                <div className="w-1/2 p-3">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">END DATE</label>
                  <input
                    type="date"
                    className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none"
                    onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 p-3">
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">TIME SLOT</label>
                <select
                  className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  <option value="">Select a time slot</option>
                  <option value="morning">Morning (8am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 5pm)</option>
                  <option value="evening">Evening (5pm - 9pm)</option>
                </select>
              </div>
            </div>

            {startDate && endDate && timeSlot && (
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    ${tool.price} x {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1}{" "}
                    days
                  </span>
                  <span className="text-gray-900 dark:text-white">${rentalCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Service fee</span>
                  <span className="text-gray-900 dark:text-white">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Security deposit (refundable)</span>
                  <span className="text-gray-900 dark:text-white">${tool.deposit}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${totalCost.toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleRentRequest}
              disabled={!startDate || !endDate || !timeSlot}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Request to Rent
            </button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">You won't be charged yet</p>
          </div>

          {/* Owner info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <img
                src={tool.owner.avatar || "/placeholder.svg"}
                alt={tool.owner.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Owned by {tool.owner.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member since {tool.owner.memberSince}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  {tool.owner.rating} · {tool.owner.reviewCount} reviews
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Responds {tool.owner.responseTime}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{tool.owner.responseRate}% response rate</span>
              </div>
            </div>

            <Link
              to={`/profile/${tool.owner.id}`}
              className="block w-full text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
