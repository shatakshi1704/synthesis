import React from "react";

function CreateTicket() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 p-5" style={{ backgroundColor: "#FAFAFA", borderRadius: "20px" }}>
          <h2 className="mb-4" style={{ color: "#541A1A" }}>Open a Support Ticket</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <select className="form-select">
                <option>General Inquiry</option>
                <option>Report a Bug</option>
                <option>Feature Request</option>
                <option>Account Issue</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows="5" placeholder="Tell us what's happening..."></textarea>
            </div>
            <button type="submit" className="btn px-4" style={{ backgroundColor: "#810B38", color: "#fff" }}>
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;