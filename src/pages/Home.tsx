import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  const [isChatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Top Banner */}
      <div className="bg-black/20 text-white text-center py-2 px-4 text-sm">
        <span className="mr-4">New Gartner® PeerInsights™ report for UCaaS</span>
        <button className="underline hover:no-underline">Get a copy →</button>
        <button className="absolute right-4 top-2 text-white hover:text-gray-300">×</button>
      </div>

      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-purple-600">dialpad</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button className="text-gray-700 hover:text-purple-600 font-medium">Products</button>
            <button className="text-gray-700 hover:text-purple-600 font-medium">Platform</button>
            <button className="text-gray-700 hover:text-purple-600 font-medium">Solutions</button>
            <button className="text-gray-700 hover:text-purple-600 font-medium">Learn</button>
            <button className="text-gray-700 hover:text-purple-600 font-medium">Pricing</button>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">🇺🇸</span>
                <button className="text-gray-600 hover:text-purple-600">Help ▼</button>
                <button className="text-gray-600 hover:text-purple-600">Call sales ▼</button>
                <button className="text-gray-600 hover:text-purple-600">Download ⬇</button>
                <Link to="/login" className="text-gray-600 hover:text-purple-600">Login</Link>
              </div>
            </div>
            <Button variant="outline" className="hidden md:block">Try free</Button>
            <Button variant="dialpad">Request a demo</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Elevate every conversation
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-purple-100 max-w-3xl mx-auto leading-relaxed">
            The AI-powered customer communications platform helping businesses
            intelligently connect, support, and sell.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button 
              variant="dialpad" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-purple-500 hover:bg-purple-600"
            >
              Request a demo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-purple-900"
            >
              Explore the platform
            </Button>
          </div>

          {/* Secondary Hero Section */}
          <div className="text-left max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your AI-powered customer communications solution
            </h2>
          </div>
        </div>
      </main>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen && (
          <Card className="w-80 h-96 mb-4 shadow-2xl border-0 bg-white rounded-2xl overflow-hidden animate-scale-in">
            <div className="bg-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-purple-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-blue-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-green-300 rounded-full border-2 border-white"></div>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <div className="p-4 h-full">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm">👋</span>
                  <span className="font-semibold">Welcome!</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your AI-powered workspace for team and customer conversations.
                </p>
                <p className="text-xs text-gray-400">
                  This chat may be recorded as described in our Privacy Policy.
                </p>
              </div>
              
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm transition-colors">
                  🆓 Sign up for free
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm transition-colors">
                  📅 Schedule a meeting
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm transition-colors">
                  📚 Free guides and templates
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm transition-colors">
                  💬 Chat with our AI Agent
                </button>
              </div>
            </div>
          </Card>
        )}
        
        <button
          onClick={() => setChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          {isChatOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Home;