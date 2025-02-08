async function registerUser() {
  const name = document.getElementById("name").value;
  const roll_number = document.getElementById("roll_number").value;

  const response = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, roll_number }),
  });
  const result = await response.json();
  alert(result.message);
}

async function captureImages() {
  const name = document.getElementById("name").value;

  const response = await fetch("/capture_images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const result = await response.json();
  alert(result.message);
}

async function trainModel() {
  const response = await fetch("/train", { method: "POST" });
  const result = await response.json();
  alert(result.message);
}

async function recognize() {
  const response = await fetch("/recognize", { method: "POST" });
  const result = await response.json();
  console.log(result.recognized_names);
  alert("Recognition complete. Check logs for names.");
}
