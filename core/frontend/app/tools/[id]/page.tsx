"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Shield, 
  MessageCircle, 
  Share2, 
  Heart, 
  User,
  ArrowRight
} from "lucide-react"

// Mock data for the tool details - in a real app, this would come from an API
const getToolData = (id: string) => {
  // This is a placeholder - in a real app this would fetch from API based on the ID
  return {
    id,
    name: "Professional Drill Kit",
    description: "High-performance cordless drill kit with multiple speed settings and a complete set of drill bits. Perfect for home improvement projects and professional use.",
    longDescription: "This professional-grade drill kit includes a powerful 20V cordless drill with a brushless motor for maximum efficiency and runtime. It features variable speed settings from 0-2000 RPM, a 1/2-inch keyless chuck for quick bit changes, and 22 clutch settings for precise control. The ergonomic grip reduces fatigue during extended use, while the LED work light illuminates dark work areas. The kit comes with 2 lithium-ion batteries, a rapid charger, and a comprehensive set of drill bits in a durable carrying case.",
    price: "8.50",
    rating: 4.9,
    reviewCount: 156,
    image: "https://placehold.co/600x400/e9f5e9/1a8754?text=Professional+Drill+Kit",
    images: [
      "https://placehold.co/600x400/e9f5e9/1a8754?text=Professional+Drill+Kit+1",
      "https://placehold.co/600x400/e9f5e9/1a8754?text=Professional+Drill+Kit+2",
      "https://placehold.co/600x400/e9f5e9/1a8754?text=Professional+Drill+Kit+3"
    ],
    location: "0.8 miles away",
    owner: {
      name: "Michael Smith",
      rating: 4.8,
      rentalCount: 143,
      image: "https://placehold.co/200x200/e9f5e9/1a8754?text=MS",
      memberSince: "March 2022"
    },
    category: "Power Tools",
    availability: true,
    condition: "Excellent",
    specifications: [
      { name: "Brand", value: "DeWalt" },
      { name: "Power Source", value: "Cordless Electric" },
      { name: "Voltage", value: "20V" },
      { name: "Max RPM", value: "2,000" },
      { name: "Chuck Size", value: "1/2 inch" },
      { name: "Weight", value: "3.5 lbs" },
      { name: "Batteries Included", value: "Yes (2)" },
      { name: "Charger Included", value: "Yes" },
      { name: "Case Included", value: "Yes" }
    ],
    features: [
      "Variable speed settings for different materials",
      "LED work light for dark areas",
      "22 clutch settings for precise control",
      "Ergonomic grip reduces hand fatigue",
      "Brushless motor for longer runtime",
      "Keyless chuck for quick bit changes"
    ],
    rentalOptions: [
      { duration: "1 Day", price: 8.50 },
      { duration: "Weekend", price: 15.00 },
      { duration: "1 Week", price: 42.50 },
      { duration: "2 Weeks", price: 75.00 }
    ],
    reviews: [
      {
        user: "John D.",
        rating: 5,
        date: "July 15, 2023",
        comment: "Excellent drill, worked perfectly for my cabinet installation project. Great condition and the owner was very helpful with tips.",
        avatar: "https://placehold.co/100x100/e9f5e9/1a8754?text=JD"
      },
      {
        user: "Sarah M.",
        rating: 5,
        date: "June 28, 2023",
        comment: "This drill was powerful and had plenty of battery life. Completed my deck project without needing to recharge.",
        avatar: "https://placehold.co/100x100/e9f5e9/1a8754?text=SM"
      },
      {
        user: "Robert K.",
        rating: 4,
        date: "June 10, 2023",
        comment: "Very good drill. The carrying case was a bit worn but the tool itself worked flawlessly.",
        avatar: "https://placehold.co/100x100/e9f5e9/1a8754?text=RK"
      }
    ]
  }
}

export default function ToolDetails() {
  const params = useParams()
  const [tool, setTool] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      const data = getToolData(params.id as string);
      setTool(data);
      setSelectedImage(data.images[0]);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [params.id]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-gray-600">Loading tool details...</p>
        </div>
      </div>
    )
  }

  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Tool Not Found</h1>
          <p className="text-gray-600">We couldn't find the tool you're looking for. It may have been removed or the URL might be incorrect.</p>
          <Link href="/">
            <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl shadow-md hover:shadow-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 group">
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </div>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Breadcrumb and navigation */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/#popular-tools" className="hover:text-green-600 transition-colors">
              {tool.category}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">{tool.name}</span>
            
            <Link href="/" className="ml-auto">
              <div className="flex items-center px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 hover:text-green-600 rounded-full border border-gray-200 hover:border-green-200 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                <span className="absolute inset-0 w-0 bg-green-50/50 group-hover:w-full transition-all duration-300 rounded-full"></span>
                <ArrowLeft className="h-4 w-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform relative z-10" />
                <span className="font-medium relative z-10">Back</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Images */}
          <div className="w-full lg:w-3/5 space-y-6">
            {/* Main Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt={tool.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className="bg-green-100 text-green-700 border-0 py-1.5 px-3 text-sm shadow-sm" variant="secondary">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white w-8 h-8 p-0 text-gray-700"
                    title="Add to Favorites"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white w-8 h-8 p-0 text-gray-700"
                    title="Share Tool"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Thumbnail Images */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
            >
              {tool.images.map((img: string, index: number) => (
                <div 
                  key={index}
                  className={`
                    aspect-video rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300
                    ${selectedImage === img ? 'border-green-500 shadow-md' : 'border-gray-200 hover:border-green-300'}
                  `}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`${tool.name} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
            
            {/* Detailed Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mt-10"
            >
              <Tabs defaultValue="details">
                <TabsList className="w-full border-b border-gray-200 bg-gray-50 p-0 h-auto">
                  <TabsTrigger 
                    value="details" 
                    className="py-4 px-6 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:shadow-none rounded-none"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="specs" 
                    className="py-4 px-6 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:shadow-none rounded-none"
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="py-4 px-6 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:shadow-none rounded-none"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{tool.longDescription}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tool.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Rental Options</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {tool.rentalOptions.map((option: any, index: number) => (
                        <div 
                          key={index} 
                          className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center hover:bg-green-50 hover:border-green-200 transition-colors cursor-pointer"
                        >
                          <div className="text-lg font-semibold text-gray-900">{option.duration}</div>
                          <div className="text-green-700 font-bold">${option.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="specs" className="p-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tool.specifications.map((spec: any, index: number) => (
                        <div key={index} className="flex border-b border-gray-200 pb-2">
                          <div className="w-1/2 font-medium text-gray-700">{spec.name}</div>
                          <div className="w-1/2 text-gray-900">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="p-6 space-y-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Reviews</h3>
                    <div className="ml-4 flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-5 w-5 ${star <= Math.round(tool.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-700">{tool.rating} out of 5</span>
                    </div>
                    <span className="ml-4 text-gray-500">({tool.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="space-y-4">
                    {tool.reviews.map((review: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center mb-3">
                          <img 
                            src={review.avatar} 
                            alt={review.user} 
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{review.user}</div>
                            <div className="text-gray-500 text-sm">{review.date}</div>
                          </div>
                          <div className="ml-auto flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
          
          {/* Right Column - Booking and Owner Info */}
          <div className="w-full lg:w-2/5 space-y-6">
            {/* Booking Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24"
            >
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-5 w-5 fill-yellow-500 mr-1" />
                  <span className="font-semibold">{tool.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{tool.location}</span>
              </div>
              
              <div className="mb-6">
                <div className="text-gray-500 mb-1">Rental Rate</div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-green-700">${tool.price}</span>
                  <span className="text-gray-500 ml-1">/ day</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Other duration options available</div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Available for rent now</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Rental insurance included</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Star className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Tool condition: {tool.condition}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link href="/auth/signin" className="block w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700 h-12 font-medium text-base">
                    Book Now
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="w-full border-green-200 text-green-700 hover:bg-green-50 h-12 font-medium text-base"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Owner
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="relative">
                    <img 
                      src={tool.owner.image} 
                      alt={tool.owner.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-green-100"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-100 rounded-full p-0.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{tool.owner.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="ml-1 text-sm text-gray-500">{tool.owner.rating} · {tool.owner.rentalCount} rentals</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto text-green-700 hover:bg-green-50 hover:text-green-800"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Similar Tools Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Similar Tools Nearby</h3>
                <Button variant="link" className="text-green-600 p-0 h-auto">View All</Button>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <Link href={`/tools/${item}`} key={item}>
                    <div className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img 
                          src={`https://placehold.co/300x300/e9f5e9/1a8754?text=Tool+${item}`} 
                          alt={`Similar Tool ${item}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">Similar Power Tool {item}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-green-700 font-semibold">${(7 + item).toFixed(2)}/day</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {(0.5 + item * 0.3).toFixed(1)} mi
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all ml-2" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <button 
          onClick={scrollToTop}
          className="group flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-green-600 py-2 px-4 rounded-full border border-gray-200 shadow-sm transition-all duration-300"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 group-hover:-translate-y-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="font-medium">Back to Top</span>
        </button>
      </div>
      
      {/* Fixed Position Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white hover:bg-gray-50 text-gray-700 hover:text-green-600 p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-300 z-50 group"
          aria-label="Back to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 group-hover:-translate-y-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </main>
  )
} 