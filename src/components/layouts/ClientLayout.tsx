import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  CreditCard,
  Plus,
  RefreshCcw,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  // Static data
  const leaveData = {
    used: 17.5,
    total: 30.0,
    allowance: 30,
    rollover: 15,
    accrued: 2.5,
    usedDays: 0,
    balance: 17.5,
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
              <User className="size-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Clients</h1>
              <p className="text-gray-500">Manage your clients</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="size-4" />
              Add Client
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200 flex w-full justify-end items-center">
          <div className="px-4 py-3 flex items-center gap-8">
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                <CreditCard className="size-5 text-green-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-green-700">
                  Allowance
                </span>
                <span className="text-lg font-bold text-green-800">
                  {leaveData.allowance}
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                <RefreshCcw className="size-5 text-purple-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-purple-700">
                  Rollover
                </span>
                <span className="text-lg font-bold text-purple-800">
                  {leaveData.rollover}
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                <Briefcase className="size-5 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-blue-700">
                  Accrued
                </span>
                <span className="text-lg font-bold text-blue-800">
                  {leaveData.accrued}
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                <CheckCircle className="size-5 text-gray-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-600">Used</span>
                <span className="text-lg font-bold text-gray-700">
                  {leaveData.usedDays}
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3 group">
              <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                <AlertCircle className="size-5 text-red-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-red-700">
                  Balance
                </span>
                <span className="text-lg font-bold text-red-800">
                  {leaveData.balance}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1 overflow-hidden flex items-stretch">
          <div className="overflow-hidden p-3 flex-1">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientLayout;
