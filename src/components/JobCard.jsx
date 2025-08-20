import PropTypes from "prop-types";
import "./JobCard.css";
import { toast } from "react-toastify";

function JobCard({ job, onDelete, onUpdate }) {
  const onDeleteClick = (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;
    onDelete(jobId);
    toast.success("Job deleted successfully!");
  };

  return (
    <div className="jobCard" key={job.id}>
      <div>
        <h3>{job.position}</h3>
        <h4>{job.company}</h4>
        <p>Status: {job.status}</p>
        <p className="jobCardNotes" title={job.notes}>
          Notes: {job.notes}
        </p>
        <p>Applied on: {new Date(job.applied_date).toLocaleDateString()}</p>
      </div>
      <div className="jobCardBtns">
        <button className="jobCardBtn" onClick={() => onUpdate(job)}>
          edit
        </button>
        <button className="jobCardBtn" onClick={() => onDeleteClick(job.id)}>
          delete
        </button>
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
