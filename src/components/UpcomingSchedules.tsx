import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

// Mock data for upcoming schedules
const mockSchedules = [
  {
    id: 1,
    date: new Date(), // Today's date
    time: "10:00 AM",
    location: "123 Main St, Springfield",
    agent: "Alice Johnson",
    client: "John Doe",
    type: "Property Visit",
  },
  {
    id: 2,
    date: new Date(), // June 20, 2024
    time: "2:30 PM",
    location: "456 Oak Ave, Springfield",
    agent: "Bob Smith",
    client: "Jane Smith",
    type: "Agent Meeting",
  },
  {
    id: 3,
    date: new Date(), // June 21, 2024
    time: "11:00 AM",
    location: "789 Pine Rd, Springfield",
    agent: "Carol Lee",
    client: "Mike Brown",
    type: "Property Visit",
  },
];

export default function UpcomingSchedules() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  // Filter schedules for the selected date
  const schedules = mockSchedules.filter(
    (s) =>
      date &&
      s.date.getFullYear() === date.getFullYear() &&
      s.date.getMonth() === date.getMonth() &&
      s.date.getDate() === date.getDate()
  );

  return (
    <section className=" rounded-xl p-6 w-[320px] max-w-md  mt-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-700 mb-1">Upcoming Schedules</h2>
      <p className="text-gray-500 mb-6 text-sm">
        Here is the list of your upcoming property visits or agent meetings for the selected date
      </p>
      <div className="bg-white rounded-lg p-4 mb-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border  w-full"
        />
      </div>
      {schedules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          {/* Modern illustration (SVG) */}
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mb-4">
            <rect x="20" y="30" width="80" height="60" rx="8" fill="#F3F4F6" />
            <circle cx="60" cy="60" r="18" fill="#E0E7FF" />
            <rect x="54" y="50" width="12" height="24" rx="6" fill="#6366F1" />
            <circle cx="60" cy="80" r="4" fill="#6366F1" />
          </svg>
          <div className="text-center">
            <div className="font-semibold text-gray-700 text-base mb-1">No schedules for the date</div>
            <div className="text-gray-500 text-sm">You have no property visits or meetings for the selected date. Try another date.</div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {schedules.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col gap-0.5 shadow-sm max-w-xs "
              style={{ minWidth: '220px', maxWidth: '260px' }}
            >
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-semibold text-indigo-500 text-sm">{s.type}</span>
                <span className="text-xs text-gray-400">{s.time}</span>
              </div>
              <div className="text-gray-600 text-xs truncate">Location: <span className="font-medium text-gray-700">{s.location}</span></div>
              <div className="flex justify-between text-gray-500 text-xs mt-0.5">
                <span>Agent: <span className="text-gray-700 font-medium">{s.agent}</span></span>
                <span>Client: <span className="text-gray-700 font-medium">{s.client}</span></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
