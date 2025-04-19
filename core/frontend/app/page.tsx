import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Star, ArrowRight, Wrench, Home } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Rent tools, save money, help the planet
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                The smart way to <span className="text-green-600">borrow tools</span> in your neighborhood
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                ToolNest connects you with local tool owners. Rent the tools you need for your DIY projects at a
                fraction of the cost of buying.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Find Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  List Your Tools
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="People sharing tools"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-200 rounded-full z-0"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Find the perfect tool for your project</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="What tool do you need?" className="pl-10" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Your location" className="pl-10" />
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Search Tools</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Tools</h2>
            <p className="mt-4 text-xl text-gray-600">Popular tools available in your area</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Power Drill Pro",
                image: "/placeholder.svg?height=200&width=200",
                price: 12,
                rating: 4.8,
                location: "Seattle",
                premium: true,
              },
              {
                name: "Circular Saw",
                image: "/placeholder.svg?height=200&width=200",
                price: 15,
                rating: 4.6,
                location: "Portland",
                premium: false,
              },
              {
                name: "Pressure Washer",
                image: "/placeholder.svg?height=200&width=200",
                price: 25,
                rating: 4.9,
                location: "Bellevue",
                premium: false,
              },
              {
                name: "Lawn Mower",
                image: "/placeholder.svg?height=200&width=200",
                price: 18,
                rating: 4.7,
                location: "Tacoma",
                premium: true,
              },
            ].map((tool, i) => (
              <Card key={i} className="overflow-hidden transition-all hover:shadow-lg">
                {tool.premium && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full z-10">
                    FEATURED
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
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{tool.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{tool.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {tool.location}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="font-bold text-green-600">${tool.price}/day</div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How ToolNest Works</h2>
            <p className="mt-4 text-xl text-gray-600">Renting tools has never been easier</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Tools</h3>
              <p className="text-gray-600">Browse thousands of tools available in your neighborhood</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Pay</h3>
              <p className="text-gray-600">Reserve the tools you need for your project dates</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Wrench className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get to Work</h3>
              <p className="text-gray-600">Pick up your tools and complete your project</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose ToolNest?</h2>
            <p className="mt-4 text-xl text-gray-600">Benefits for both tool owners and renters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Home className="h-6 w-6 mr-2 text-green-600" />
                For Tool Owners
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p>Earn money from tools you already own</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p>Set your own availability and pricing</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p>Our insurance protects your tools</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p>Premium listings to boost visibility</p>
                </li>
              </ul>
              <Button className="mt-8 bg-green-600 hover:bg-green-700">Become a Partner</Button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Wrench className="h-6 w-6 mr-2 text-green-600" />
                For DIY Enthusiasts
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p>Save money by renting instead of buying</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p>Access high-quality tools for any project</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p>Delivery options available</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p>Verified partners and tool ratings</p>
                </li>
              </ul>
              <Button className="mt-8 bg-green-600 hover:bg-green-700">Find Tools</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600">
        <div className="max-w-5xl mx-auto text-center">
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
        </div>
      </section>
    </div>
  )
}
