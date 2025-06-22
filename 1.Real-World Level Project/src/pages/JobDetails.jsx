// pages/JobDetails.jsx
import { useParams } from "react-router-dom";
import { db, auth, storage } from "../firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const user = auth.currentUser;

  const fetchJob = async () => {
    const docRef = doc(db, "jobs", id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setJob(snap.data());
    }
    setLoading(false);
  };

  useState(() => {
    fetchJob();
  }, []);

  const handleApply = async () => {
    if (!user || !resume) return alert("Login and upload resume first");

    // Upload resume
    const storageRef = ref(storage, `resumes/${user.uid}/${resume.name}`);
    await uploadBytes(storageRef, resume);
    const resumeUrl = await getDownloadURL(storageRef);

    // Save application
    await addDoc(collection(db, "applications"), {
      jobId: id,
      userId: user.uid,
      resumeUrl,
      status: "Applied",
      appliedAt: serverTimestamp(),
    });

    alert("Application submitted!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>

      <input type="file" onChange={(e) => setResume(e.target.files[0])} />
      <button onClick={handleApply}>Apply Now</button>
    </div>
  );
}
