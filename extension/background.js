chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "NEW_INTEL") {
    const data = message.payload;
    console.log("Background received data:", data);

    // ✅ URL ke aage /api/alpha-intel lagana zaroori hai
    fetch("https://synthesis-backend.onrender.com/api/alpha-intel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log("Saved to Synthesis Backend!", result))
    .catch(error => console.error("Synthesis Error:", error));
  }
});