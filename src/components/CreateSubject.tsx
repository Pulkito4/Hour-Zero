import React, { useState } from 'react'
import { addSubject } from "@/firebase/firestore";

const CreateSubject = () => {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState(0);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [credits, setCredits] = useState(0);

  const handleAddSubject = async () => {
    if (!branch || !semester || !subjectName || !subjectCode || credits <= 0) {
      alert("Please fill all fields.");
      return;
    }

    await addSubject(branch, semester, subjectName, {
      subjectCode,
      credits,
    });

    alert(`Subject ${subjectName} added successfully!`);
  };

  return (
    <div className="space-y-6 text-white">
     
      
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Branch:</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded-md"
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="AIML">AI & ML</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(parseInt(e.target.value))}
            className="w-full p-2 bg-gray-800 rounded-md"
          >
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Subject Name:</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Subject Code:</label>
          <input
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Credits:</label>
          <input
            type="number"
            value={credits}
            onChange={(e) => setCredits(Number(e.target.value))}
            className="w-full p-2 bg-gray-800 rounded-md"
          />
        </div>

        <button
          onClick={handleAddSubject}
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Add Subject
        </button>
      </div>
    </div>
  );
}

export default CreateSubject;