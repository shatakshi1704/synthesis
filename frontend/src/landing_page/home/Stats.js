import React, { useEffect, useRef, useState } from "react";

function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { 
        root: null,
        rootMargin: "0px", 
        threshold: 0.1 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="container mt-5 mb-5 pt-5 pb-5 overflow-hidden" ref={sectionRef}>
      <style>
        {`
          .scroll-reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .scroll-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Orbital Graphic Animations */
          @keyframes orbit-rotate {
            100% { transform: rotate(360deg); }
          }
          @keyframes counter-rotate {
            100% { transform: rotate(-360deg); }
          }
          @keyframes data-flow {
            to { stroke-dashoffset: -20; }
          }

          .orbital-system {
            position: relative;
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            aspect-ratio: 1 / 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .orbit-ring {
            position: absolute;
            border-radius: 50%;
            border: 1px dashed #DCC3AA;
            animation: orbit-rotate 40s linear infinite;
          }
          
          .orbit-ring.inner { width: 50%; height: 50%; animation-duration: 25s; border: 1px solid rgba(220, 195, 170, 0.4); }
          .orbit-ring.middle { width: 75%; height: 75%; animation-direction: reverse; }
          .orbit-ring.outer { width: 100%; height: 100%; }

          /* The nodes that sit on the rings */
          .orbit-node {
            position: absolute;
            background-color: #FFFFFF;
            border: 1px solid #DCC3AA;
            color: #541A1A;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
            /* This counters the parent rotation so text stays upright */
            animation: counter-rotate 40s linear infinite;
          }
          
          /* Counter-rotations synced to their specific rings */
          .inner .orbit-node { animation: counter-rotate 25s linear infinite; }
          .middle .orbit-node { animation: orbit-rotate 40s linear infinite; }

          /* Custom Link Styling */
          .ecosystem-link {
            color: #810B38;
            font-weight: 600;
            text-decoration: none;
            transition: color 0.2s, transform 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 5px;
          }
          .ecosystem-link:hover {
            color: #541A1A;
            transform: translateX(4px);
          }
        `}
      </style>

      <div className={`row align-items-center scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
        

        <div className="col-lg-5 mb-5 mb-lg-0 pe-lg-5">
          <h2 className="display-6 fw-bold mb-5" style={{ color: "#541A1A", letterSpacing: "-1px" }}>
            Everything you need. <br/>Nothing you don't.
          </h2>

          <div className="mb-4">
            <h4 className="fw-bold" style={{ color: "#541A1A", fontSize: "1.4rem" }}>Built for clarity</h4>
            <p style={{ color: "#541A1A", opacity: "0.8", fontSize: "1.1rem" }}>
              No gamification, no pushy notifications, and absolutely no clutter. We designed a clean interface that lets you focus on the markets.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="fw-bold" style={{ color: "#541A1A", fontSize: "1.4rem" }}>Seamless tracking</h4>
            <p style={{ color: "#541A1A", opacity: "0.8", fontSize: "1.1rem" }}>
              Build custom watchlists, track live market data, and monitor your portfolio performance without constantly switching tabs.
            </p>
          </div>

          <div className="mb-5">
            <h4 className="fw-bold" style={{ color: "#541A1A", fontSize: "1.4rem" }}>Reliable execution</h4>
            <p style={{ color: "#541A1A", opacity: "0.8", fontSize: "1.1rem" }}>
              When you hit buy or sell, it just works. We prioritize uptime and stability so you can execute your trades exactly when you need to.
            </p>
          </div>

          <div className="d-flex gap-4">
            <a href="/docs" className="ecosystem-link">
              Read platform documentation <span style={{ fontSize: "1.2rem" }}>→</span>
            </a>
          </div>
        </div>


        <div className="col-lg-7">
          <div className="orbital-system">
            
    
            <svg style={{ position: "absolute", width: "100%", height: "100%", zIndex: 0 }}>
              <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#810B38" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" style={{ animation: "data-flow 1s linear infinite" }} />
              <line x1="50%" y1="50%" x2="15%" y2="60%" stroke="#810B38" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" style={{ animation: "data-flow 1s linear infinite reverse" }} />
            </svg>


            <div style={{ 
              width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#810B38", 
              color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", 
              fontWeight: "800", letterSpacing: "1px", zIndex: 10,
              boxShadow: "0 0 30px rgba(129, 11, 56, 0.2)"
            }}>
              CORE
            </div>

    
            <div className="orbit-ring inner">
              <div className="orbit-node" style={{ top: "-15px", left: "50%", transform: "translateX(-50%)" }}>
                Equities
              </div>
            </div>

          
            <div className="orbit-ring middle">
              <div className="orbit-node" style={{ top: "40%", right: "-35px", transform: "translateY(-50%)" }}>
                Market Data
              </div>
              <div className="orbit-node" style={{ bottom: "-15px", left: "20%" }}>
                Orders
              </div>
            </div>

      
            <div className="orbit-ring outer">
              <div className="orbit-node" style={{ top: "20%", left: "-10px" }}>
                Watchlists
              </div>
              <div className="orbit-node" style={{ bottom: "15%", right: "-10px" }}>
                Portfolio
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Stats;