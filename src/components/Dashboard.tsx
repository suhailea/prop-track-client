import React from "react";

const mockStats = {
  sales: 24,
  revenue: 125000,
  pendingRent: 7,
  clientsInQueue: 4,
  monthlySummary: [
    { month: "Jan", value: 8000 },
    { month: "Feb", value: 12000 },
    { month: "Mar", value: 15000 },
    { month: "Apr", value: 11000 },
    { month: "May", value: 17000 },
    { month: "Jun", value: 21000 },
    { month: "Jul", value: 18000 },
    { month: "Aug", value: 22000 },
    { month: "Sep", value: 19500 },
    { month: "Oct", value: 24000 },
    { month: "Nov", value: 20000 },
    { month: "Dec", value: 25000 },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-green-600">{mockStats.sales}</span>
          <span className="text-gray-500 mt-2">Total Sales</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-600">${mockStats.revenue.toLocaleString()}</span>
          <span className="text-gray-500 mt-2">Total Revenue</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-yellow-600">{mockStats.pendingRent}</span>
          <span className="text-gray-500 mt-2">Pending Rent</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold text-purple-600">{mockStats.clientsInQueue}</span>
          <span className="text-gray-500 mt-2">Clients in Queue</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
        {/* Chart placeholder */}
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
          <span className="text-gray-400">[Monthly Summary Chart Here]</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
