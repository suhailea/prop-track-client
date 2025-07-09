"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Car, Settings, Wrench } from "lucide-react";

export function HeroBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full relative bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-900 dark:to-blue-900 rounded-2xl p-4 sm:p-6 md:p-8 text-white overflow-hidden border border-purple-200 dark:border-gray-800 shadow"
    >
      <div className="relative z-10 flex flex-col items-start">
        <p className="text-xs sm:text-sm font-medium opacity-90 mb-1 sm:mb-2">
          PREMIUM GARAGE SERVICES
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 max-w-full sm:max-w-md">
          Find the Best Garage Services for Your Vehicle
        </h1>
        <div className="w-full flex justify-start">
          <Button className="w-full sm:w-auto bg-black hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-300 text-white dark:text-gray-900 rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base">
            Book Service
            <Wrench className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Animated Garage Icons */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-20">
        <div className="w-32 h-32 border-2 border-white rounded-full flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-white rounded-full"></div>
        </div>
      </div>

      {/* Floating Garage Tools */}
      <motion.div
        className="absolute top-4 right-20 opacity-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <Wrench className="w-8 h-8 text-white" />
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-32 opacity-30"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <Car className="w-8 h-8 text-white" />
      </motion.div>

      <motion.div
        className="absolute top-12 right-40 opacity-30"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      >
        <Settings className="w-6 h-6 text-white" />
      </motion.div>
    </motion.div>
  )
}
