import JobCard from "./JobCard";
import PropTypes from "prop-types";

function JobList({ jobs, onDelete, onUpdate }) {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

JobList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired, // Add this
  onUpdate: PropTypes.func.isRequired, // Add this
};

export default JobList;
