import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

function ProductsPage() {
  return (
    <>
      <Hero />

      <LeftSection
        imageURL="media/images/kite.png" 
        productName="Synthesis Terminal"
        productDesription="A single-interface platform for all your trading needs. Real-time market data, lightning-fast order execution, and integrated risk management."
        tryDemo="#"
        learnMore="#"
      />
      

      <RightSection
        imageURL="media/images/console.png"
        productName="Insights Dashboard"
        productDesription="Deep-dive into your portfolio performance. Visualize your gains, track your risk exposure, and get clear, actionable insights into your financial habits."
        learnMore="#"
      />
<LeftSection
  imageURL="media/images/extension.png"
  productName="Synthesis Extension"
  productDesription="Keep a pulse on the markets without leaving your current tab. Execute quick trades and view live asset alerts right from your browser toolbar."
  tryDemo="#"
  learnMore="#"
/>

      <div className="text-center mt-5 mb-5">
        <h3>Built by engineers, for traders.</h3>
        <p className="text-muted">We are constantly pushing updates to our core infrastructure.</p>
      </div>
    </>
  );
}

export default ProductsPage;