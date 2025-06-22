import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostJob from "./pages/PostJob";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";
import Navbar from "./components/Navbar";
import TestAddJob from "./pages/TestAddJob";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/test-add" element={<TestAddJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

