const showFloatingBadge = (sentiment) => {
  const existingBadge = document.getElementById("synthesis-alpha-badge");
  if (existingBadge) existingBadge.remove();

  const badge = document.createElement("div");
  badge.id = "synthesis-alpha-badge";
  
  let bgColor = "#6c757d"; 
  let emoji = "⚖️";
  if (sentiment === "BULLISH") {
    bgColor = "#28a745"; 
    emoji = "🚀";
  } else if (sentiment === "BEARISH") {
    bgColor = "#dc3545"; 
    emoji = "⚠️";
  }

  badge.style.position = "fixed";
  badge.style.bottom = "20px";
  badge.style.right = "20px";
  badge.style.zIndex = "999999";
  badge.style.backgroundColor = bgColor;
  badge.style.color = "#fff";
  badge.style.padding = "10px 16px";
  badge.style.borderRadius = "30px";
  badge.style.fontFamily = "Segoe UI, sans-serif";
  badge.style.fontSize = "14px";
  badge.style.fontWeight = "600";
  badge.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  badge.style.display = "flex";
  badge.style.alignItems = "center";
  badge.style.gap = "8px";

  badge.innerHTML = `<span>${emoji}</span> <span>Synthesis: ${sentiment}</span>`;
  document.body.appendChild(badge);
};

const extractData = () => {
  const url = window.location.href;
  const source = window.location.hostname;
  
  let title = document.querySelector('h1')?.innerText || document.title;
  
  let snippetText = "";
  const paragraphs = document.querySelectorAll('p');
  for (let p of paragraphs) {
    if (p.innerText.length > 50) { 
      snippetText = p.innerText;
      break; 
    }
  }

  if (title && snippetText) {
    const lowerTitle = title.toLowerCase();
    
    let localSentiment = "NEUTRAL";
    if (lowerTitle.includes("surge") || lowerTitle.includes("jump") || lowerTitle.includes("surges") || lowerTitle.includes("profit") || lowerTitle.includes("record") || lowerTitle.includes("dividend")) {
      localSentiment = "BULLISH";
    } else if (lowerTitle.includes("loss") || lowerTitle.includes("crash") || lowerTitle.includes("fall") || lowerTitle.includes("slump") || lowerTitle.includes("tanks")) {
      localSentiment = "BEARISH";
    }

    showFloatingBadge(localSentiment);

    const newsData = {
      source: source,
      url: url,
      title: title.trim(),
      snippet: snippetText.trim()
    };

    console.log("🔥 Synthesis Alpha: Extracted & Displayed ->", newsData);
    chrome.runtime.sendMessage(newsData); 
  } else {
    console.log("⚠️ Synthesis Alpha: Title ya Snippet nahi mila.");
  }
};

window.addEventListener("load", () => {
  setTimeout(extractData, 2000); 
});