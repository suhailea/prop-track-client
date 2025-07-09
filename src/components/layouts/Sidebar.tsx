import { Home, Users, Building2, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Properties",
    url: "/properties",
    icon: Building2,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Schedules",
    url: "/schedules",
    icon: Clock,
  },
  {
    title: "Find Property",
    url: "/find-property",
    icon: Building2,
  },
];

export function AppSidebar() {
  const location = useLocation();
  return (
    <aside className="h-screen w-56 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col py-6 px-3 shadow-sm">
      <div className="mb-6 text-xs tracking-widest uppercase text-gray-400 dark:text-gray-500 px-2">Application</div>
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <Link
              key={item.title}
              to={item.url}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors
                ${isActive ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}
              `}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
