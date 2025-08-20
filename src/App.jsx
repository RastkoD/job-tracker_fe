import React from "react";
import { useState, useEffect } from "react";
import JobList from "./components/JobList";
import AddJobForm from "./components/AddJobForm";
import EditJobModal from "./components/EditJobModal";
import { deleteJob, getJobs, updateJob } from "./API/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  async function handleDelete(id) {
    await deleteJob(id);

    setJobs(jobs.filter((job) => job.id !== id));
  }

  async function handleUpdate(updatedJob) {
    const data = await updateJob(updatedJob.id, updatedJob);

    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === data.id ? data : job))
    );
  }

  function handleEditClick(job) {
    setEditingJob(job);
  }

  function handleCloseModal() {
    setEditingJob(null);
  }

  return (
    <div className="app">
      <h1>Job Tracker</h1>
      <AddJobForm />
      <JobList jobs={jobs} onDelete={handleDelete} onUpdate={handleEditClick} />
      {editingJob && (
        <EditJobModal
          job={editingJob}
          onSave={handleUpdate}
          onClose={handleCloseModal}
        />
      )}
      <ToastContainer autoClose={2500} />
    </div>
  );
}

export default App;
