import { useState } from "react";
import { createJob, getJobs } from "../API/api";
import "./AddJobForm.css";
import { toast } from "react-toastify";

function AddJobForm({ onClose, setJobs }) {
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

      const updatedJobs = await getJobs();
      setJobs(updatedJobs);

      setPosition("");
      setCompany("");
      setStatus("Applied");
      setNotes("");
      setApplied_date("");

      toast.success("Job added successfully!");
      onClose();
    } catch (err) {
      toast.error("Error submitting job: " + err.message);
    }
  };

  return (
    <form className="addJobForm" onSubmit={handleSubmit}>
      <h2>Add Job</h2>
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
        <option value="Ghosted">Ghosted</option>
        <option value="Withdrawn">Withdrawn</option>
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
        className="datePicker"
        type="date"
        id="appliedDate"
        value={applied_date}
        onChange={(e) => setApplied_date(e.target.value)}
        placeholder="Applied On"
      />
      <div className="loginButtons">
        <button className="addJobBtn" type="submit">
          Submit
        </button>
        <button className="addJobBtn" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddJobForm;
