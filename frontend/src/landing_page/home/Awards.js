import React, { useEffect, useRef, useState } from "react";

function Awards() {
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
          /* Scroll Reveal Transition */
          .scroll-reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .scroll-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Interactive Hover States */
          .feature-item {
            color: #541A1A;
            margin-bottom: 0.8rem;
            transition: transform 0.2s ease, color 0.2s ease;
          }
          .feature-item:hover {
            transform: translateX(8px);
            color: #810B38;
          }

          /* Security Badge Hover */
          .security-badge {
            font-family: "SF Pro Display", -apple-system, sans-serif;
            font-weight: 700;
            color: #810B38;
            opacity: 0.6;
            transition: opacity 0.3s, transform 0.3s;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .security-badge:hover {
            opacity: 1;
            transform: translateY(-2px);
          }

          /* Continuous Animations for the SVG Core */
          @keyframes spin-slow {
            100% { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            100% { transform: rotate(-360deg); }
          }
          @keyframes pulse-core {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.8; }
          }
          .svg-spin {
            transform-origin: center;
            animation: spin-slow 20s linear infinite;
          }
          .svg-spin-reverse {
            transform-origin: center;
            animation: spin-reverse 15s linear infinite;
          }
          .svg-pulse {
            transform-origin: center;
            animation: pulse-core 3s ease-in-out infinite;
          }
        `}
      </style>

      <div className={`row align-items-center scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
        
        {/* Left Side: Animated Data Core Graphic */}
        <div className="col-lg-5 text-center mb-5 mb-lg-0">
          <div style={{ position: "relative", width: "100%", maxWidth: "400px", margin: "0 auto" }}>
            <svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              {/* Background Glow */}
              <circle cx="200" cy="200" r="160" fill="#F1E2D1" opacity="0.4" />
              
              {/* Outer Dashed Orbit */}
              <circle cx="200" cy="200" r="140" fill="none" stroke="#DCC3AA" strokeWidth="2" strokeDasharray="8 12" className="svg-spin" />
              
              {/* Inner Solid Orbit */}
              <circle cx="200" cy="200" r="110" fill="none" stroke="#541A1A" strokeWidth="1" opacity="0.5" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="#810B38" strokeWidth="3" className="svg-spin-reverse" strokeDasharray="150 50" />
              
              {/* Central Shield/Core Geometric Design */}
              <polygon points="200,90 290,200 200,310 110,200" fill="#541A1A" opacity="0.9" />
              <polygon points="200,120 260,200 200,280 140,200" fill="#810B38" />
              
              {/* Pulsing Energy Core */}
              <circle cx="200" cy="200" r="24" fill="#FFFFFF" className="svg-pulse" />
              <circle cx="200" cy="200" r="12" fill="#810B38" />
              
              {/* Connecting Nodes */}
              <line x1="200" y1="20" x2="200" y2="90" stroke="#DCC3AA" strokeWidth="2" />
              <line x1="200" y1="310" x2="200" y2="380" stroke="#DCC3AA" strokeWidth="2" />
              <circle cx="200" cy="20" r="6" fill="#810B38" />
              <circle cx="200" cy="380" r="6" fill="#541A1A" />
            </svg>
          </div>
        </div>

        {/* Right Side: Text & Features */}
        <div className="col-lg-7 ps-lg-5">
          <div style={{ display: "inline-block", backgroundColor: "#F1E2D1", color: "#810B38", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", letterSpacing: "1px", marginBottom: "1.5rem" }}>
            ENGINEERED FOR RELIABILITY
          </div>
          <h2 className="display-5 fw-bold mb-4" style={{ color: "#541A1A", letterSpacing: "-1px" }}>
            Built for modern markets.
          </h2>
          <p className="lead mb-5" style={{ color: "#541A1A", opacity: "0.8", maxWidth: "600px" }}>
            We built a fast, reliable trading engine from the ground up to give retail investors seamless execution and clear data without the bloat.
          </p>

          {/* Feature List */}
          <div className="row mb-5 fs-5" style={{ fontWeight: "500" }}>
            <div className="col-sm-6">
              <ul className="list-unstyled">
                <li className="feature-item"><span style={{ color: "#810B38", marginRight: "10px" }}>●</span> Lightning-fast execution</li>
                <li className="feature-item"><span style={{ color: "#810B38", marginRight: "10px" }}>●</span> Real-time market data</li>
                <li className="feature-item"><span style={{ color: "#810B38", marginRight: "10px" }}>●</span> Advanced portfolio analytics</li>
              </ul>
            </div>
            <div className="col-sm-6">
              <ul className="list-unstyled">
                <li className="feature-item"><span style={{ color: "#810B38", marginRight: "10px" }}>●</span> Secure cloud infrastructure</li>
                <li className="feature-item"><span style={{ color: "#810B38", marginRight: "10px" }}>●</span> Two-factor authentication (2FA)</li>
                <li className="feature-item"><span style={{ color: "#810B38", marginRight: "10px" }}>●</span> End-to-end data encryption</li>
              </ul>
            </div>
          </div>

          {/* Security & Trust Badges */}
          <div className="d-flex align-items-center flex-wrap gap-4 mt-4 pt-4 border-top" style={{ borderColor: "#DCC3AA" }}>
            <span className="security-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Cloud Native
            </span>
            <span className="security-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              SSL Encrypted
            </span>
            <span className="security-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
              Secure APIs
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Awards;