// components/Navbar.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
      className="nav"
    >
      <Link to="/" className="logo">JobPortal</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/post-job">Post Job</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/test-add">➕ Add Job (Dev)</Link>
      </div>
    </motion.nav>
    
  );
}
