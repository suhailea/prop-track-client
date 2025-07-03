import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layouts/Navbar";
import HomeBanner from "./components/HomeBanner";
import { Offers } from "./components/Offers";
import PropertyList from "./components/PropertyList";
import UpcomingSchedules from "./components/UpcomingSchedules";
import Rent from "./routes/Rent";
import Sell from "./routes/Sell";
import Dashboard from "./components/Dashboard";
import { useUser } from "./hooks/useUser";

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

              <div className="container max-w-7xl  px-4">
                <div className="flex gap-4 items-start w-full p-5">
                  <div>
                    <Offers />
                    <PropertyList />
                  </div>
                  <UpcomingSchedules />
                </div>
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
