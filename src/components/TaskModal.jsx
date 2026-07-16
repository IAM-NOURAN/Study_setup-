import React, { useState } from "react";
import "../styles/to do tasks.css";

// Modal Component with local state for inputs
function TaskModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Send the data back to the parent component
    onSave(title, desc);

    // Reset local fields
    setTitle("");
    setDesc("");
  };

  return (
    <div className="custom-modal-backdrop d-flex align-items-center justify-content-center">
      <div className="custom-modal-content p-4">
        <h3 className="font-headline mb-3 text-dark-blue">Create Intellectual Task</h3>
        <form onSubmit={handleSubmit}>
          
          {/* Title Input */}
          <div className="mb-3">
            <label className="form-label text-uppercase small fw-bold">Objective Title</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Finalize Chapter 3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
          </div>

          {/* Description Input */}
          <div className="mb-3">
            <label className="form-label text-uppercase small fw-bold">Description / Context</label>
            <textarea 
              className="form-control" 
              rows="3"
              placeholder="Provide scholastic context..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>

          {/* Actions */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-dark-blue px-4 text-white" 
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Save Objective
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default TaskModal;