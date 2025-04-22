// Web Worker
let worker;
function startWorker() {
  if (typeof(Worker) !== "undefined") {
    if (!worker) {
      worker = new Worker("worker.js");
      worker.onmessage = e => {
        document.getElementById("workerOutput").textContent = "Eredmény: " + e.data;
      };
    }
  } else {
    alert("A böngésződ nem támogatja a Web Worker API-t.");
  }
}

// Simulate SSE with JS
setInterval(() => {
  const now = new Date().toLocaleTimeString();
  document.getElementById("sseOutput").innerHTML += `<br>Szimulált esemény: ${now}`;
}, 3000);

// Geolocation
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => document.getElementById("geoOutput").textContent =
        `Szélesség: ${pos.coords.latitude}, Hosszúság: ${pos.coords.longitude}`
    );
  } else {
    alert("Geolocation nem támogatott!");
  }
}

// Drag and Drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

// Canvas
const ctx = document.getElementById("myCanvas").getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 150, 75);