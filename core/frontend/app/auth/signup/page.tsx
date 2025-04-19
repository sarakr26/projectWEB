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

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "client",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formStep < 2) {
      setFormStep(formStep + 1)
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    // Handle sign up logic here
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-100 rounded-full opacity-50 blur-3xl"></div>
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
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200 rounded-full opacity-30 blur-3xl"
        ></motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <Link href="/" className="flex items-center gap-2">
                <Logo />
                <span className="text-2xl font-bold text-green-600">ToolNest</span>
              </Link>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
              <p className="text-gray-500 text-center mb-6">Join ToolNest to start renting or listing tools</p>
            </motion.div>

            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Step {formStep + 1} of 3</span>
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
                        formStep >= step ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {formStep > step ? <CheckCircle2 className="h-5 w-5" /> : step + 1}
                    </div>
                    <div className="text-xs mt-1 text-gray-500">
                      {step === 0 ? "Account" : step === 1 ? "Profile" : "Finish"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {formStep === 0 && (
                <motion.div initial="hidden" animate="visible" className="space-y-4">
                  <motion.div variants={formVariants} custom={0} className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={formVariants} custom={1} className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => updateFormData("password", e.target.value)}
                        required
                      />
                    </div>
                    <div className="text-xs text-gray-500">Password must be at least 8 characters long</div>
                  </motion.div>

                  <motion.div variants={formVariants} custom={2}>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white mt-2">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {formStep === 1 && (
                <motion.div initial="hidden" animate="visible" className="space-y-4">
                  <motion.div variants={formVariants} custom={0} className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={formVariants} custom={1} className="space-y-2">
                    <Label>Account Type</Label>
                    <Tabs
                      defaultValue="client"
                      className="w-full"
                      onValueChange={(value) => updateFormData("accountType", value)}
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="client">I want to rent tools</TabsTrigger>
                        <TabsTrigger value="partner">I want to list tools</TabsTrigger>
                      </TabsList>
                      <TabsContent value="client" className="p-4 border rounded-md mt-2">
                        <p className="text-sm text-gray-500">
                          As a client, you can browse and rent tools from partners in your area.
                        </p>
                      </TabsContent>
                      <TabsContent value="partner" className="p-4 border rounded-md mt-2">
                        <p className="text-sm text-gray-500">
                          As a partner, you can list your tools for rent and earn money.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </motion.div>

                  <motion.div variants={formVariants} custom={2}>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white mt-2">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {formStep === 2 && (
                <motion.div initial="hidden" animate="visible" className="space-y-4">
                  <motion.div variants={formVariants} custom={0} className="p-4 border rounded-md bg-green-50">
                    <h3 className="font-medium text-green-800">Account Summary</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <span className="text-gray-500">Name:</span> {formData.name}
                      </p>
                      <p>
                        <span className="text-gray-500">Email:</span> {formData.email}
                      </p>
                      <p>
                        <span className="text-gray-500">Account Type:</span>{" "}
                        {formData.accountType === "client" ? "Client (Renting Tools)" : "Partner (Listing Tools)"}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={formVariants} custom={1} className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="#" className="text-green-600 hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-green-600 hover:underline">
                        privacy policy
                      </Link>
                    </label>
                  </motion.div>

                  <motion.div variants={formVariants} custom={2}>
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </form>

            {formStep === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                </div>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center text-sm text-gray-500"
            >
              Already have an account?{" "}
              <Link href="/auth/signin" className="font-medium text-green-600 hover:underline">
                Sign in
              </Link>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Logo() {
  return (
    <div className="relative w-8 h-8">
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
