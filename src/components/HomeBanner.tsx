import { MapPin, Shield, Star, TrendingUp } from "lucide-react"

export default function HomeBanner() {
  return (
    <section
      className="relative flex items-center min-h-[600px] w-full bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1500&q=80)'
      }}
    >
      {/* Gradient and dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/50" />
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">
        <div className="max-w-6xl w-full flex flex-col items-center text-center gap-8">
          
          {/* Main Content */}
          <div className="flex flex-col items-center gap-6">
            {/* Main Heading */}
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg">
              Find Your Dream Home
            </h1>
            
            {/* Subtitle */}
            <p className="text-white/90 text-xl md:text-2xl font-medium mb-6 drop-shadow max-w-3xl">
              Discover the perfect property with our expert agents and comprehensive listings
            </p>
          </div>
          
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="bg-blue-500/20 p-3 rounded-full w-fit mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Best Deals</h3>
              <p className="text-white/80 text-sm">Get the best prices and exclusive offers on premium properties</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="bg-green-500/20 p-3 rounded-full w-fit mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-300" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Trusted Agents</h3>
              <p className="text-white/80 text-sm">Work with verified and experienced real estate professionals</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="bg-purple-500/20 p-3 rounded-full w-fit mx-auto mb-4">
                <MapPin className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Prime Locations</h3>
              <p className="text-white/80 text-sm">Properties in the most desirable neighborhoods and areas</p>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-white text-3xl font-bold">500+</div>
              <div className="text-white/70 text-sm">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-white text-3xl font-bold">50+</div>
              <div className="text-white/70 text-sm">Expert Agents</div>
            </div>
            <div className="text-center">
              <div className="text-white text-3xl font-bold">1000+</div>
              <div className="text-white/70 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-white text-3xl font-bold">4.9</div>
              <div className="text-white/70 text-sm flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}