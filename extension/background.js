chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.title && message.url) {
    console.log("Background received data:", message);

    fetch("https://synthesis-backend.onrender.com/api/alpha-intel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    })
    .then(response => response.json())
    .then(result => console.log("Saved to Synthesis Backend!", result))
    .catch(error => console.error("Synthesis Error:", error));
  }
});