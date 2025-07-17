import React, { useState } from "react";

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploadedUrl(data.url);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Upload
      </button>

      {uploadedUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="w-40 h-40 object-contain"
          />
        </div>
      )}
    </div>
  );
}
