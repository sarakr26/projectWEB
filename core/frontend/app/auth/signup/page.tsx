"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Loader2, Mail, Lock, User, Github, Twitter, CheckCircle2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { registerUser } from "@/app/services/auth"
import { getCities, type City } from "@/app/services/cities"
import { toast } from "@/components/ui/use-toast"

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [cities, setCities] = useState<City[]>([])
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    phone_number: "",
    address: "",
    city_id: "",
    accountType: "client",
  })
  useEffect(() => {
    const loadCities = async () => {
      const citiesData = await getCities()
      setCities(citiesData)
    }
    
    loadCities()
  }, [])
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formStep < 2) {
      setFormStep(formStep + 1)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Prepare data for API
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        username: formData.username || formData.name, // Use name as username if not provided
        phone_number: formData.phone_number,
        address: formData.address,
        city_id: formData.city_id ? parseInt(formData.city_id) : undefined,
        role: formData.accountType
      }

      const response = await registerUser(userData)
      
      if (response.status === 'success') {
        toast({
          title: "Success!",
          description: "Your account has been created successfully.",
          variant: "default",
        })
        // Redirect to login page after successful signup
        window.location.href = '/auth/signin'
      } else {
        setError(response.message || "Registration failed. Please try again.")
        
        // If there are validation errors, show the first one
        if (response.errors) {
          const firstError = Object.values(response.errors)[0]
          if (Array.isArray(firstError) && firstError.length > 0) {
            setError(firstError[0])
          }
        }
      }
    } catch (err) {
      console.error("Registration error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-600/5 rounded-full blur-3xl"
        ></motion.div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400/30 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: 0.2 + Math.random() * 0.5
              }}
              animate={{ 
                y: [null, Math.random() * 100 + "%"],
                opacity: [null, Math.random() * 0.3 + 0.1]
              }}
              transition={{ 
                duration: 5 + Math.random() * 10, 
                repeat: Infinity, 
                repeatType: 'reverse' 
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-3 group relative">
                <motion.div 
                  className="transform transition-all duration-500 relative overflow-visible"
                  whileHover={{ rotate: 12 }}
                >
                  <AuthLogo />
                </motion.div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold font-poppins bg-gradient-to-r from-green-400 via-green-300 to-green-400 bg-clip-text text-transparent group-hover:from-white group-hover:via-green-100 group-hover:to-white transition-all duration-300 tracking-tight">
                      Tool<span className="text-white">Nest</span>
                    </span>
                    <div className="relative ml-1.5">
                      <span className="absolute -inset-1 bg-green-400/20 blur-sm rounded-full transform scale-75 group-hover:bg-green-400/30 group-hover:scale-100 transition-all duration-500"></span>
                      <span className="relative block w-1.5 h-1.5 rounded-full bg-green-400 group-hover:bg-white transition-colors duration-300 animate-pulse"></span>
                    </div>
                  </div>
                  <span className="text-[10px] text-green-400/80 uppercase tracking-widest font-medium -mt-1 group-hover:text-white/90 transition-colors duration-300 font-sans">Community Tools</span>
                </div>
              </Link>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h1 className="text-2xl font-bold text-center mb-2 text-white">Create your account</h1>
              <p className="text-gray-400 text-center mb-6">Join ToolNest to start renting or listing tools</p>
            </motion.div>

            <div className="mb-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Step {formStep + 1} of 3</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                {[0, 1, 2].map((step) => (
                  <motion.div
                    key={step}
                    className="flex flex-col items-center"
                    animate={{
                      scale: formStep === step ? 1.1 : 1,
                    }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        formStep >= step 
                          ? "bg-green-600 text-white" 
                          : "bg-gray-800 text-gray-500 border border-gray-700"
                      } transition-all duration-300 shadow-md`}
                    >
                      {formStep > step ? <CheckCircle2 className="h-5 w-5" /> : step + 1}
                    </div>
                    <div className="text-xs mt-1 text-gray-400">
                      {step === 0 ? "Account" : step === 1 ? "Profile" : "Finish"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {formStep === 0 && (
                <motion.div initial="hidden" animate="visible" className="space-y-5">
                  <motion.div variants={formVariants} custom={0} className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 h-4 w-4 transition-colors duration-300" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10 bg-gray-800/50 border-gray-700 focus:border-green-500 text-white"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                      />
                      <div className="absolute inset-0 rounded-md border border-green-400/0 group-focus-within:border-green-400/50 pointer-events-none transition-colors duration-300"></div>
                    </div>
                  </motion.div>

                  <motion.div variants={formVariants} custom={1} className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 h-4 w-4 transition-colors duration-300" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        className="pl-10 bg-gray-800/50 border-gray-700 focus:border-green-500 text-white"
                        value={formData.password}
                        onChange={(e) => updateFormData("password", e.target.value)}
                        required
                      />
                      <div className="absolute inset-0 rounded-md border border-green-400/0 group-focus-within:border-green-400/50 pointer-events-none transition-colors duration-300"></div>
                    </div>
                    <div className="text-xs text-gray-500">Password must be at least 8 characters long</div>
                  </motion.div>

                  <motion.div variants={formVariants} custom={2} className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-white relative overflow-hidden group font-medium"
                    >
                      <span className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                      <span className="relative flex items-center justify-center">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {formStep === 1 && (
                <motion.div initial="hidden" animate="visible" className="space-y-5">
                  <motion.div variants={formVariants} custom={0} className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 h-4 w-4 transition-colors duration-300" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 bg-gray-800/50 border-gray-700 focus:border-green-500 text-white"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        required
                      />
                      <div className="absolute inset-0 rounded-md border border-green-400/0 group-focus-within:border-green-400/50 pointer-events-none transition-colors duration-300"></div>
                    </div>
                  </motion.div>

                  <motion.div variants={formVariants} custom={1} className="space-y-2">
                    <Label className="text-gray-300">Account Type</Label>
                    <Tabs
                      defaultValue="client"
                      className="w-full"
                      onValueChange={(value) => updateFormData("accountType", value)}
                    >
                      <TabsList className="grid w-full grid-cols-2 bg-gray-800 p-1">
                        <TabsTrigger 
                          value="client"
                          className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 data-[state=active]:shadow-sm"
                        >
                          I want to rent tools
                        </TabsTrigger>
                        <TabsTrigger 
                          value="partner"
                          className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 data-[state=active]:shadow-sm"
                        >
                          I want to list tools
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="client" className="p-4 border border-gray-700 rounded-md mt-2 bg-gray-800/50 text-gray-300">
                        <p className="text-sm text-gray-400">
                          As a client, you can browse and rent tools from partners in your area.
                        </p>
                      </TabsContent>
                      <TabsContent value="partner" className="p-4 border border-gray-700 rounded-md mt-2 bg-gray-800/50 text-gray-300">
                        <p className="text-sm text-gray-400">
                          As a partner, you can list your tools for rent and earn money.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </motion.div>

                  <motion.div variants={formVariants} custom={2} className="space-y-2">
                    <Label htmlFor="city" className="text-gray-300">City</Label>
                    <select
                      id="city"
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-white"
                      value={formData.city_id}
                      onChange={(e) => updateFormData("city_id", e.target.value)}
                      required
                    >
                      <option value="">Select your city</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id.toString()}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={formVariants} custom={3} className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone Number (optional)</Label>
                    <div className="relative group">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (123) 456-7890"
                        className="pl-3 bg-gray-800/50 border-gray-700 focus:border-green-500 text-white"
                        value={formData.phone_number}
                        onChange={(e) => updateFormData("phone_number", e.target.value)}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={formVariants} custom={4} className="space-y-2">
                    <Label htmlFor="address" className="text-gray-300">Address (optional)</Label>
                    <div className="relative group">
                      <Input
                        id="address"
                        type="text"
                        placeholder="123 Main St, City, State"
                        className="pl-3 bg-gray-800/50 border-gray-700 focus:border-green-500 text-white"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={formVariants} custom={2} className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-white relative overflow-hidden group font-medium"
                    >
                      <span className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                      <span className="relative flex items-center justify-center">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {formStep === 2 && (
                <motion.div initial="hidden" animate="visible" className="space-y-5">
                  <motion.div variants={formVariants} custom={0} className="p-5 border rounded-md border-green-500/30 bg-green-500/10">
                    <h3 className="font-medium text-green-400">Account Summary</h3>
                    <div className="mt-3 space-y-2 text-sm">
                      <p className="flex justify-between">
                        <span className="text-gray-400">Name:</span> 
                        <span className="text-white font-medium">{formData.name}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Email:</span> 
                        <span className="text-white font-medium">{formData.email}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-400">Account Type:</span>
                        <span className="text-white font-medium">
                          {formData.accountType === "client" ? "Client (Renting Tools)" : "Partner (Listing Tools)"}
                        </span>
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={formVariants} custom={1} className="flex items-center space-x-2">
                    <Checkbox id="terms" required className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500" />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-400 leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="#" className="text-green-400 hover:text-green-300 underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-green-400 hover:text-green-300 underline">
                        privacy policy
                      </Link>
                    </label>
                  </motion.div>

                  <motion.div variants={formVariants} custom={2} className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 text-white relative overflow-hidden group font-medium"
                      disabled={isLoading}
                    >
                      <span className="absolute inset-0 w-0 h-full bg-white/20 group-hover:w-full transition-all duration-500 ease-out rounded-md"></span>
                      <span className="relative flex items-center justify-center">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </form>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8 }} 
              className="mt-8"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full bg-gray-800/40 border-gray-700 text-gray-300 hover:bg-gray-700/60 hover:text-white transition-all duration-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 mr-2 transition-transform group-hover:scale-110">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full bg-gray-800/40 border-gray-700 text-gray-300 hover:bg-blue-800/20 hover:text-blue-400 hover:border-blue-700/50 transition-all duration-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 mr-2 transition-transform group-hover:scale-110">
                    <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z" />
                    <path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 text-center text-sm text-gray-400"
            >
              Already have an account?{" "}
              <Link href="/auth/signin" className="font-medium text-green-400 hover:text-green-300 transition-colors duration-300">
                Sign in
              </Link>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function AuthLogo() {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center transform transition-all duration-500 shadow-lg shadow-green-600/30 group-hover:shadow-green-500/50 group-hover:scale-105">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/0 to-green-600/0 opacity-0 group-hover:from-green-400/20 group-hover:to-green-600/40 transition-all duration-500"></div>
        
        {/* Inner circular highlight */}
        <div className="absolute inset-1.5 rounded-full bg-gradient-to-tl from-green-400/0 to-white/10 opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        {/* Icon */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-white relative z-10 group-hover:rotate-12 transform transition-transform duration-500"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
      </div>
      
      {/* Light points */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 border-2 border-gray-800 shadow-lg animate-pulse-slow">
        <span className="absolute inset-0 rounded-full bg-yellow-300 opacity-0 group-hover:opacity-60 group-hover:animate-ping blur-sm transition-opacity duration-300"></span>
      </div>
      
      <div className="absolute -top-0.5 -left-0.5 w-3 h-3 rounded-full bg-gradient-to-br from-green-300 to-green-400 border border-gray-800/30 opacity-80 shadow-md">
        <span className="absolute inset-0 rounded-full bg-green-300 opacity-0 group-hover:opacity-60 animate-ping blur-sm transition-opacity duration-300 delay-150"></span>
      </div>
    </div>
  )
}
