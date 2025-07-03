import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import { useState } from "react"

const tabs = [
  "Buy",
  "Rent",
  "Sell",
  "Mortgage",
  "My Home Value"
]

export default function HomeBanner() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section
      className="relative flex items-center min-h-[500px] w-full bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)'
      }}
    >
      {/* Gradient and dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full px-4 flex flex-col items-center text-center gap-4">
          {/* Optional icon/illustration */}
          <div className="flex justify-center mb-2">
            <Home className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Find the right home<br />at the right price
          </h1>
          {/* <p className="text-white/90 text-lg md:text-xl font-medium mb-2 drop-shadow">
            Discover your dream home with the best deals, locations, and agents.
          </p> */}
        </div>
        {/* Glassmorphism search card */}
        <div className=" bg-white/70 mt-12 backdrop-blur-md rounded-xl shadow-2xl p-6 flex flex-col gap-1 w-full max-w-2xl animate-fade-in">
          <div className="flex gap-1 mb-2">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-t-md font-semibold text-base focus:outline-none transition-all duration-200 ${
                  activeTab === idx
                    ? "bg-white shadow text-black scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-white/90 hover:text-black"
                }`}
                onClick={() => setActiveTab(idx)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          <form className="flex w-full">
            <input
              type="text"
              placeholder="City, Address, School, Agent, ZIP"
              className="flex-1 px-4 py-1 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-lg bg-white/80 placeholder-gray-500 transition-shadow duration-200 shadow-sm focus:shadow-lg"
            />
            <Button
              type="submit"
              className="rounded-l-none rounded-r-md px-6 flex items-center justify-center bg-red-500 hover:bg-red-600 transition-all duration-200 shadow-md"
              size="lg"
            >
              <Search className="w-6 h-6 text-white" />
            </Button>
          
          </form>
        </div>
      </div>
    </section>
  )
}

// Optional: Add fade-in animation
// In your index.css or a global CSS file, add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.8s cubic-bezier(.4,0,.2,1) both; }
