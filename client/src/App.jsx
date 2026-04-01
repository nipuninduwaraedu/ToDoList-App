import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Navbar search={search} setSearch={setSearch} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard search={search} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;