// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import UploadResume from "../components/UploadResume";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>User Dashboard</h1>
      {user ? <UploadResume user={user} /> : <p>Please login to upload resume.</p>}
    </div>
  );
}
