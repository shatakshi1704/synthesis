chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "NEW_INTEL") {
    const data = message.payload;
    console.log("Background received data:", data);

    // Abhi hum localhost use kar rahe hain taaki aap easily test kar sako bina Render pe deploy kiye.
    // Baad mein isko live URL ('https://synthesis-backend.onrender.com/api/alpha-intel') se replace kar denge.
    fetch("http://localhost:3002/api/alpha-intel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log("Saved to Synthesis Backend!", result))
    .catch(error => console.error("Synthesis Error:", error));
  }
});