'use client';

import { addSubject } from "@/firebase/firestore";

import React, { useState } from "react";

const dashboard = () => {
	const [branch, setBranch] = useState("");
	const [semester, setSemester] = useState(0);
	const [subjectName, setSubjectName] = useState("");
	const [subjectCode, setSubjectCode] = useState("");
	const [credits, setCredits] = useState(0);

	const handleAddSubject = async () => {
		if (
			!branch ||
			!semester ||
			!subjectName ||
			!subjectCode ||
			credits <= 0
		) {
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
		<div style={{ padding: "20px" }}>
			<h1>Admin Dashboard</h1>
			<div>
				<label>
					Branch:
					<select
						value={branch}
						onChange={(e) => setBranch(e.target.value)}>
						<option value="">Select Branch</option>
						<option value="CSE">CSE</option>
						<option value="AIML">AI & ML</option>
						{/* Add more branches */}
					</select>
				</label>
			</div>
			<div>
				<label>
					Semester:
					<select
						value={semester}
						onChange={(e) => setSemester(parseInt(e.target.value))}>
						<option value="">Select Semester</option>
						<option value="1">1</option>
						<option value="2">2</option>
						{/* Add more semesters */}
					</select>
				</label>
			</div>
			<div>
				<label>
					Subject Name:
					<input
						type="text"
						value={subjectName}
						onChange={(e) => setSubjectName(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<label>
					Subject Code:
					<input
						type="text"
						value={subjectCode}
						onChange={(e) => setSubjectCode(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<label>
					Credits:
					<input
						type="number"
						value={credits}
						onChange={(e) => setCredits(Number(e.target.value))}
					/>
				</label>
			</div>
			<button onClick={handleAddSubject}>Add Subject</button>
		</div>
	);
};

export default dashboard;
