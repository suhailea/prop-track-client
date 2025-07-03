"use client";

import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Gift, Home, Building2, Percent } from "lucide-react";
import { motion } from "framer-motion";

const mockOffers = [
  {
    id: 1,
    title: "5% Off on New Listings",
    description: "Get a 5% discount on all new properties listed this month.",
    icon: "Home",
    bg: "bg-blue-50",
    iconColor: "bg-blue-100 text-blue-600",
    discount: "5%",
    tag: "New Listing",
  },
  {
    id: 2,
    title: "No Brokerage Fee",
    description: "Pay zero brokerage on select premium apartments.",
    icon: "Building2",
    bg: "bg-green-50",
    iconColor: "bg-green-100 text-green-600",
    discount: "0%",
    tag: "Premium",
  },
  {
    id: 3,
    title: "Special Festive Offer",
    description: "Avail exclusive festive discounts on family homes.",
    icon: "Percent",
    bg: "bg-yellow-50",
    iconColor: "bg-yellow-100 text-yellow-600",
    discount: "Up to 10%",
    tag: "Festive",
  },
];

const iconMap = {
  Home,
  Building2,
  Percent,
};

export function Offers() {
  return (
    <section className="w-full max-w-5xl  px-4 py-2">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Your Property Offers & Benefits</h2>
      <div
        className="flex gap-2 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {mockOffers.map((offer) => {
          const Icon = iconMap[offer.icon as keyof typeof iconMap] || Home;
          return (
            <motion.div
              key={offer.id}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 snap-start w-[320px] max-w-xs"
            >
              <div className={`flex flex-col gap-3 items-start rounded-2xl shadow-md px-6 py-5 ${offer.bg} relative h-full`}> 
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full ${offer.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {offer.tag}
                  </span>
                </div>
                <div className="flex-1 w-full">
                  <div className="font-semibold text-lg text-gray-900 dark:text-white mb-1 truncate">
                    {offer.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-300 mb-2 truncate">
                    {offer.description}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {offer.discount}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-2 cursor-pointer flex items-center justify-center bg-gray-200 rounded-full p-2">
                          <Gift className="w-5 h-5 text-primary/40" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={5} className="bg-gray-800 text-white">
                        Claim Offer
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
