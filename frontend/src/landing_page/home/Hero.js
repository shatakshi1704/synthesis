import React from "react";

function Hero() {
  return (
    <div className="container text-center mt-5 mb-5 pb-5 position-relative overflow-visible">
      <style>
        {`
          @keyframes float-slow {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes float-medium {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(-1deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes float-fast {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          @keyframes slideInUp {
            0% { opacity: 0; transform: translateY(50px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes drawMarketLine {
            0% { stroke-dashoffset: 300; }
            100% { stroke-dashoffset: 0; }
          }

          .hero-graphic-container {
            position: relative;
            height: 320px;
            width: 100%;
            max-width: 500px;
            margin: 0 auto 2rem auto;
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1000px;
          }

          /* Back Left Card (Tan) */
          .ui-card-back {
            position: absolute;
            left: 10%;
            bottom: 10%;
            width: 160px;
            height: 120px;
            background-color: #F1E2D1;
            border: 1px solid #DCC3AA;
            border-radius: 12px;
            box-shadow: -10px 10px 20px rgba(0,0,0,0.02);
            animation: slideInUp 0.8s ease-out forwards, float-slow 5s ease-in-out infinite 0.8s;
            z-index: 1;
          }

          /* Top Right Card (Dark Brown) */
          .ui-card-side {
            position: absolute;
            right: 15%;
            top: 15%;
            width: 140px;
            height: 140px;
            background-color: #541A1A;
            border-radius: 12px;
            box-shadow: 15px 15px 30px rgba(84, 26, 26, 0.15);
            animation: slideInUp 0.9s ease-out forwards 0.1s, float-medium 4s ease-in-out infinite 1s;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Main Center Card (White & Burgundy) */
          .ui-card-main {
            position: relative;
            width: 240px;
            height: 180px;
            background-color: #FFFFFF;
            border-radius: 16px;
            box-shadow: 0px 20px 40px rgba(129, 11, 56, 0.1);
            border-top: 4px solid #810B38;
            animation: slideInUp 1s ease-out forwards 0.2s, float-fast 6s ease-in-out infinite 1.2s;
            z-index: 3;
            display: flex;
            flex-direction: column;
            padding: 20px;
            justify-content: flex-end;
          }

          /* Data bars inside the side card */
          .mini-bar {
            width: 12px;
            background-color: #DCC3AA;
            border-radius: 2px;
            margin: 0 4px;
            display: inline-block;
          }

          .animate-fade-1 { animation: fadeIn 0.8s ease-out 0.4s forwards; opacity: 0; }
          .animate-fade-2 { animation: fadeIn 0.8s ease-out 0.6s forwards; opacity: 0; }
          .animate-fade-3 { animation: fadeIn 0.8s ease-out 0.8s forwards; opacity: 0; }
        `}
      </style>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          

          <div className="hero-graphic-container">

            <div className="ui-card-back"></div>
            

            <div className="ui-card-side">
              <div className="mini-bar" style={{ height: "40%" }}></div>
              <div className="mini-bar" style={{ height: "70%" }}></div>
              <div className="mini-bar" style={{ height: "50%", backgroundColor: "#F1E2D1" }}></div>
              <div className="mini-bar" style={{ height: "90%", backgroundColor: "#F1E2D1" }}></div>
            </div>
            

            <div className="ui-card-main">
              <svg width="100%" height="80" viewBox="0 0 200 80" preserveAspectRatio="none">
                <path 
                  d="M0 70 L40 50 L80 60 L120 20 L160 30 L200 10" 
                  fill="none" 
                  stroke="#810B38" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ 
                    strokeDasharray: "300", 
                    strokeDashoffset: "300", 
                    animation: "drawMarketLine 2s ease-out forwards 1s" 
                  }} 
                />
              </svg>
            </div>
          </div>
          

          <h1 className="display-3 fw-bold animate-fade-1 text-dark" style={{ letterSpacing: "-1.5px" }}>
            Synthesize your wealth.
          </h1>
          

          <p className="lead text-muted mt-3 mb-5 animate-fade-2" style={{ fontSize: "1.25rem", fontWeight: "400", maxWidth: "600px", margin: "0 auto" }}>
            The intelligent platform to execute trades, manage derivatives, and build your financial future.
          </p>
          
 
          <div className="animate-fade-3">
            <a 
              href="/signup"
              className="btn px-5 py-3 fs-5 d-inline-block" 
              style={{ 
                backgroundColor: "#810B38", 
                color: "#FFFFFF", 
                fontWeight: "600", 
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                border: "none",
                textDecoration: "none"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0px 15px 25px rgba(129, 11, 56, 0.25)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            >
              Start Investing
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;