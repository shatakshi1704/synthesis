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
    const newsData = {
      source: source,
      url: url,
      title: title.trim(),
      snippet: snippetText.trim()
    };

    console.log("Synthesis Alpha: Extracted Data ->", newsData);
    chrome.runtime.sendMessage({ type: "NEW_INTEL", payload: newsData });
  }
};
window.addEventListener("load", () => {
  setTimeout(extractData, 2000); 
});