import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import {
  MapPin,
  Clock,
  Home,
  DollarSign,
  User,
  Phone,
  Mail,
  Info,
  CheckCircle,
  StickyNote,
  Edit,
  Check,
  X,
  Eye,
  CalendarDays,
  ListChecks,
} from "lucide-react";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}
function formatLongDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Mock data for today and this week
const today = new Date();
const weekDates: string[] = [];
const day = today.getDate();
const startOfWeek = new Date(today);
startOfWeek.setDate(day - today.getDay()); // Sunday
for (let i = 0; i < 7; i++) {
  const d = new Date(startOfWeek);
  d.setDate(startOfWeek.getDate() + i);
  weekDates.push(formatDate(d));
}

const mockSchedules = [
  {
    date: formatDate(today),
    property: "Modern Downtown Condo",
    address: "123 Main St, Downtown",
    time: "10:00 AM",
    type: "Sale",
    price: "$450,000",
    status: "Scheduled",
    client: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
    },
    notes: "Client interested in quick closing",
  },
  {
    date: formatDate(today),
    property: "Family Home with Garden",
    address: "456 Oak Avenue, Suburbs",
    time: "2:30 PM",
    type: "Rent",
    price: "$2,800/month",
    status: "Completed",
    client: {
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      email: "sarah.j@email.com",
    },
    notes: "Client wants to negotiate rent",
  },
  // Add more for other days if needed
];

const statusBadge = {
  Scheduled: "bg-blue-50 text-blue-700 border border-blue-200",
  Completed: "bg-green-50 text-green-700 border border-green-200",
};
const statusIcon = {
  Scheduled: Info,
  Completed: CheckCircle,
};

const Schedules = () => {
  const [selected, setSelected] = useState(() => new Date());
  const selectedDate = formatDate(selected);
  const schedules = mockSchedules.filter((s) => s.date === selectedDate);

  return (
    <div className="flex min-h-screen bg-[#f7f8fa]">
      {/* Left Panel */}
      <div className="w-[400px] p-10 flex flex-col items-center bg-white border-r min-h-screen">
        <div className="flex items-center gap-2 w-full mb-2">
          <CalendarDays className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold">Schedule Viewer</h2>
        </div>
        <p className="text-gray-500 mb-8 w-full">Select a date to view scheduled property viewings</p>
        <div className="mb-8">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => { if (date) setSelected(date); }}
            required={false}
          />
        </div>
      </div>
      {/* Right Panel */}
      <div className="flex-1 p-10">
        <div className="mb-8 flex items-center gap-3">
          <ListChecks className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-bold">
            {formatLongDate(selected)}
          </h3>
          <span className="text-gray-500 text-lg">
            {schedules.length} viewing{schedules.length !== 1 && "s"} scheduled
          </span>
        </div>
        <div className="space-y-6">
          {schedules.length === 0 ? (
            <div className="text-gray-400 text-lg mt-20 flex items-center gap-2"><Info className="w-5 h-5" />No viewings scheduled for this day.</div>
          ) : (
            schedules.map((s, i) => {
              const StatusIcon = statusIcon[s.status as keyof typeof statusIcon];
              return (
                <div key={i} className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col gap-4 relative">
                  {/* Status badge */}
                  <div className="absolute top-6 right-6">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge[s.status as keyof typeof statusBadge]}`}>
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {s.status}
                    </span>
                  </div>
                  {/* Property Title & Address */}
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-bold flex items-center gap-2"><Home className="w-5 h-5 text-blue-400" />{s.property}</span>
                    <div className="flex items-center text-sm gap-1">
                      <MapPin className="w-4 h-4 mr-1 text-blue-300" />
                      {s.address}
                    </div>
                  </div>
                  {/* Time, Type, Price, Client */}
                  <div className="flex flex-wrap items-center gap-8 mt-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>{s.time}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded">
                      {s.type === "Sale" ? <DollarSign className="w-4 h-4 text-blue-400" /> : <Home className="w-4 h-4 text-blue-400" />}
                      <span>{s.type} - {s.price}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto px-3 py-1 rounded">
                      <User className="w-4 h-4 text-blue-400" />
                      <span>{s.client.name}</span>
                      <Phone className="w-4 h-4 ml-4 text-blue-400" />
                      <span>{s.client.phone}</span>
                      <Mail className="w-4 h-4 ml-4 text-blue-400" />
                      <span>{s.client.email}</span>
                    </div>
                  </div>
                  {/* Notes */}
                  <div className="mt-2 rounded p-3 border border-blue-100">
                    <div className="text-xs font-semibold mb-1 flex items-center gap-1"><StickyNote className="w-4 h-4 text-blue-400" />Notes</div>
                    <div className="text-sm">{s.notes}</div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4 flex-wrap">
                    <button className="px-4 py-2 rounded border border-blue-200 bg-white hover:bg-blue-50 font-medium text-sm flex items-center gap-2"><Edit className="w-4 h-4 text-blue-400" />Edit Viewing</button>
                    <button className="px-4 py-2 rounded border border-green-200 bg-white hover:bg-green-50 font-medium text-sm flex items-center gap-2"><Check className="w-4 h-4 text-green-500" />Mark Complete</button>
                    <button className="px-4 py-2 rounded border border-red-200 bg-white hover:bg-red-50 font-medium text-sm flex items-center gap-2"><X className="w-4 h-4 text-red-500" />Cancel</button>
                    <button className="px-4 py-2 rounded border border-gray-200 bg-white hover:bg-gray-100 font-medium text-sm flex items-center gap-2"><Eye className="w-4 h-4 text-gray-500" />View Property</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedules;
