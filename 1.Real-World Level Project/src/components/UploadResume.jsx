// components/UploadResume.jsx
import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";

export default function UploadResume({ user }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (!file) return;

    const fileRef = ref(storage, `resumes/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  return (
    <motion.div
      className="upload-box"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Upload Your Resume</h2>
      <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {progress > 0 && progress < 100 && <p>Progress: {progress}%</p>}
      {url && (
        <p>
          ✅ Uploaded: <a href={url} target="_blank" rel="noreferrer">View Resume</a>
        </p>
      )}
    </motion.div>
  );
}
