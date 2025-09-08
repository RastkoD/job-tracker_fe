import { useState } from "react";
import "./AddJobForm.css";
import { toast } from "react-toastify";

function EditJobModal({ job, onSave, onClose }) {
  const [position, setPosition] = useState(job.position || "");
  const [company, setCompany] = useState(job.company || "");
  const [status, setStatus] = useState(job.status || "");
  const [notes, setNotes] = useState(job.notes || "");
  const [applied_date, setAppliedDate] = useState(job.applied_date || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedJob = {
      id: job.id,
      position,
      company,
      status,
      notes,
      applied_date,
    };

    await onSave(updatedJob);
    toast.success("Job updated successfully!");
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2>Edit Job</h2>
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
            type="date"
            id="appliedDate"
            value={applied_date}
            onChange={(e) => setAppliedDate(e.target.value)}
            placeholder="Applied On"
          />
          <button className="addJobFormBtn" type="submit">
            Save
          </button>
          <button className="addJobFormBtn" type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJobModal;
