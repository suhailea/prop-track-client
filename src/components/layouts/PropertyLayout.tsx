import { useUser } from "@/hooks/useUser";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle,
  DollarSign,
  Home,
  Plus,
  Wrench,
} from "lucide-react";
import CreateProperty from "../CreatePropert";
import { Button } from "../ui/button";

const PropertyLayout = ({
  children,
  handleReset,
}: {
  children: React.ReactNode;
  handleReset: () => void;
}) => {
  const user = useUser();

  // Property management stats for admin
  const propertyStats = {
    total: 120,
    rented: 85,
    vacant: 25,
    maintenance: 10,
    revenue: "$120,000",
  };

  // Client-specific stats
  const clientStats = {
    myProperties: 3,
    activeLeases: 2,
    upcomingPayments: 1,
    supportTickets: 0,
    totalPaid: "$24,000",
  };

  return (
    <div className="size-full flex flex-col overflow-hidden">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="px-6 py-4 flex justify-between items-center !pb-0">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded">
              <Home className="size-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Properties
              </h1>
              <p className="text-gray-500">Manage your properties</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            {user.role === "admin" && (
              <CreateProperty data={null}>
                <Button
                  variant="secondary"
                  className="hidden md:inline-flex"
                  onClick={handleReset}
                >
                  <Plus className="w-4 h-4" />
                  Add Properties
                </Button>
              </CreateProperty>
            )}
          </div>
        </div>

        <div className="border-b border-gray-200 flex w-full justify-end items-center">
          <div className="px-4 py-3 flex items-center gap-8">
            {user.role === "admin" ? (
              <>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <Home className="size-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-blue-700">
                      Total Properties
                    </span>
                    <span className="text-lg font-bold text-blue-800">
                      {propertyStats.total}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                    <CheckCircle className="size-5 text-green-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-green-700">
                      Rented
                    </span>
                    <span className="text-lg font-bold text-green-800">
                      {propertyStats.rented}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-yellow-50 group-hover:bg-yellow-100 transition-colors">
                    <Briefcase className="size-5 text-yellow-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-yellow-700">
                      Vacant
                    </span>
                    <span className="text-lg font-bold text-yellow-800">
                      {propertyStats.vacant}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                    <Wrench className="size-5 text-purple-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-purple-700">
                      Maintenance
                    </span>
                    <span className="text-lg font-bold text-purple-800">
                      {propertyStats.maintenance}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    <DollarSign className="size-5 text-gray-700" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-600">
                      Revenue
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {propertyStats.revenue}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <Home className="size-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-blue-700">
                      My Properties
                    </span>
                    <span className="text-lg font-bold text-blue-800">
                      {clientStats.myProperties}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                    <CheckCircle className="size-5 text-green-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-green-700">
                      Active Leases
                    </span>
                    <span className="text-lg font-bold text-green-800">
                      {clientStats.activeLeases}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-yellow-50 group-hover:bg-yellow-100 transition-colors">
                    <DollarSign className="size-5 text-yellow-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-yellow-700">
                      Upcoming Payments
                    </span>
                    <span className="text-lg font-bold text-yellow-800">
                      {clientStats.upcomingPayments}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                    <Wrench className="size-5 text-purple-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-purple-700">
                      Support Tickets
                    </span>
                    <span className="text-lg font-bold text-purple-800">
                      {clientStats.supportTickets}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    <DollarSign className="size-5 text-gray-700" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-600">
                      Total Paid
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {clientStats.totalPaid}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
      <motion.div
        // Animate the main content area, it should be animate from right to left
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1 overflow-hidden flex items-stretch">
          <div className="overflow-hidden p-3 flex-1">
            <div className="max-w-7xl mx-auto">
              {/* Main Content Area */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyLayout;
