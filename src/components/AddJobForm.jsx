import { useState } from "react";
import { createJob } from "../API/api";

function AddJobForm() {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [applied_date, setApplied_date] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createJob({
        position,
        company,
        status,
        notes,
        applied_date,
      });

      setPosition("");
      setCompany("");
      setStatus("");
      setNotes("");
      setApplied_date("");
      console.log("Job added successfully!");
    } catch (err) {
      console.error("Error submiting job:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add A Job</h2>
      <label className="sr-only" htmlFor="position">
        Position:
      </label>
      <input
        type="text"
        id="position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        placeholder="Position"
        required
      ></input>
      <label className="sr-only" htmlFor="position">
        Company:
      </label>
      <input
        type="text"
        id="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
        required
      ></input>
      <label className="sr-only" htmlFor="status">
        Status:
      </label>
      <select
        name="status"
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Applied">Applied</option>
        <option value="No Reply">No Reply</option>
        <option value="Ghosted">Ghosted</option>
        <option value="Rejected">Rejected</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
      </select>
      <label className="sr-only" htmlFor="notes">
        Notes:
      </label>
      <textarea
        name="notes"
        id="notes"
        rows={4}
        cols={40}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
      <label className="sr-only" htmlFor="appliedDate">
        Applied On:
      </label>
      <input
        type="date"
        id="appliedDate"
        value={applied_date}
        onChange={(e) => setApplied_date(e.target.value)}
        placeholder="Applied On"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddJobForm;
