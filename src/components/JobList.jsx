import JobCard from "./JobCard";
import PropTypes from "prop-types";

function JobList({ jobs }) {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

JobList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default JobList;
