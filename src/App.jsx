import React, { useState, useEffect } from "react";
import JobList from "./components/JobList";
import AddJobForm from "./components/AddJobForm";
import EditJobModal from "./components/EditJobModal";
import LoginForm from "./components/LoginForm";
import StatsModal from "./components/StatsModal";
import { deleteJob, getJobs, updateJob } from "./API/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginType, setLoginType] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (loginType === "real") {
      getJobs()
        .then(setJobs)
        .catch((err) => console.error("Fetch error:", err));
    } else if (loginType === "demo") {
      fetch("/demoJobs.json")
        .then((res) => res.json())
        .then(setJobs)
        .catch((err) => console.error("Demo fetch error:", err));
    }
  }, [isAuthenticated, loginType]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setLoginType("real");
  };

  const handleDemoLogin = () => {
    setIsAuthenticated(true);
    setLoginType("demo");
  };

  function handleLogout() {
    setIsAuthenticated(false);
    setLoginType(null);
    setJobs([]);
    setIsAddModalOpen(false);
    setIsStatsModalOpen(false);
    setEditingJob(null);
  }

  async function handleDelete(id) {
    await deleteJob(id);
    setJobs((prev) => prev.filter((job) => job.id !== id));
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

  const filteredJobs = jobs.filter((job) =>
    job.company.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} onDemoLogin={handleDemoLogin} />;
  }

  return (
    <div className="app">
      <h1>Job Tracker</h1>
      <div>
        <button onClick={handleLogout} className="addJobBtn">
          Logout
        </button>
      </div>
      {loginType !== "real" && (
        <button className="addJobBtn" onClick={() => setIsStatsModalOpen(true)}>
          Stats
        </button>
      )}
      {loginType !== "demo" && (
        <button className="addJobBtn" onClick={() => setIsAddModalOpen(true)}>
          Add New Job
        </button>
      )}

      <input
        className="searchInput"
        type="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by company..."
      ></input>

      {isStatsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <StatsModal
              jobs={jobs}
              onClose={() => setIsStatsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <AddJobForm
              onClose={() => setIsAddModalOpen(false)}
              setJobs={setJobs}
            />
          </div>
        </div>
      )}

      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={handleCloseModal}
          onSave={handleUpdate}
        />
      )}

      <JobList
        jobs={filteredJobs}
        onDelete={handleDelete}
        onUpdate={handleEditClick}
        readOnly={loginType === "demo"}
      />

      <ToastContainer />
    </div>
  );
}

export default App;
