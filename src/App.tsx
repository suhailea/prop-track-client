import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/layouts/AppLayout";
import { Clients } from "./routes/Clients";
import PropertyList from "./components/PropertyList";
import Schedules from "./components/schedules/Schedules";
import PropertySearch from "./components/PropertySearch";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/find-property" element={<PropertySearch />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
