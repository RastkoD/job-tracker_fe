import React from "react";
import { useState, useEffect } from "react";
import JobList from "./components/JobList";
import AddJobForm from "./components/AddJobForm";
import { deleteJob, getJobs } from "./API/api";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  async function handleDelete(id) {
    await deleteJob(id);

    setJobs(jobs.filter((job) => job.id !== id));
  }

  return (
    <div>
      <h1>Job Tracker</h1>
      <AddJobForm />
      <JobList jobs={jobs} onDelete={handleDelete} />
    </div>
  );
}

export default App;
