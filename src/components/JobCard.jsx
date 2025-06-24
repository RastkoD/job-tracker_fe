import PropTypes from "prop-types";

function JobCard({ job, onDelete }) {
  const onDeleteClick = (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");

    if (!confirm) return;

    onDelete(jobId);
  };

  return (
    <div key={job.id}>
      <div>
        <h3>{job.position}</h3>
        <h4>{job.company}</h4>
        <p>Status: {job.status}</p>
        <p>Notes: {job.notes}</p>
        <p>Applied on: {new Date(job.applied_date).toLocaleDateString()}</p>
      </div>
      <div>
        <button>✍️</button>
        <button onClick={() => onDeleteClick(job.id)}>🗑️</button>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    status: PropTypes.string,
    notes: PropTypes.string,
    applied_date: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
  }),
};

export default JobCard;
