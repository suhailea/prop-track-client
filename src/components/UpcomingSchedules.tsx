import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Clock, User, Building2, Calendar as CalendarIcon } from "lucide-react";
import { useApi } from "@/hooks/useApi";

// Interface for the new viewing/schedule data structure
interface Client {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface ViewingSchedule {
  id: string;
  clientId: string;
  propertyId: string;
  status: string;
  notes: string;
  viewingDate: string;
  createdAt: string;
  updatedAt: string;
  client: Client;
}



export default function UpcomingSchedules() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [schedules, setSchedules] = useState<ViewingSchedule[]>([]);
  const { makeRequest, data } = useApi();

  // Fetch schedules when date changes
  useEffect(() => {
    const fetchSchedules = async () => {
      if (date) {
        try {
          await makeRequest("/api/inquiry/schedules", {
            method: "POST",
            body: { date: new Date(date).toISOString() },
          });
        } catch (error) {
          console.error("Failed to fetch schedules:", error);
        }
      }
    };

    fetchSchedules();
  }, [date, makeRequest]);

  // Update schedules when data is received
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setSchedules(data);
    }
  }, [data]);

  // Filter schedules for the selected date
  const filteredSchedules = schedules.filter((schedule) => {
    if (!date) return false;
    const viewingDate = new Date(schedule.viewingDate);
    return (
      viewingDate.getFullYear() === date.getFullYear() &&
      viewingDate.getMonth() === date.getMonth() &&
      viewingDate.getDate() === date.getDate()
    );
  });

  // Helper function to format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section className=" rounded-xl p-6 w-[320px] max-w-md  mt-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-700 mb-1">
        Upcoming Schedules
      </h2>
      <p className="text-gray-500 mb-6 text-sm">
        Here is the list of your upcoming property visits or agent meetings for
        the selected date
      </p>
      <div className="bg-white rounded-lg p-4 mb-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border  w-full"
        />
      </div>
      {filteredSchedules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          {/* Modern illustration (SVG) */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="mb-4"
          >
            <rect x="20" y="30" width="80" height="60" rx="8" fill="#F3F4F6" />
            <circle cx="60" cy="60" r="18" fill="#E0E7FF" />
            <rect x="54" y="50" width="12" height="24" rx="6" fill="#6366F1" />
            <circle cx="60" cy="80" r="4" fill="#6366F1" />
          </svg>
          <div className="text-center">
            <div className="font-semibold text-gray-700 text-base mb-1">
              No schedules for the date
            </div>
            <div className="text-gray-500 text-sm">
              You have no property visits or meetings for the selected date. Try
              another date.
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden"
              style={{ minWidth: "220px", maxWidth: "260px" }}
            >
              {/* Colored left border based on status */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(schedule.status)}`}
              ></div>

              {/* Icon and type */}
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Building2 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-sm text-blue-600">
                    Property Viewing
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(schedule.viewingDate)}</span>
                  </div>
                </div>
                {/* Status badge */}
                <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                  schedule.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                  schedule.status === 'completed' ? 'bg-green-100 text-green-700' :
                  schedule.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {schedule.status}
                </span>
              </div>

              {/* Client Information */}
              <div className="flex items-center gap-2 mb-2">
                <User className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-600 truncate">
                  {schedule.client.fullName}
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">
                    Date: <span className="font-medium text-gray-700">
                      {new Date(schedule.viewingDate).toLocaleDateString()}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">
                    Email: <span className="font-medium text-gray-700">
                      {schedule.client.email}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">
                    Phone: <span className="font-medium text-gray-700">
                      {schedule.client.phone}
                    </span>
                  </span>
                </div>
              </div>

              {/* Notes */}
              {schedule.notes && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Notes: <span className="font-medium text-gray-700">{schedule.notes}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
