"use client";
import React, { useState } from "react";

interface UrlFormProps {
  heading: string; // Dynamic heading
}

const UrlForm: React.FC<UrlFormProps> = ({ heading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!title || !description || !url) {
      setMessage("Please fill all fields, including a valid URL.");
      return;
    }

    // URL validation
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    if (!urlRegex.test(url)) {
      setMessage("Please enter a valid URL.");
      return;
    }

    // Clear form and show success message
    setMessage("Form submitted successfully!");
    setTitle("");
    setDescription("");
    setUrl("");
  };

  return (
    <form
      className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      {/* Dynamic Heading */}
      <h2 className="text-xl font-bold mb-4">{heading}</h2>

      {/* Title Input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full p-2 border border-gray-600 rounded bg-gray-900"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-2 border border-gray-600 rounded bg-gray-900"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        ></textarea>
      </div>

      {/* URL Input */}
      <div className="mb-4">
        <label htmlFor="url" className="block text-sm font-medium mb-2">
          Attach URL
        </label>
        <input
          type="url"
          id="url"
          className="w-full p-2 border border-gray-600 rounded bg-gray-900"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-purple-600 rounded hover:bg-purple-700 transition"
      >
        Submit
      </button>

      {/* Message */}
      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
};

export default UrlForm;
