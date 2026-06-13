import React from "react";

function FAQ() {
  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center" style={{ color: "#541A1A" }}>Frequently Asked</h3>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="accordion">
            <div className="p-3 border-bottom"><strong>How do I report a bug?</strong><br/>Use the ticket form above.</div>
            <div className="p-3 border-bottom"><strong>Is my data secure?</strong><br/>Yes, we use industry-standard encryption for all data.</div>
            <div className="p-3 border-bottom"><strong>How often is Synthesis updated?</strong><br/>We push updates daily. Check the System Status page.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FAQ;