// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import JobCard from "../components/JobCard";
import { motion } from "framer-motion";
import jobsData from "../jobs.json";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ❌ इस लाइन को हटा दो:
  // setJobs(jobsData);

  const fetchJobs = async () => {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    const jobsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setJobs(jobsData);
    setFilteredJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term)
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="🔍 Search by title, company, or location"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="jobs-grid">
        {filteredJobs.map(job => (
          <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <JobCard job={job} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
