import React from "react";

function Hero() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-lg-10 text-center">
          <h1 className="display-4 fw-bold mb-4" style={{ color: "#541A1A", letterSpacing: "-1.5px" }}>
            Engineered for clarity. <br />
            Built for modern markets.
          </h1>
        </div>
      </div>

      <div className="row g-4 mt-4">
        <div className="col-lg-6">
          <div className="p-5" style={{ backgroundColor: "#F1E2D1", borderRadius: "20px", height: "100%" }}>
            <h3 className="mb-4" style={{ color: "#541A1A" }}>The Origin</h3>
            <p style={{ color: "#541A1A", fontSize: "1.1rem", opacity: "0.8" }}>
              Synthesis wasn't built to be another trading terminal. It was built because we realized that current platforms are designed for distraction—not for decision-making. We wanted to strip away the noise and return to the fundamentals: clean data, low latency, and absolute user control.
            </p>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="p-5" style={{ border: "1px solid #DCC3AA", borderRadius: "20px", height: "100%" }}>
            <h3 className="mb-4" style={{ color: "#541A1A" }}>The Vision</h3>
            <p style={{ color: "#541A1A", fontSize: "1.1rem", opacity: "0.8" }}>
              We are building an ecosystem that treats the investor as a professional. Every feature, from our order routing to our portfolio analytics, is designed with one goal: to ensure you remain the architect of your own financial future. We are just the engine room.
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-5 py-5 text-center">
        <div className="col-lg-8 mx-auto">
          <p className="lead" style={{ color: "#810B38", fontWeight: "600" }}>
            "Our daily work is simple: refine the code, improve the execution, and build a platform that deserves your trust."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;