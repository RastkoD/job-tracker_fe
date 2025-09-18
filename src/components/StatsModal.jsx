import PropTypes from "prop-types";
import "./StatsModal.css";

function StatsModal({ jobs, onClose }) {
  const jobStats = jobs.reduce(
    (acc, job) => {
      acc.total++;
      if (job.status) {
        acc[job.status] = (acc[job.status] || 0) + 1;
      }
      return acc;
    },
    { total: 0 }
  );

  return (
    <div className="statsContainer">
      <h2>Total: {jobStats.total}</h2>
      <p>Applied: {jobStats.Applied || 0}</p>
      <p>Rejected: {jobStats.Rejected || 0}</p>
      <p>Ghosted: {jobStats.Ghosted || 0}</p>
      <p>Withdrawn: {jobStats.Withdrawn || 0}</p>
      <button className="addJobFormBtn" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

StatsModal.PropTypes = {
  jobs: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StatsModal;
