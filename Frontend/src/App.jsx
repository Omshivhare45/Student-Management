// App.jsx

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Attendance from "./components/Attendance/Attendance";
import Students from "./components/shared/Student";
import Marks from "./components/Marks/Marks";


function App() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ marginLeft: "220px", flex: 1, minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/students" element={<Students />} />
          <Route path="/marks" element={<Marks />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;