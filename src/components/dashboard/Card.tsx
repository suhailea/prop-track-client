import { motion } from "framer-motion";
import { CheckCircle, Home, Users } from "lucide-react";

const iconMap = {
  Home,
  CheckCircle,
  Users,
};

export function UiCard() {
  // Property management static data
  const cards = [
    {
      id: 1,
      title: "Properties Listed",
      value: 24,
      icon: "Home",
      sub: "+3 this month",
      subColor: "text-green-500",
      iconColor: "bg-blue-100",
      bg: "bg-blue-50",
    },
    {
      id: 2,
      title: "Properties Sold",
      value: 7,
      icon: "CheckCircle",
      sub: "+1 this week",
      subColor: "text-green-500",
      iconColor: "bg-green-100",
      bg: "bg-green-50",
    },
    {
      id: 3,
      title: "Active Tenants",
      value: 15,
      icon: "Users",
      sub: "-2 this month",
      subColor: "text-red-500",
      iconColor: "bg-yellow-100",
      bg: "bg-yellow-50",
    },
    // {
    //   id: 4,
    //   title: "Pending Requests",
    //   value: 3,
    //   icon: "Home",
    //   sub: "2 new this week",
    //   subColor: "text-blue-500",
    //   iconColor: "bg-purple-100",
    //   bg: "bg-purple-50",
    // },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="py-4"
    >
      {/* Horizontal scrollable list with snapping */}
      <div
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {cards.map((card) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap] || Home;
          return (
            <motion.div
              key={card.id}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 snap-start w-[226px] max-w-xs"
            >
              <div
                className={`flex items-center rounded-2xl shadow-sm px-4 py-3 ${card.bg} relative`}
              >
                <div
                  className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full ${card.iconColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 ml-2">
                  <div className="text-xs text-gray-400 dark:text-gray-300 truncate">
                    {card.title}
                  </div>
                  <div className="font-semibold text-base truncate dark:text-white">
                    {card.value}
                  </div>
                  <div className={`text-xs font-semibold ${card.subColor}`}>
                    {card.sub}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
