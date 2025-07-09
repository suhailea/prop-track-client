import { motion } from "framer-motion";
import * as React from "react";
import {
  Home,
  Users,
  Wrench,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Stat cards data for property management
const stats = [
  {
    label: "Properties",
    value: "24",
    icon: <Home className="w-5 h-5 text-blue-500" />,
    color: "bg-blue-50",
    bar: "bg-blue-400",
    percent: 0.8,
  },
  {
    label: "Tenants",
    value: "15",
    icon: <Users className="w-5 h-5 text-green-500" />,
    color: "bg-green-50",
    bar: "bg-green-400",
    percent: 0.6,
  },
  {
    label: "Maintenance",
    value: "5",
    icon: <Wrench className="w-5 h-5 text-yellow-500" />,
    color: "bg-yellow-50",
    bar: "bg-yellow-400",
    percent: 0.2,
  },
  {
    label: "Visits",
    value: "8",
    icon: <CalendarCheck className="w-5 h-5 text-purple-500" />,
    color: "bg-purple-50",
    bar: "bg-purple-400",
    percent: 0.4,
  },
];

// Week days and dates
const week = [
  { day: "Sun", date: 10 },
  { day: "Mon", date: 11 },
  { day: "Tue", date: 12 },
  { day: "Wed", date: 13 },
  { day: "Thu", date: 14 },
  { day: "Fri", date: 15 },
  { day: "Sat", date: 16 },
];

// Property-related events for the week
const weekEvents = [
  [
    { time: "10:00 AM", title: "Property Viewing", property: "Sunset Villa" },
    { time: "2:00 PM", title: "Tenant Meeting", property: "Green Heights" },
  ],
  [
    { time: "11:00 AM", title: "Maintenance Check", property: "Downtown Loft" },
  ],
  [
    { time: "9:00 AM", title: "Lease Signing", property: "Blue Apartments" },
    { time: "4:00 PM", title: "Property Visit", property: "Lakeview House" },
  ],
  [
    { time: "1:00 PM", title: "Inspection", property: "Green Villa" },
  ],
  [
    { time: "3:00 PM", title: "New Tenant Move-in", property: "Sunset Villa" },
  ],
  [
    { time: "10:00 AM", title: "Maintenance Request", property: "Downtown Loft" },
  ],
  [
    { time: "2:00 PM", title: "Property Viewing", property: "Blue Apartments" },
  ],
];

// Activity log data for admin actions
const activities = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Admin John",
    action: "Approved new tenant for Green Heights",
    time: "2hrs ago",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Admin Lisa",
    action: "Scheduled maintenance for Downtown Loft",
    time: "Just now",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Admin Mike",
    action: "Added new property: Lakeview House",
    time: "4hrs ago",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    name: "Admin Steve",
    action: "Updated lease for Blue Apartments",
    time: "5hrs ago",
  },
];

export function Schedules() {
  const [selectedDay, setSelectedDay] = React.useState(3); // Wednesday

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="space-y-6"
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-2 bg-white dark:bg-gray-900 p-4 dark:border-gray-800">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col border border-gray-200 p-5">
            <div className="flex items-center gap-2">
              <div className={`rounded-lg p-2 ${stat.color}`}>{stat.icon}</div>
              <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">
                {stat.label}
              </span>
            </div>
            <div className="flex items-end justify-between mt-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </span>
              <div className="flex-1 ml-2">
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${stat.bar}`}
                    style={{ width: `${stat.percent * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Date Picker & Events */}
      <div className="bg-white dark:bg-gray-900  border border-gray-200 dark:border-gray-800 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-2">
          <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <span className="font-medium text-gray-700 dark:text-gray-200">This Week</span>
          <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="flex justify-between w-full gap-2 mb-4">
          {week.map((d, i) => (
            <button
              key={d.date}
              onClick={() => setSelectedDay(i)}
              className={`flex flex-col items-center px-2 py-1 rounded-lg transition-all
                ${selectedDay === i ? "bg-blue-600 text-white shadow" : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"}
              `}
            >
              <span className="text-xs font-medium mb-1">{d.day}</span>
              <span className="text-base font-semibold">{d.date}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Activity Log */}
      <div className="bg-white dark:bg-gray-900 p-4 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">Admin Activity Log</div>
          <button className="text-blue-500 text-sm font-medium hover:underline">View All</button>
        </div>
        <ul className="space-y-4">
          {activities.map((act, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <img
                src={act.avatar}
                alt={act.name}
                className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-800"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-white text-sm">{act.name}</div>
                <div className="text-xs text-gray-400 mt-0.5 truncate">{act.action}</div>
              </div>
              <div className="text-xs text-gray-400 min-w-[60px] text-right">{act.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
