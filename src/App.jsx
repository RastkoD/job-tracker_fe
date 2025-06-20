import React from "react";
import { useState, useEffect } from "react";
import JobList from "./components/JobList";
import AddJobForm from "./components/AddJobForm";
import { getJobs } from "./API/api";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>Job Tracker</h1>
      <AddJobForm />
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;
