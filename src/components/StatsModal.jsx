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

  const percent = (count) =>
    jobStats.total ? Math.round((count / jobStats.total) * 100) : 0;

  return (
    <div className="statsContainer">
      <h2>Total: {jobStats.total}</h2>
      <ul>
        <li>
          Applied: {jobStats.Applied || 0} ({percent(jobStats.Applied || 0)}%)
        </li>
        <li>
          Rejected: {jobStats.Rejected || 0} ({percent(jobStats.Rejected || 0)}
          %)
        </li>
        <li>
          Ghosted: {jobStats.Ghosted || 0} ({percent(jobStats.Ghosted || 0)}%)
        </li>
        <li>
          Withdrawn: {jobStats.Withdrawn || 0} (
          {percent(jobStats.Withdrawn || 0)}%)
        </li>
      </ul>
      <button className="addJobFormBtn" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

StatsModal.propTypes = {
  jobs: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StatsModal;
