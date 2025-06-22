// src/pages/TestAddJob.jsx
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function TestAddJob() {
  const addSampleJob = async () => {
    try {
      await addDoc(collection(db, "jobs"), {
        title: "React Developer",
        company: "OpenAI",
        location: "Remote",
        type: "Full Time",
        description: "Build advanced UIs using React and animations.",
        postedAt: new Date().toISOString()
      });
      alert("Sample job added!");
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add Sample Job</h2>
      <button onClick={addSampleJob} style={{ padding: "1rem", fontSize: "1rem", borderRadius: "8px", background: "#4e54c8", color: "white" }}>
        Add Sample Job
      </button>
    </div>
  );
}
