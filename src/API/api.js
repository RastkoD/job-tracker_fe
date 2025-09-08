const API_URL = "https://job-tracker-be.onrender.com/api/jobs";

export async function getJobs() {
  const res = await fetch(API_URL);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Failed to fetch jobs");
  return data;
}

export async function createJob(job) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-password": import.meta.env.VITE_APP_PASSWORD,
    },
    body: JSON.stringify(job),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Failed to create job");
  return data;
}

export async function deleteJob(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-app-password": import.meta.env.VITE_APP_PASSWORD,
    },
  });

  if (!res.ok) throw new Error("Failed to delete job");
  return;
}

export const updateJob = async (id, updatedJob) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-app-password": import.meta.env.VITE_APP_PASSWORD,
    },
    body: JSON.stringify(updatedJob),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Failed to update job");

  return data;
};
