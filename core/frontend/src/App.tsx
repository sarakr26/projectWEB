"use client"

import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import HomePage from "./pages/HomePage"
import ToolDetailsPage from "./pages/ToolDetailsPage"
import SearchResultsPage from "./pages/SearchResultsPage"
import CategoryPage from "./pages/CategoryPage"
import ProfilePage from "./pages/ProfilePage"
import SavedToolsPage from "./pages/SavedToolsPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import DashboardPage from "./pages/DashboardPage"
import PartnerDashboardPage from "./pages/PartnerDashboardPage"
import CreateListingPage from "./pages/CreateListingPage"

// Create a client for React Query
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tools/:id" element={<ToolDetailsPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/profile/:id" element={<ProfilePage />} />
                  <Route path="/saved" element={<SavedToolsPage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/dashboard/*" element={<DashboardPage />} />
                  <Route path="/partner-upgrade" element={<PartnerDashboardPage />} />
                  <Route path="/partner-dashboard" element={<PartnerDashboardPage />} />
                  <Route path="/create-listing" element={<CreateListingPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
