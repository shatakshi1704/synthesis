import React from "react";

function Team() {
  return (
    <div className="container py-5 mb-5">
      <div className="row justify-content-center">
        {/* Section Header */}
        <div className="col-12 text-center mb-5">
          <h2 className="display-5 fw-bold" style={{ color: "#541A1A" }}>The Founder</h2>
          <div style={{ width: "60px", height: "4px", backgroundColor: "#810B38", margin: "20px auto" }}></div>
        </div>

        {/* Profile Card */}
        <div className="col-lg-8">
          <div className="p-5 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "24px", border: "1px solid #F1E2D1" }}>
            <div className="row align-items-center">
              
              {/* Profile Image - UPDATE THE SRC PATH BELOW */}
              <div className="col-md-4 text-center mb-4 mb-md-0">
                <div style={{ 
                  width: "180px", 
                  height: "180px", 
                  borderRadius: "50%", 
                  backgroundColor: "#DCC3AA", 
                  margin: "0 auto",
                  overflow: "hidden",
                  border: "4px solid #F1E2D1"
                }}>
                  {/* INSERT YOUR PHOTO PATH HERE */}
                  <img 
                    src="media/images/myphoto.png" 
                    alt="Shatakshi Sinha" 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              </div>

              {/* Bio Details */}
              <div className="col-md-8">
                <h3 className="fw-bold mb-2" style={{ color: "#541A1A" }}>Shatakshi Sinha</h3>
                <h5 className="mb-4" style={{ color: "#810B38" }}>NSUT</h5>
                
                <p style={{ color: "#541A1A", lineHeight: "1.7", fontSize: "1.1rem" }}>
                  Electrical Engineering student at NSUT with a deep focus on building scalable software systems. 
                  Synthesis is my commitment to making financial markets more accessible through clean code and 
                  honest infrastructure. 
                </p>

                <div className="d-flex gap-3 mt-4">
                  <a href="https://www.linkedin.com/in/shatakshisinha17/" style={{ color: "#810B38", textDecoration: "none", fontWeight: "600" }}>LinkedIn</a>
                  <a href="https://github.com/shatakshi1704" style={{ color: "#810B38", textDecoration: "none", fontWeight: "600" }}>GitHub</a>
                  <a href="#" style={{ color: "#810B38", textDecoration: "none", fontWeight: "600" }}>Portfolio</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;