import Navbar from "./Navbar";
import { AppSidebar } from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen min-w-screen flex w-full">
      <AppSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Navbar spans the full width of the screen */}
        <Navbar />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
