"use client";
import React, { useState } from "react";

interface SimpleFormProps {
  heading: string; // Dynamic heading
}

const Form: React.FC<SimpleFormProps> = ({ heading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!title ||  !file) {
      setMessage("Please fill all fields and attach a file.");
      return;
    }

    // Clear form and show success message
    setMessage("Form submitted successfully!");
    setTitle("");
    setDescription("");
    setFile(null);
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

      {/* File Input */}
      <div className="mb-4">
        <label htmlFor="file" className="block text-sm font-medium mb-2">
          Attach File
        </label>
        <input
          type="file"
          id="file"
          className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
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

export default Form;
