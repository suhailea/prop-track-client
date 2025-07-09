import { UiCard } from "./Card";
import MonthlySummary from "./MonthlySummary";
import { Schedules } from "./Schedules";
import { UserProfile } from "./UserProfile";

export default function Dashboard() {
  const isLoading = false; // Replace with actual loading state logic

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
        <p className="text-gray-900 dark:text-gray-100 mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-gray-900 ">
      <div className="container mx-auto">
        <div className="flex items-start space-x-2">
          <div>
            <UserProfile />
            <UiCard />
            {/* <div className="flex space-x-2"> */}
              <MonthlySummary />
            {/* </div> */}
            {/* <MonthlyPointsChart /> */}
          </div>

          <div className="lg:w-80 shadow-lg">
            <Schedules />
          </div>
        </div>
      </div>
    </div>
  );
}
