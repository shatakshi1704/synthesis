// Update your CreateTicket.jsx component to connect with the backend
import React, { useState } from "react";

function CreateTicket() {
  const [subject, setSubject] = useState("General Inquiry");
  const [description, setDescription] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setStatusMessage("Please enter a description.");
      return;
    }

    setLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch("https://synthesis-backend.onrender.com/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, description })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit ticket");

      setStatusMessage("Ticket submitted and saved to database successfully!");
      setDescription("");
      setSubject("General Inquiry");
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 p-5" style={{ backgroundColor: "#FAFAFA", borderRadius: "20px" }}>
          <h2 className="mb-4" style={{ color: "#541A1A" }}>Open a Support Ticket</h2>
          {statusMessage && (
            <div className="alert mb-4" style={{ backgroundColor: "#EADBC8", color: "#541A1A", borderRadius: "8px", fontSize: "13px" }}>
              {statusMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <select className="form-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option>General Inquiry</option>
                <option>Report a Bug</option>
                <option>Feature Request</option>
                <option>Account Issue</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea 
                className="form-control" 
                rows="5" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Tell us what's happening..."
              ></textarea>
            </div>
            <button type="submit" disabled={loading} className="btn px-4" style={{ backgroundColor: "#810B38", color: "#fff" }}>
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;