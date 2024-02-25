"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Rent = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const initialFormState = {
    title: "",
    userId: userId,
  };

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [success, setSuccess] = useState(false);
  const [urls, setUrls] = useState([]); // Move urls state to a higher scope

  const handleFileChange = (e) => {
    setFiles((prevFiles) => [...prevFiles, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/s3-upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log(data);
        console.log(data.success);
        if (data.success === true) {
          setSuccess(true);
        }

        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUrls(uploadedUrls); // Set urls state with the uploaded URLs
      console.log(urls); // Array of uploaded image URLs
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const sendToApi = async () => {
        console.log("wyslane do add api");
        const imageUrls = urls;

        const saveResponse = await fetch("/api/add", {
          method: "POST",
          body: JSON.stringify({ imageUrls }),
        });

        const saveData = await saveResponse.json();
      };

      sendToApi();
    }
  }, [success, urls]);

  return (
    <>
      <h1>Upload Files to S3 Bucket</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
        />
        <label>
          Tytuł
          <input type="text" id="title" name="title"></input>
        </label>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </>
  );
};

export default Rent;
