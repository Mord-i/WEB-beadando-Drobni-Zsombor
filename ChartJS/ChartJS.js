const table = document.getElementById("data-table");
const ctx = document.getElementById("lineChart").getContext("2d");

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Kiválasztott sor',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                min: 0, // Set minimum x-axis value
                max: 100  // Set a reasonable maximum x-axis value (or based on the data length)
            },
            y: {
                beginAtZero: true,
                min: 0,  // Set minimum y-axis value
                max: 100  // Set maximum y-axis value
            }
        }
    }
});

// Function to generate random number between 1 and 100
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Function to generate the table based on user input size
function generateTable() {
    const size = document.getElementById("size").value;
    const tableSize = parseInt(size) >= 5 ? parseInt(size) : 5;

    // Clear any existing table data
    table.innerHTML = '';

    // Create table rows and cells with random numbers
    const tbody = document.createElement("tbody");
    for (let i = 0; i < tableSize; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < tableSize; j++) {
            const td = document.createElement("td");
            td.textContent = getRandomNumber();
            tr.appendChild(td);
        }
        // Add event listener to each row for chart plotting
        tr.addEventListener("click", () => plotRowData(i));
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}

// Function to plot data from selected row
function plotRowData(rowIndex) {
    const tableRows = table.getElementsByTagName("tr");
    const rowData = Array.from(tableRows[rowIndex].getElementsByTagName("td"))
        .map(cell => parseInt(cell.textContent));

    chart.data.labels = rowData.map((_, index) => (index + 1).toString());
    chart.data.datasets[0].data = rowData;
    chart.update();
}

// Generate the initial table on page load
generateTable();
