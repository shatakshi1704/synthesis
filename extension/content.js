const extractData = () => {
  const url = window.location.href;
  const source = window.location.hostname;
  
  // Title nikalne ka tareeqa
  let title = document.querySelector('h1')?.innerText || document.title;
  
  // Smart Snippet Extractor (50+ characters wala paragraph)
  let snippetText = "";
  const paragraphs = document.querySelectorAll('p');
  for (let p of paragraphs) {
    if (p.innerText.length > 50) { 
      snippetText = p.innerText;
      break; 
    }
  }

  // Agar title aur snippet dono mil gaye toh backend ko bhej do
  if (title && snippetText) {
    const newsData = {
      source: source,
      url: url,
      title: title.trim(),
      snippet: snippetText.trim()
    };

    console.log("🔥 Synthesis Alpha: Extracted Data ->", newsData);
    
    // Direct object bhej rahe hain taaki background.js asani se capture kar le
    chrome.runtime.sendMessage(newsData); 
  } else {
    console.log("⚠️ Synthesis Alpha: Title ya Snippet nahi mila.");
  }
};

// Page load hone ke 2 second baad run karega
window.addEventListener("load", () => {
  setTimeout(extractData, 2000); 
});