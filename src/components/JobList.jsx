import JobCard from "./JobCard";
import PropTypes from "prop-types";
import "./JobList.css";

function JobList({ jobs, onDelete, onUpdate }) {
  return (
    <div className="jobList">
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
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default JobList;
