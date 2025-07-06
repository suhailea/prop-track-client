import Navbar from "@/components/layouts/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HomeBanner from "./components/HomeBanner";
import PropertyList from "./components/PropertyList";
import UpcomingSchedules from "./components/UpcomingSchedules";
import { useUser } from "./hooks/useUser";
import Rent from "./routes/Rent";
import Sell from "./routes/Sell";
import CreateProperty from "./components/CreatePropert";

function App() {
  const user = useUser();

  return (
    <BrowserRouter>
      <Navbar role={user.role} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {user.role === "admin" || user.role === "agent" ? (
                <Dashboard />
              ) : (
                <HomeBanner />
              )}

              <div className="w-full px-4">
                <div className="max-w-7xl mx-auto flex justify-between gap-4 items-start w-full p-5">
                  <div className="basis-[70%] max-w-[70%]">
                    <PropertyList />
                  </div>
                  <div className="basis-[30%] max-w-[30%] ml-3">
                    <UpcomingSchedules />
                  </div>
                </div>
                <CreateProperty />
              </div>
            </>
          }
        />
        <Route path="/rent" element={<Rent />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
