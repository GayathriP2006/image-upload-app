import { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  const uploadImage = async () => {
    if (!image) {
      setMessage("❌ Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      setUploadedImages((prev) => [
        ...prev,
        {
          id: Date.now(),
          url: res.data.imageUrl,
          name: image.name,
          uploadedAt: new Date().toLocaleString(),
        },
      ]);

      setMessage("✅ Image Uploaded Successfully!");

      setImage(null);
      setPreview("");
    } catch (error) {
      console.log(error);
      setMessage("❌ Upload Failed");
    }
  };

  const deleteImage = (id) => {
    setUploadedImages(
      uploadedImages.filter((img) => img.id !== id)
    );
  };

  const clearAllImages = () => {
    setUploadedImages([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "800px",
          padding: "30px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1>📸 Image Upload App</h1>

        <p>
          Upload and manage images using React, Node.js,
          Express and Multer
        </p>

        <h3>Total Images: {uploadedImages.length}</h3>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {image && (
          <p style={{ marginTop: "15px" }}>
            Selected File: <b>{image.name}</b>
          </p>
        )}

        {preview && (
          <div>
            <h3>Preview</h3>

            <img
              src={preview}
              alt="Preview"
              style={{
                width: "300px",
                borderRadius: "10px",
              }}
            />
          </div>
        )}

        <br />
<br/>
        <button
          onClick={uploadImage}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            marginRight: "10px",
          }}
        >
          Upload Image
        </button>

        <button
          onClick={clearAllImages}
          style={{
            background: "#ff9800",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Clear All
        </button>

        {message && (
          <h3 style={{ marginTop: "20px" }}>
            {message}
          </h3>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {uploadedImages.map((img) => (
            <div
              key={img.id}
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "15px",
                borderRadius: "15px",
              }}
            >
              <img
                src={img.url}
                alt={img.name}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                }}
              />

              <h4>{img.name}</h4>

              <p
                style={{
                  fontSize: "12px",
                }}
              >
                {img.uploadedAt}
              </p>

              <button
                onClick={() =>
                  deleteImage(img.id)
                }
                style={{
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
