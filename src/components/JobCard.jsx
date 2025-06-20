function JobCard({ job }) {
  return (
    <div key={job.id}>
      <h3>{job.position}</h3>
      <h4>{job.company}</h4>
      <p>Status: {job.status}</p>
      <p>Notes: {job.notes}</p>
      <p>Applied on: {new Date(job.applied_date).toLocaleDateString()}</p>
    </div>
  );
}

export default JobCard;
