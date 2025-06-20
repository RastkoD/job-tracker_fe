import JobCard from "./JobCard";

function JobList({ jobs }) {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
