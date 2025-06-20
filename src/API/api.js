const API_URL = "http://localhost:3000/api/jobs";

export async function getJobs() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return await res.json();
}

export async function createJob(job) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  if (!res.ok) throw new Error("Failed to create job");
  return await res.json();
}
